# Expense Tracker API Documentation

## Authentication

### Register
- **POST** `/api/v1/auth/register`
- **Body:** `{ "fullName": "string", "email": "string", "password": "string" }`
- **Response:** `{ "token": "jwt", "user": { ... } }`

### Login
- **POST** `/api/v1/auth/login`
- **Body:** `{ "email": "string", "password": "string" }`
- **Response:** `{ "token": "jwt", "user": { ... } }`

---

## Transactions

### Get All Transactions
- **GET** `/api/v1/transactions`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `[ { "_id": "...", "type": "income|expense", "amount": 0, "date": "...", "category": "...", "notes": "..." }, ... ]`

### Add Transaction
- **POST** `/api/v1/transactions`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ "type": "income|expense", "amount": 0, "date": "YYYY-MM-DD", "category": "string", "notes": "string" }`
- **Response:** `{ ...transaction }`

### Update Transaction
- **PUT** `/api/v1/transactions/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ "type": "income|expense", "amount": 0, "date": "YYYY-MM-DD", "category": "string", "notes": "string" }`
- **Response:** `{ ...transaction }`

### Delete Transaction
- **DELETE** `/api/v1/transactions/:id?type=income|expense`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `{ "message": "Transaction deleted" }`

---

## Categories

### Get Categories
- **GET** `/api/v1/categories`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `[ { "_id": "...", "name": "string" }, ... ]`

### Add Category
- **POST** `/api/v1/categories`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ "name": "string" }`
- **Response:** `{ ...category }`

### Delete Category
- **DELETE** `/api/v1/categories/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `{ "message": "Category deleted" }`

---

## Goals

### Get Goals
- **GET** `/api/v1/goals`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `[ { "_id": "...", "name": "string", "target": 0, "current": 0, "deadline": "YYYY-MM-DD" }, ... ]`

### Add Goal
- **POST** `/api/v1/goals`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ "name": "string", "target": 0, "current": 0, "deadline": "YYYY-MM-DD" }`
- **Response:** `{ ...goal }`

### Update Goal
- **PUT** `/api/v1/goals/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ "name": "string", "target": 0, "current": 0, "deadline": "YYYY-MM-DD" }`
- **Response:** `{ ...goal }`

### Delete Goal
- **DELETE** `/api/v1/goals/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `{ "message": "Goal deleted" }`

---

## Notes

- All endpoints (except register/login) require JWT authentication via the `Authorization` header.
- Dates should be in ISO format (`YYYY-MM-DD`).
- For more details, see the included Postman collection.
