# Inventory Management System

## Overview
This is a full-stack Inventory Management System built with **React (Vite) + TypeScript** for the frontend and **Node.js (Express) + TypeScript** for the backend.

## Live Demo
- **Frontend:** [Deployed on Vercel](https://inventory-management-navy-six.vercel.app/)
- **Backend:** [Deployed on Render](https://inventory-management-3-camc.onrender.com)

## Features
- User Authentication (Login)
- Inventory CRUD Operations (Create, Read, Update, Delete)
- Responsive UI with React & Bootstrap
- Hosted on Vercel (Frontend) & Render (Backend)

---
## Getting Started
### Prerequisites
Make sure you have the following installed:
- **Node.js** (v16+ recommended)
- **npm** or **yarn**
- **MongoDB** (local or cloud-based, e.g., MongoDB Atlas)

### 1️⃣ Backend Setup (Node.js + Express + TypeScript)
#### Clone the repository:
```
git clone https://github.com/your-repo/inventory-management.git
cd inventory-management/backend
```
#### Install dependencies:
```
npm install
```
#### Create a `.env` file in the backend folder and add the following:
```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173

```
#### Start the backend server:
```
npm start
```
The backend will run on `http://localhost:3001`.

---
### 2️⃣ Frontend Setup (React + TypeScript + Vite)
#### Navigate to the frontend folder:
```
cd ../frontend
```
#### Install dependencies:
```sh
npm install
```
#### Create a `.env` file in the frontend folder:
```env
VITE_BACKEND_URL=http://localhost:3001
```
#### Start the frontend:
```
npm run dev
```
The frontend will be available at `http://localhost:5173`.

---
## Deployment
### Backend Deployment (Render)
1. Push the backend code to GitHub.
2. Create a new service on [Render](https://render.com/).
3. Link the GitHub repository and configure environment variables.
4. Deploy the backend.

### Frontend Deployment (Vercel)
1. Push the frontend code to GitHub.
2. Deploy it on [Vercel](https://vercel.com/).
3. Set the environment variable `VITE_BACKEND_URL` to the Render backend URL.
---
## Contact
For any inquiries, reach out at [yaseerbscit@gmail.com].


