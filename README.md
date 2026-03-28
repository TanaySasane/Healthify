# Healthify - Doctor Appointment Web App

**Healthify** is a full-stack web application designed to make healthcare more accessible by simplifying the process of booking doctor appointments. It offers three levels of login: **Patient**, **Doctor**, and **Admin**, each with distinct features tailored to their roles. The app integrates **online payment gateway (Razorpay)** to facilitate seamless and secure payments. Built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js), Healthify provides an efficient, user-friendly experience for both patients and healthcare providers.

## 🌍 Live Demo

- **Frontend**: https://healthify-rosy-ten.vercel.app
- **Admin Panel**: https://healthify-a.vercel.app
- **Backend API**: https://healthify-backend-gaf1.onrender.com



- **Frontend**: React.js + Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Payment Gateway**: Razorpay
- **Authentication**: JSON Web Token (JWT)
- **Image Storage**: Cloudinary

## 🔑 Key Features

### 1. Three-Level Authentication

- **Patient Login**:
  - Sign up, log in, and book appointments with doctors
  - Manage appointments (view, cancel)
  - Secure online payment via Razorpay
  - User profile with editable information

- **Doctor Login**:
  - Manage appointments (complete or cancel)
  - Dashboard with earnings, patients, and latest bookings
  - Update profile details

- **Admin Login**:
  - Add and manage doctor profiles
  - Dashboard with analytics: total doctors, appointments, patients
  - View and manage all appointments and patients list

## 🌐 Project Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/TanaySasane/Healthify.git
   cd Healthify
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend/` folder:
   ```env
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ADMIN_EMAIL=admin@healthify.com
   ADMIN_PASSWORD=admin123
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET_KEY=your_cloudinary_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   CURRENCY=INR
   ```
   ```bash
   npm run server
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   ```
   Create a `.env` file:
   ```env
   VITE_BACKEND_URL=http://localhost:4000
   ```
   ```bash
   npm run dev
   ```

4. **Admin Setup**:
   ```bash
   cd admin
   npm install
   ```
   Create a `.env` file:
   ```env
   VITE_BACKEND_URL=http://localhost:4000
   ```
   ```bash
   npm run dev
   ```

## 🔐 Default Credentials

- **Admin**: `admin@healthify.com` / `admin123`
- **Doctor**: `doctor@healthify.in` / `doctor123`
- **Patient**: Register via the frontend

## 📦 Folder Structure

```
Healthify/
├── frontend/        # Patient-facing React app
├── admin/           # Admin & Doctor React panel
├── backend/         # Node.js + Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── config/
└── README.md
```

## 🤝 Contributing

Feel free to fork, open issues, and submit pull requests.

## 👨‍💻 Developer

**Tanay Sasane** — [GitHub](https://github.com/TanaySasane)
