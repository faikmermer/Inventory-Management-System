import { Request, Response } from "express";
import { AppDataSource } from "data-source";
import { Supplier } from "entities/Supplier";

const suppRepo = AppDataSource.getRepository(Supplier);

export const suppPost = async (req: Request, res: Response): Promise<any> => {
  const { name, contact_information } = req.body;

  const supp = new Supplier();
  supp.name = name;
  supp.contact_information = contact_information;

  await suppRepo.save(supp);

  return res.status(201).json(supp);
};

export const suppGet = async (req: Request, res: Response): Promise<any> => {
  //Kategoriye göre sıralama
  const category = req.query.name as string;
  if (category) {
    const sp = await suppRepo.find({
      where: { name: category },
    });
    if (!sp) return res.status(404).json({ error: "No suppliers found" });
    return res.status(200).json(sp);
  }
  const allSupp = await suppRepo.find();
  if (!allSupp) return res.status(404).json({ error: "No suppliers found" });
  return res.status(200).json(allSupp);
};

export const suppGetId = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const supp = await suppRepo.findOneBy({ id: Number(id) });
  if (!supp) return res.status(404).json({ error: "Supplier not found" });
  return res.status(200).json(supp);
};

export const suppPut = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { name, contact_information } = req.body;

  const suppIndex = await suppRepo.findOneBy({ id: Number(id) });

  if (!suppIndex) return res.status(404).json({ error: "Supplier not found" });
  suppIndex.name = name;
  suppIndex.contact_information = contact_information;
  await suppRepo.save(suppIndex);
  return res.status(200).json(suppIndex);
};

export const suppDelete = async (req: Request, res: Response): Promise<any> => {
  await suppRepo.softDelete(req.params.id);
  return res.status(200).json({ message: "Supplier deleted" });
};
