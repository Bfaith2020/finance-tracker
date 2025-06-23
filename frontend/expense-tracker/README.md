# Budgetly – Expense Tracker & Personal Finance Dashboard

Budgetly is a modern, full-stack personal finance management application built with React (Vite) and Node.js/Express. It empowers users to track income, expenses, recurring payments, set financial goals, and gain actionable insights into their spending habits. The app is designed for simplicity, security, and extensibility, making it suitable for individuals and small businesses.

---

## Features

- **User Authentication:** Secure registration and login with JWT-based authentication.
- **Dashboard Overview:** Visual summary of total balance, income, expenses, and recent transactions.
- **Income & Expense Tracking:** Add, edit, and delete income and expense records with categories, icons, and notes.
- **Recurring Payments:** Manage subscriptions and recurring bills, receive reminders for upcoming due dates, and request renegotiation via email.
- **Financial Goals:** Set, track, and visualize progress toward savings or spending goals.
- **Categories Management:** Create and manage custom categories for better organization.
- **Legal Tips:** Access South African consumer financial rights and generate a simple loan agreement PDF.
- **Profile Management:** Upload and update profile pictures.
- **Data Export:** Download income and expense data as Excel files for offline analysis.
- **Responsive UI:** Optimized for desktop and mobile devices.
- **Gamification:** Earn badges for achievements and receive AI-powered spending alerts.
- **Dark Mode:** Toggle between light and dark themes for comfortable viewing.

---

## Tech Stack

- **Frontend:** React, Vite, Redux Toolkit, Tailwind CSS, Framer Motion, React Icons, Recharts, Moment.js
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Multer (file uploads), Nodemailer
- **Other:** XLSX (Excel export), jsPDF (PDF generation), React Hot Toast (notifications)

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/budgetly.git
   cd budgetly
   ```

2. **Install dependencies:**
   - Frontend:
     ```sh
     cd frontend/expense-tracker
     npm install
     ```
   - Backend:
     ```sh
     cd ../../backend
     npm install
     ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` in the backend folder and fill in your MongoDB URI, JWT secret, and email credentials for notifications.

4. **Run the app in development:**
   - Backend:
     ```sh
     npm run dev
     ```
   - Frontend (in a separate terminal):
     ```sh
     npm run dev
     ```

5. **Access the app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:8000](http://localhost:8000)

---

## Deployment

1. **Build the frontend for production:**
   ```sh
   npm run build
   ```
   The static files will be output to `dist/`.

2. **Serve frontend from backend in production:**
   - Ensure your backend `server.js` is configured to serve the frontend's `dist` folder when `NODE_ENV=production`.

3. **Start the backend server:**
   ```sh
   NODE_ENV=production node server.js
   ```

4. **Visit your deployed app at your server's URL.**

---

## API Documentation

See [`backend/API_DOCUMENTATION.md`](../../backend/API_DOCUMENTATION.md) for detailed API endpoints, request/response formats, and authentication requirements.

---



## Contributing

Contributions are welcome! Please open issues or submit pull requests for new features, bug fixes, or improvements.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [jsPDF](https://github.com/parallax/jsPDF)
- [XLSX](https://github.com/SheetJS/sheetjs)
- [Recharts](https://recharts.org/)
- [React Hot Toast](https://react-hot-toast.com/)

---

**Budgetly** – Take control of your finances, set goals, and achieve financial freedom.
