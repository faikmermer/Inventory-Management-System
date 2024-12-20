import { Request, Response } from "express";
import { AppDataSource } from "data-source";
import { Items } from "entities/Items";
import { Supplier } from "entities/Supplier";

const itemsRepo = AppDataSource.getRepository(Items);
const suppRepo = AppDataSource.getRepository(Supplier);

export const itemsPost = async (req: Request, res: Response): Promise<any> => {
  const { name, description, price, quantity, supplierId } = req.body;

  let supp = await suppRepo.findOneBy({
    id: supplierId,
  });

  if (!supp) {
    supp = new Supplier();
    supp.name = "Tech Supplier Ltd.";
    await suppRepo.save(supp);
  }
  const items = new Items();
  items.name = name;
  items.description = description;
  items.price = price;
  items.quantity = quantity;
  items.supplier = supp;

  await itemsRepo.save(items);
  try {
    return res.status(201).json({
      id: items.id,
      name: items.name,
      description: items.description,
      price: items.price,
      quantity: items.quantity,
      supplier: {
        id: supp.id,
        name: supp.name,
      },
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const itemsGet = async (req: Request, res: Response): Promise<any> => {
  const allItems = await itemsRepo.find();

  if (!allItems) return res.status(404).json({ error: "No items found" });

  return res.status(200).json(allItems);
};

export const itemsGetId = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const item = await itemsRepo.findOneBy({ id: Number(id) });

  if (!item) return res.status(404).json({ error: "Item not found" });

  return res.status(200).json(item);
};

export const itemsPut = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { name, description, price, quantity } = req.body;

  const item = await itemsRepo.findOneBy({ id: Number(id) });

  if (!item) return res.status(404).json({ error: "Item not found" });

  item.name = name;
  item.description = description;
  item.price = price;
  item.quantity = quantity;

  await itemsRepo.save(item);

  return res.status(200).json(item);
};

export const itemsDelete = async (
  req: Request,
  res: Response
): Promise<any> => {
  await itemsRepo.softDelete(req.params.id);
  return res.status(200).json({ message: "Item deleted" });
};
