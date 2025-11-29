## Finance Tracker

A personal finance tracker built with Next.js, Prisma, Clerk, and Tailwind CSS. The app helps users manage their income and expenses, categorize transactions, and gain insights into their financial habits.

## Features

User Authentication: Secure and easy authentication using Clerk.

Transaction Management: Add income and expense transactions, categorize them, and view transaction history.

Category Management: Create, edit, and organize income and expense categories.

Data Visualization (Planned): Interactive charts and graphs to track spending habits.

Responsive Design: Fully responsive with Tailwind CSS, works seamlessly on mobile, tablet, and desktop.

Notifications: Instant toast notifications using Sonner for feedback on actions.

## Technologies Used

Next.js – React framework for server-side rendering, routing, and API routes.

Prisma – ORM for efficient database access and management.

Clerk – Authentication and user management.

Tailwind CSS – Utility-first CSS framework for rapid UI development.

Lucide React – Icon library for clean, modern icons.

Sonner – Toast notification library.

SQLite – Lightweight database for development.

NEON Postgres – Production database.

## Getting Started

### Clone the repository:

git clone <repo-url>
cd finance-tracker


### Install dependencies:

npm install


### Set up environment variables:

DATABASE_URL=<your-database-url>
CLERK_FRONTEND_API=<your-clerk-frontend-api>
CLERK_API_KEY=<your-clerk-api-key>


### Run migrations (for Prisma):

npx prisma migrate dev


### Start the development server:

npm run dev


The app will be available at http://localhost:3000.

## Future Improvements

Full-featured data visualization dashboard.

Budget tracking and goal setting.

Export/Import financial data in CSV or Excel format.

Advanced reporting features for insights.
