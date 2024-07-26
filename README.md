Budget Planner
Overview
Budget Planner is a web application designed to help users manage their expenses and plan their budget effectively. The application allows users to add, view, and manage expenses, with features including real-time currency conversion and data persistence using local storage. The app provides an intuitive and responsive interface for tracking and organizing your financial information.

Features
Expense Tracking: Add and manage expenses with categories and amounts.
Real-Time Currency Conversion: Convert amounts based on real-time currency exchange rates.
Data Persistence: Save user data using local storage for persistent access.
Responsive Design: Ensure the app is usable across various devices and screen sizes.
Technologies Used
Frontend: ReactJS, TypeScript (for type safety), and CSS
Backend: None (client-side application)
API Integration: Currency conversion via external API

Getting Started
To get started with the Budget Planner, follow these steps:

Clone the Repository:
git clone https://github.com/shanku01/BudgetPlanner.git
cd BudgetPlanner

Install Dependencies:
Ensure you have Node.js installed, then run:
npm install
Run the Application:
Start the development server with:
npm start
The application will be accessible at http://localhost:3000.

Build for Production:
To create a production build, run:
npm run build

Features in Detail
Add Expense: Users can input expense details including the name, amount, and category.
Expense List: View a list of added expenses with the ability to remove or edit them.
Currency Selector: Choose your preferred currency for conversion and track expenses accordingly.
Error Handling: Display error messages for invalid inputs or API failures.

Project Structure
The project is organized as follows:
src/
│
├── components/
│   ├── ExpenseForm.tsx
│   ├── ExpenseList.tsx
│   └── CurrencySelector.tsx
│
├── services/
│   └── currencyService.ts
│
├── types/
│   ├── expense.d.ts
│   ├── currency.d.ts
│   └── api.d.ts
│
└── App.tsx

Contributing
Contributions to the Budget Planner project are welcome! If you have suggestions or improvements, please open an issue or submit a pull request.

Fork the Repository
Create a New Branch:
git checkout -b feature/your-feature

Commit Your Changes:
git commit -am 'Add new feature'

Push to the Branch:
git push origin feature/your-feature


License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For any questions or feedback, please reach out to Shashank Pradhan.