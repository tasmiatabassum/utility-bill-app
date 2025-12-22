# Utility Bill Calculator (Acme AI Fellowship)

A full-stack web application that calculates utility bills based on a configurable flat-rate rule. The system includes a public-facing calculator for users and a secured admin panel for updating pricing configurations.

## 🚀 Live Demo

- **Frontend (User Interface):** https://utility-bill-app.vercel.app
- **Backend (API):** https://acme-backend.onrender.com

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), TypeScript, Tailwind CSS, Axios, jsPDF
- **Backend:** NestJS, TypeScript, Prisma ORM
- **Database:** PostgreSQL (hosted via Render/Neon)
- **Deployment:** Vercel (Frontend) & Render (Backend)

---

## ✨ Features

### 1. User Calculator
- Input consumption units to get an instant bill breakdown.
- Detailed display of Subtotal, VAT, and Service Charge.
- **PDF Download:** Generates a professional receipt using `jspdf`.

### 2. Admin Configuration
- Secured via a PIN mechanism (Default PIN: `12345`).
- Update **Rate per Unit**, **VAT %**, and **Service Charge** dynamically.
- Updates are immediately reflected in the database and user calculations.

---

## ⚙️ Local Setup Instructions

Prerequisites: Node.js (v18+) and a PostgreSQL connection string.

### 1. Backend Setup (NestJS)
```bash
cd backend

# Install dependencies
npm install

# Setup Environment Variables
# Create a .env file in the /backend folder and add:
# DATABASE_URL="postgresql://user:password@host/dbname"

# Generate Prisma Client
npx prisma generate

# Run the Server
npm run start:dev
# Backend runs at http://localhost:3000
2. Frontend Setup (React + Vite)Bashcd frontend

# Install dependencies
npm install

# Run the Application
npm run dev
# Frontend runs at http://localhost:5173
🔑 Environment VariablesBackend (backend/.env)VariableDescriptionDATABASE_URLPostgreSQL Connection String (from Neon/Supabase/Render)Frontend (frontend/.env)Note: This is optional for local dev as it defaults to localhost, but required for production.| Variable | Description || :--- | :--- || VITE_API_URL | The URL of the backend API (e.g., http://localhost:3000/billing) |📡 API ReferenceGET /billing/configFetches the currently active pricing rules.POST /billing/calculateCalculates the bill based on units provided.Body: { "units": 100 }Response: Breakdown of cost, VAT, and total.POST /billing/admin/updateUpdates the pricing configuration.Headers: admin-key: 12345Body:JSON{
  "ratePerUnit": 6.5,
  "vatPercentage": 15,
  "serviceCharge": 20
}
🤖 AI Tool Usage DeclarationIn compliance with the assignment guidelines, the following AI tools were used during development:Google Gemini: Used for generating boilerplate code for NestJS modules, debugging TypeScript errors, and refining the Tailwind CSS configuration for the UI.Logic Verification: All AI-generated logic (specifically the VAT calculation and PDF generation) was manually reviewed and tested to ensure accuracy.Submitted by: Tasmia TabassumDate: December 22, 2025
