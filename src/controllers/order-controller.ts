import { Request, response, Response } from "express";
import { AppDataSource } from "data-source";
import { Items } from "entities/Items";
import { Order } from "entities/Order";
import { OrderItem } from "entities/OrderItem";

const orderRepository = AppDataSource.getRepository(Order);
const itemRepository = AppDataSource.getRepository(Items);
const orderItemRepository = AppDataSource.getRepository(OrderItem);

export const orderPost = async (req: Request, res: Response): Promise<any> => {
  const { customerName, items } = req.body;
  const responseItems = [];

  try {
    const order = new Order();
    order.customerName = customerName;
    order.status = "pending";
    order.totalAmount = 0;

    let totalAmount = 0;

    for (const reqItem of items) {
      const item = await itemRepository.findOne({
        where: { id: reqItem.itemId },
      });
      if (!item) {
        return res
          .status(404)
          .json({ message: `Item not found with id ${reqItem.itemId}` });
      }

      const orderItem = new OrderItem();
      orderItem.order = order;
      orderItem.item = item;
      orderItem.quantity = reqItem.quantity;
      orderItem.total = item.price * reqItem.quantity;

      item.quantity -= reqItem.quantity;

      totalAmount += orderItem.total;

      await orderItemRepository.insert(orderItem);

      responseItems.push({
        item: {
          id: item.id,
          name: item.name,
        },
        quantity: reqItem.quantity,
      });
    }

    order.totalAmount = totalAmount;
    await orderRepository.insert(order);

    const response = {
      id: order.id,
      customerName: order.customerName,
      totalAmount: order.totalAmount,
      status: order.status,
      items: responseItems,
    };

    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const orderGet = async (req: Request, res: Response): Promise<any> => {
  //Müşteri sipariş sorgulama
  const customerName = req.query.customerName as string;

  if (customerName) {
    const orders = await orderRepository.find({
      where: { customerName: customerName },
    });
    if (!orders) return res.status(404).json({ error: "No orders found" });
    return res.status(200).json(orders);
  }

  const allOrders = await orderRepository.find();
  if (!allOrders) return res.status(404).json({ error: "No orders found" });

  return res.status(200).json(allOrders);
};
export const orderGetDateRange = async (
  req: Request,
  res: Response
): Promise<any> => {
  const startDate = req.query.startDate as string;
  const endDate = req.query.endDate as string;

  const orders = await orderRepository
    .createQueryBuilder("order")
    .where("order.createdAt BETWEEN :startDate AND :endDate", {
      startDate: startDate,
      endDate: endDate,
    })
    .getMany();

  if (!orders) return res.status(404).json({ error: "No orders found" });
  return res.status(200).json(orders);
};
export const orderGetId = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const order = await orderRepository.findOneBy({ id: Number(id) });

  if (!order) return res.status(404).json({ error: "Order not found" });

  return res.status(200).json(order);
};

export const orderPutStatus = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await orderRepository.findOne({ where: { id: Number(id) } });

  if (!order) return res.status(404).json({ error: "Order not found" });

  order.status = status;
  if (status === "cancelled") {
    order.totalAmount = 0;

    const orderItems = await orderItemRepository.find({
      where: { order: { id: Number(id) } },
      relations: ["item"],
    });

    for (const orderitem of orderItems) {
      orderitem.item.quantity += orderitem.quantity;
      await itemRepository.save(orderitem.item);
    }
  }
  await orderRepository.save(order);

  return res.status(200).json(order);
};
