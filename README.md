# Smart-Bil — Smart Billing & Payment Collection System

Smart-Bil adalah aplikasi **web-based billing & payment collection system** yang dibangun menggunakan **Next.js (App Router)**, **Prisma**, dan **SQLite**. Aplikasi ini berfokus pada pengelolaan tagihan pelanggan dan pembayaran dengan pemisahan peran **Admin** dan **Customer**.

Project ini cocok untuk:
- Tugas kuliah
- Demo sistem billing
- Portofolio fullstack web

---

## Features

### Customer
- Login sebagai customer
- Melihat daftar invoice
- Melihat status invoice (UNPAID / PAID / OVERDUE)
- Melakukan pembayaran (manual)
- Melihat riwayat pembayaran

### Admin
- Login sebagai admin
- Dashboard ringkasan invoice & revenue
- Manajemen customer
- Manajemen invoice
- Monitoring pembayaran
- Halaman laporan (analytics)

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React, Tailwind CSS
- **Backend**: Next.js Route Handlers
- **Database**: SQLite
- **ORM**: Prisma
- **Authentication**: Custom cookie-based auth
- **Password Hashing**: bcrypt

---

## Project Structure

- app/
- ├─ (admin)/ # Admin pages
- │ ├─ dashboard
- │ ├─ customers
- │ ├─ invoices
- │ ├─ payments
- │ ├─ reports
- │ └─ settings
- │
- ├─ (customer)/ # Customer pages
- │ ├─ my-invoices
- │ └─ my-payments
- │
- ├─ api/ # Backend APIs
- │ ├─ auth
- │ ├─ payments
- │ ├─ customer
- │ └─ admin
- │
- ├─ middleware.ts # Route protection
- └─ layout.tsx
- 
- prisma/
- ├─ schema.prisma
- └─ seed.ts
- 
- lib/
- └─ prisma.ts

---

## Roles & Access

| Role      | Access                                            |
|-----------|---------------------------------------------------|
| ADMIN     | Dashboard, Customers, Invoices, Payments, Reports |
| CUSTOMER  | My Invoices, Payment History                      |

## Dummy Accounts

### Admin
- Email : admin@smartbil.com
- Password : admin123

### Customer
- Email : admin@smartbil.com
- Password : admin123

---

## Installation Setup

### 1. Clone Respository
- git clone https://github.com/indrarms/smart-bil.git
- cd smart-bil

### 2. Install Dependencies
- npm install

### 3. Setup Environment
- Buat file .env di root project:
- DATABASE_URL="file:./dev.db"

### 4. Setup Database
- npx prisma migrate dev
- npx prisma db seed

### 5. Run Development Server
- npm run dev

### 6. Akses Aplikasi
- http://localhost:3000

---

### Notes
- Menggunakan SQLite (development & demo friendly)
- Tidak terhubung ke payment gateway eksternal
- Fokus pada alur bisnis billing & payment
- Invoice items belum diaktifkan (scope MVP)

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

Indra Ramdani Saputra

Informatics Student
Telkom University Purwokerto
