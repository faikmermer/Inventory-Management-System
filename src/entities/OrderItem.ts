import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm";
import { Order } from "./Order";
import { Items } from "./Items";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ type: "decimal" })
  total: number;

  @ManyToOne(() => Order, (order: any) => order.items)
  order: Order;

  @ManyToOne(() => Items, (items: any) => items.orders)
  item: Items;
}
