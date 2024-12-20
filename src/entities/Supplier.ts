import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  DeleteDateColumn,
} from "typeorm";

import { Items } from "./Items";

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contact_information: string;

  @DeleteDateColumn()
  deleteAt: Date | null;

  @OneToMany(() => Items, (items: any) => items.supplier)
  item: Items[];
}
