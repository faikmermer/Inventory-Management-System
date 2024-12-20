import { NextFunction, Request, Response } from "express";
import { Items } from "entities/Items";
import { AppDataSource } from "data-source";

const itemsRepo = AppDataSource.getRepository(Items);
export const validItems = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { name, description, price, quantity, supplierId } = req.body;
  if (!name || !description || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (quantity < 0 && supplierId < 0) {
    return res.status(400).json({ error: "Cannot be less than zero" });
  }
  next();
};

export const checkQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const items = req.body.items;

  for (const item of items) {
    const { quantity } = item;
    const foundItem = await itemsRepo.findOneBy({ id: Number(item.itemId) });
    if (!foundItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    if (foundItem.quantity < quantity) {
      return res.status(400).json({ error: "Not enough quantity" });
    }
    if (foundItem.quantity <= 3) {
      return res.json({ message: "Item quantity is low" });
    }
  }
  next();
};
