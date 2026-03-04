# Smart-Bil — Smart Billing & Payment Collection System

**Smart-Bil** is a **web-based billing and payment collection system** built using **Next.js (App Router)**, **Prisma**, and **SQLite**.
The application focuses on managing customer invoices and payments with role-based access for **Admin** and **Customer**.

This project is suitable for:

* University assignments
* Billing system demonstrations
* Fullstack web development portfolio

---

# Features

## Customer

* Login as a customer
* View invoice list
* Check invoice status (UNPAID / PAID / OVERDUE)
* Make manual payments
* View payment history

## Admin

* Login as an admin
* Dashboard with invoice & revenue summary
* Customer management
* Invoice management
* Payment monitoring
* Reports & analytics page

---

# Tech Stack

* **Framework**: Next.js 16 (App Router)
* **Frontend**: React, Tailwind CSS
* **Backend**: Next.js Route Handlers
* **Database**: SQLite
* **ORM**: Prisma
* **Authentication**: Custom cookie-based authentication
* **Password Hashing**: bcrypt

---

# Project Structure

```
app/
├─ (admin)/              # Admin pages
│  ├─ dashboard
│  ├─ customers
│  ├─ invoices
│  ├─ payments
│  ├─ reports
│  └─ settings
│
├─ (customer)/           # Customer pages
│  ├─ my-invoices
│  └─ my-payments
│
├─ api/                  # Backend APIs
│  ├─ auth
│  ├─ payments
│  ├─ customer
│  └─ admin
│
├─ middleware.ts         # Route protection
└─ layout.tsx

prisma/
├─ schema.prisma
└─ seed.ts

lib/
└─ prisma.ts
```

---

# Roles & Access

| Role     | Access                                            |
| -------- | ------------------------------------------------- |
| ADMIN    | Dashboard, Customers, Invoices, Payments, Reports |
| CUSTOMER | My Invoices, Payment History                      |

---

# Dummy Accounts

## Admin

Email: `admin@smartbil.com`
Password: `admin123`

## Customer

Email: `admin@smartbil.com`
Password: `admin123`

---

# Installation Setup

## 1. Clone Repository

```bash
git clone https://github.com/indrarms/smart-bil.git
cd smart-bil
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Setup Environment

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./dev.db"
```

---

## 4. Setup Database

```bash
npx prisma migrate dev
npx prisma db seed
```

---

## 5. Run Development Server

```bash
npm run dev
```

---

## 6. Access the Application

```
http://localhost:3000
```

---

# Notes

* Uses **SQLite** (development & demo friendly)
* Not connected to any external payment gateway
* Focused on the **billing & payment business flow**
* **Invoice items feature is not included** in the MVP scope

---

# Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a Pull Request

---

# License

This project is licensed under the **MIT License**.

---

# Author

**Indra Ramdani Saputra**
Informatics Student
Telkom University Purwokerto
