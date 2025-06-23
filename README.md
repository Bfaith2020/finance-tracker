Budgetly – Expense Tracker & Personal Finance Dashboard
https://expense-ce24f.web.app/
Budgetly is a modern, full-stack personal finance management application built with React (Vite) and Node.js/Express. It empowers users to track income, expenses, recurring payments, set financial goals, and gain actionable insights into their spending habits. The app is designed for simplicity, security, and extensibility, making it suitable for individuals and small businesses.

Features
User Authentication: Secure registration and login with JWT-based authentication.
Dashboard Overview: Visual summary of total balance, income, expenses, and recent transactions.
Income & Expense Tracking: Add, edit, and delete income and expense records with categories, icons, and notes.
Recurring Payments: Manage subscriptions and recurring bills, receive reminders for upcoming due dates, and request renegotiation via email.
Financial Goals: Set, track, and visualize progress toward savings or spending goals.
Categories Management: Create and manage custom categories for better organization.
Legal Tips: Access South African consumer financial rights and generate a simple loan agreement PDF.
Profile Management: Upload and update profile pictures.
Data Export: Download income and expense data as Excel files for offline analysis.
Responsive UI: Optimized for desktop and mobile devices.
Gamification: Earn badges for achievements and receive AI-powered spending alerts.
Dark Mode: Toggle between light and dark themes for comfortable viewing.
Tech Stack
Frontend: React, Vite, Redux Toolkit, Tailwind CSS, Framer Motion, React Icons, Recharts, Moment.js
Backend: Node.js, Express, MongoDB (Mongoose), JWT, Multer (file uploads), Nodemailer
Other: XLSX (Excel export), jsPDF (PDF generation), React Hot Toast (notifications)
Getting Started
Prerequisites
Node.js (v16+ recommended)
npm or yarn
MongoDB instance (local or cloud)
Installation
Clone the repository:

git clone https://github.com/yourusername/budgetly.git
cd budgetly
Install dependencies:

Frontend:
cd frontend/expense-tracker
npm install
Backend:
cd ../../backend
npm install
Configure environment variables:

Copy .env.example to .env in the backend folder and fill in your MongoDB URI, JWT secret, and email credentials for notifications.
Run the app in development:

Backend:
npm run dev
Frontend (in a separate terminal):
npm run dev
Access the app:

Frontend: http://localhost:5173
Backend API: http://localhost:8000
Deployment
Build the frontend for production:

npm run build
The static files will be output to dist/.

Serve frontend from backend in production:

Ensure your backend server.js is configured to serve the frontend's dist folder when NODE_ENV=production.
Start the backend server:

NODE_ENV=production node server.js
Visit your deployed app at your server's URL.

API Documentation
See backend/API_DOCUMENTATION.md for detailed API endpoints, request/response formats, and authentication requirements.

Contributing
Contributions are welcome! Please open issues or submit pull requests for new features, bug fixes, or improvements.

License
This project is licensed under the MIT License.

Acknowledgements
React
Vite
Tailwind CSS
MongoDB
Framer Motion
jsPDF
XLSX
Recharts
React Hot Toast
Budgetly – Take control of your finances, set goals, and achieve financial freedom.
