import express from "express";
import { itemsPost } from "controllers/items-controller";
import { itemsGet } from "controllers/items-controller";
import { itemsGetId } from "controllers/items-controller";
import { itemsPut } from "controllers/items-controller";
import { itemsDelete } from "controllers/items-controller";
import { suppPost } from "controllers/supplier-controller";
import { suppGet } from "controllers/supplier-controller";
import { suppGetId } from "controllers/supplier-controller";
import { suppPut } from "controllers/supplier-controller";
import { suppDelete } from "controllers/supplier-controller";
import { orderPost } from "controllers/order-controller";
import { orderGet } from "controllers/order-controller";
import { orderGetId } from "controllers/order-controller";
import { orderGetDateRange } from "controllers/order-controller";
import { orderPutStatus } from "controllers/order-controller";
import { AppDataSource } from "data-source";
import { checkQuantity, validItems } from "middleware/middleware";

const router = express.Router();
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initializd");
    router.post("/items", validItems, itemsPost);
    router.get("/items", itemsGet);
    router.get("/items/:id", itemsGetId);
    router.put("/items/:id", validItems, itemsPut);
    router.delete("/items/:id", itemsDelete);

    router.post("/suppliers", suppPost);
    router.get("/suppliers", suppGet);
    router.get("/suppliers/:id", suppGetId);
    router.put("/suppliers/:id", suppPut);
    router.delete("/suppliers/:id", suppDelete);

    router.post("/orders", checkQuantity, orderPost);
    router.get("/orders", orderGet);
    router.get("/orders", orderGetDateRange);
    router.get("/orders/:id", orderGetId);
    router.put("/orders/:id/status", orderPutStatus);
  })
  .catch((error) => console.log(error));

export default router;
