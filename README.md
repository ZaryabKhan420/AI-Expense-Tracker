# AI-Based Personal Expense Tracker

Welcome to the AI-Based Personal Expense Tracker! This application helps you manage your personal finances by allowing you to track income, set budgets, and monitor expenses easily.

## Features

- **User Authentication**: Log in using your email and password, or via GitHub, Microsoft, or Google accounts.
- **Income Management**: Add and delete various income streams to keep track of your earnings.
- **Budget Creation**: Create budgets for different categories such as home, education, and entertainment.
- **Expense Tracking**: Each budget can contain multiple expenses, which you can easily add or delete.
- **Database**: Utilizes PostgreSQL, a free database provided by NEON, for reliable data storage.
- **Backend**: Built using Drizzle ORM for seamless database interactions.
- **Frontend**: Developed with React.js for a responsive and interactive user experience.

## Getting Started

To get started with the Personal Expense Tracker, follow these steps:

### Prerequisites

- Node.js (latest version recommended)
- PostgreSQL database setup via NEON
- A code editor (like VSCode)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/ZaryabKhan420/AI-Expense-Tracker.git
   cd AI-Expense-Tracker
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Setup Database**:

   - Create a PostgreSQL database using NEON.
   - Configure the database connection in the backend configuration file.

4. **Run the Application**:

   - Start the backend server:
     ```bash
     npm run db:studio
     ```
   - Start the frontend:
     ```bash
     npm run dev
     ```

5. **Access the App**:
   Open your browser and go to `http://localhost:3000` to view the application.

## Usage

1. **Login**: Use your email/password or third-party login methods to access your account.
2. **Add Income**: Navigate to the income section and add your income streams.
3. **Create Budgets**: Go to the budget section to create new budgets for different categories.
4. **Track Expenses**: Add expenses under each budget category and manage them as needed.
5. **Delete**: You can delete any income streams, budgets, or expenses at any time.

Feel free to reach out with any questions or feedback. Happy tracking!
