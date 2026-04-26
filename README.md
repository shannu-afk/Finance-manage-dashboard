# PFM Dashboard - Personal Finance Management

A full-stack MERN application for managing personal finances with account aggregation, transaction tracking, and financial insights.

## Project Structure

```
pedustruck/
├── server/                    # Backend (Node.js + Express)
│   ├── config/               # Configuration files
│   ├── models/               # MongoDB Mongoose models
│   ├── controllers/          # Request handlers
│   ├── routes/               # API routes
│   ├── middleware/           # Custom middleware
│   ├── server.js             # Main server file
│   ├── package.json
│   └── .env.example
│
└── client/                    # Frontend (React + Vite)
    ├── src/
    │   ├── pages/           # Page components
    │   ├── components/      # Reusable components
    │   ├── services/        # API calls
    │   ├── context/         # React Context
    │   ├── App.jsx
    │   ├── index.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── package.json
    └── .env.example
```

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Recharts
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **HTTP Client**: Axios

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB URI and JWT secret:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/pfm-dashboard
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ```

5. Start the server:
   ```bash
   # Development with auto-reload
   npm run dev
   
   # Or production
   npm start
   ```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

Frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Accounts
- `GET /api/accounts` - Get all accounts
- `POST /api/accounts` - Create account
- `PUT /api/accounts/:id` - Update account
- `DELETE /api/accounts/:id` - Delete account
- `GET /api/accounts/balance/total` - Get total balance

### Transactions
- `GET /api/accounts/transactions/all` - Get all transactions
- `POST /api/accounts/transactions` - Create transaction
- `PUT /api/accounts/transactions/:id` - Update transaction
- `DELETE /api/accounts/transactions/:id` - Delete transaction
- `GET /api/accounts/analytics/spending` - Get spending by category
- `GET /api/accounts/analytics/trend` - Get monthly trends

## Features Implemented

- ✅ User registration and login with JWT
- ✅ Multiple account management
- ✅ Transaction tracking (manual entry)
- ✅ Spending visualization (pie charts)
- ✅ Income vs Expenses charts
- ✅ Category-based spending analysis
- ✅ Responsive dashboard
- ✅ Secure API endpoints

## Next Steps for Plaid Integration

1. Sign up for Plaid developer account
2. Install Plaid SDK: `npm install plaid`
3. Create Plaid endpoints for bank account linking
4. Implement transaction auto-sync
5. Update account balances automatically

## Database Models

### User
- name, email, password (encrypted), timestamps

### Account
- userId, accountName, accountType, balance, institution, isConnected, timestamps

### Transaction
- userId, accountId, amount, type (debit/credit), category, merchant, description, timestamps

### Budget
- userId, category, monthlyLimit, spent, currentMonth, timestamps

## Development Guidelines

1. **Backend First**: Always test API endpoints with Postman/Insomnia
2. **Authentication**: All endpoints except /auth/* require JWT token
3. **Error Handling**: Consistent error responses with status codes
4. **Frontend**: Components are in `src/components`, pages in `src/pages`
5. **State Management**: Use React Context for global auth state

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env

### CORS Errors
- Backend has CORS enabled for all origins
- Check frontend API_URL matches backend

### Token Errors
- Token is stored in localStorage
- Clear localStorage and re-login if issues occur

## License
MIT
