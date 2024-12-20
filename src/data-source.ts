import { DataSource } from "typeorm";
import { Items } from "./entities/Items";
import { Supplier } from "entities/Supplier";
import { Order } from "entities/Order";
import { OrderItem } from "entities/OrderItem";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Items, Supplier, Order, OrderItem],
  migrations: [],
  subscribers: [],
});
