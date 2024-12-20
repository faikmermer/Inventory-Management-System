import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  DeleteDateColumn,
  ManyToMany,
} from "typeorm";
import { Order } from "./Order";
import { Supplier } from "./Supplier";

@Entity()
export class Items {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column("decimal")
  price: number;

  @Column()
  quantity: number;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Supplier, (suppliers) => suppliers.item, {
    eager: true,
    cascade: true,
  })
  supplier: Supplier;

  @ManyToMany(() => Order, (orders) => orders.items)
  orders: Order[];
}
