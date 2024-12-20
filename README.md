# Inventory-Management-System

It is a RESTful API project to manage inventory items, suppliers and orders using TypeORM with SQL database (MySQL).
System supports basic inventory management operations such as product tracking, managing suppliers and processing orders, leveraging TypeORM for data persistence, entity relationships and database migrations.

## Table of Content
- [Installation](#Installation)
- [Project Dependencies](#Dependicies)
- [Usage](#Usage)
- [Endpoints](#Endpoints)
- [Contributing](#Contributing)
- [License](#License)



## Installation
1. Make sure you have Node.js installed. (To download Node.js: [Node.js Official Site](https://nodejs.org))
2. Make sure you have MySQL installed. (To dowload MySQL : [MySQL](https://www.mysql.com/downloads/))
3. Install the dependencies:  
   ```bash
   npm install  
4. Development Mode:
   ```bash
    npm run dev
5. Complier and Run
   ```bash
    npm run build
    npm start

##Dependicies

   ### Ana Bağımlılıklar (`dependencies`)

| dependencies         |Version     | Description                                                             |
|--------------------|:----------:|-------------------------------------------------------------------------|
| **express**        | `^4.21.1`  | Node.js üzerinde web uygulamaları geliştirmek için popüler bir framework. |
| **mysql2**         | `^3.11.4`  | MySQL veritabanına erişim sağlamak için kullanılan hızlı ve modern bir kütüphane. |
| **reflect-metadata** | `^0.2.2` | TypeScript dekoratörlerini desteklemek için gerekli.                    |
| **typeorm**        | `^0.3.20`  | ORM (Object-Relational Mapping) için kullanılan güçlü bir kütüphane.    |

---
### Geliştirme Bağımlılıkları (`devDependencies`)

| devDependencies    | Version    | Description                                                             |
|--------------------|:------------:|-------------------------------------------------------------------------|
| **@types/express** | `^5.0.0`   | Express kütüphanesi için TypeScript tipi tanımları.                      |
| **@types/node**    | `^22.9.0`  | Node.js için TypeScript tipi tanımları.                                 |
| **nodemon**        | `^3.1.7`   | Geliştirme sırasında dosya değişikliklerini otomatik olarak algılayan araç. |
| **ts-node**        | `^10.9.2`  | TypeScript dosyalarını doğrudan çalıştırmak için kullanılan araç.       |
| **tsconfig-paths** | `^4.2.0`   | TypeScript için yol alias'ları ayarlamak için kullanılır.               |
| **typescript**     | `^5.6.3`   | TypeScript derleyicisi.                                                 |

---


## Usage

To use the API, send HTTP requests to the provided endpoints. You can use tools like Postman or cURL to interact with the API.

## Endpoints

### 1- POST /items
* Request Body:
```
{
   "name": "Laptop",
   "description": "High-performance laptop",
   "price": 1200.50,
   "quantity": 50,
   "supplierId": 1
}
```
* Response:
```

{
   "id": 1,
   "name": "Laptop",
   "description": "High-performance laptop",
   "price": 1200.50,
   "quantity": 50,
   "supplier": {
   "id": 1,
   "name": "Tech Supplies Ltd"
   }
}
```
### 2- GET /items
   
* Response:
```
[
  {
   "id": 1,
   "name": "Laptop",
   "description": "High-performance laptop",
   "price": 1200.50,
   "quantity": 50,
   "supplier": {
   "id": 1,
   "name": "Tech Supplies Ltd"
   }
  },
 {
   "id": 2,
   "name": "Mouse",
   "description": "Wireless mouse",
   "price": 25.00,
   "quantity": 200,
   "supplier": {
   "id": 1,
   "name": "Tech Supplies Ltd"
   }
 }
]
```

### 3- POST /orders
Request Body:
```
{
   "customerName": "John Doe",
   "items": [
   {

   "itemId": 1,
   "quantity": 2
   },
  {
   "itemId": 2,
   "quantity": 5
  }
  ]
}
```
* Response:
```
{
   "id": 1,
   "customerName": "John Doe",
   "totalAmount": 2505.00,
   "status": "pending",
   "items": [
  {
   "item": {
   "id": 1,
   "name": "Laptop"
   },
  "quantity": 2
  },
  {
   "item": {
   "id": 2,
   "name": "Mouse"
  },
  "quantity": 5
  }
 ]
}
```

### 4- PUT /orders/1/status
* Request Body:
```
{
   "status": "completed"
}
```
* Response:
```
{
   "id": 1,
   "status": "completed"
}
```


## Contributing
Contributions are welcome! To contribute to the project, follow these steps:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature-name`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature-name`)
5.  Open a Pull Request

## License
Distributed under the Unlicense License.
