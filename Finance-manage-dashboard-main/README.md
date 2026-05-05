# Personal Finance Management (PFM) Dashboard

## 📖 Overview

The **Personal Finance Management (PFM) Dashboard** is a full-stack MERN application that aggregates financial data from multiple bank accounts using the **Plaid API**. It provides real-time visualizations, spending analysis, budgeting tools, and transaction tracking to help users achieve financial wellness.

## ✨ Features

- 🔐 Secure user authentication (JWT)
- 🏦 **Plaid API integration** (sandbox - real banks/transactions)
- 📊 Interactive Recharts (pie charts, bar charts, trends)
- 💳 Multiple account management
- 📈 Auto-categorization of transactions
- 🏛️ Budget tracking with limits
- 📱 Fully responsive Tailwind CSS UI
- 🛡️ Protected API endpoints

## 🛠 Tech Stack

| Frontend | Backend | Database | APIs |
|----------|---------|----------|------|
| React 18 + Vite | Node.js + Express | MongoDB + Mongoose | Plaid + Axios |
| Tailwind CSS | JWT Auth | | Recharts |

## 📁 Project Structure

```
Finance-manage-dashboard-main/
├── server/                    # Backend API
│   ├── models/                # User, Account, Transaction, PlaidAccount
│   ├── controllers/           # Auth, Plaid, Accounts
│   ├── routes/                # API routes
│   ├── middleware/            # Auth protect
│   └── server.js
├── client/                    # Frontend SPA
│   ├── src/components/        # PlaidLink, Dashboard charts
│   ├── src/pages/             # Login, DashboardPage
│   └── vite.config.js
├── README.md
└── TODO.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 16
- MongoDB (local or Atlas)
- [Plaid Sandbox Keys](https://dashboard.plaid.com/sandbox)

### 1. Clone & Install

```bash
git clone https://github.com/shannu-afk/Finance-manage-dashboard.git
cd Finance-manage-dashboard-main
```

### 2. Backend Setup

```bash
cd server
npm install
```

**`.env` (server)**:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pfm-dashboard
JWT_SECRET=your_super_secret_jwt_key_here
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
PLAID_ENV=sandbox
```

**Start**:
```bash
npm run dev
# http://localhost:5000
```

### 3. Frontend Setup

```bash
cd ../client
npm install
npm run dev
# http://localhost:3000
```

## 🎮 Demo Flow

1. **Register/Login** → Secure JWT session
2. **Dashboard** → Charts + "Connect Bank Account" 
3. **Plaid Link** → Sandbox → Link Chase/Wells Fargo
4. **Auto-sync** → Real transactions → Updated charts
5. **Budget/Analytics** → Category spending + trends

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | User signup | - |
| POST | `/api/auth/login` | User login | - |
| GET | `/api/plaid/link_token` | Get Plaid link token | ✅ |
| POST | `/api/plaid/exchange` | Exchange public_token | ✅ |
| GET | `/api/accounts` | Get accounts | ✅ |
| POST | `/api/accounts/transactions` | Add transaction | ✅ |

## 🧪 Testing Plaid Sandbox

1. Dashboard → **Connect Bank Account**
2. Select **Chase** (sandbox)
3. Username: `user_good`, PIN: `2`
4. Transactions auto-load!

## 📈 Database Models

```javascript
User: {name, email, password}
PlaidAccount: {userId, accessToken, institutionName}
Account: {userId, balance, accountType}
Transaction: {userId, amount, category, merchant}
Budget: {userId, category, monthlyLimit}
```

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5000 | `taskkill /F /IM node.exe` |
| Mongo Error | Start MongoDB service |
| Plaid Error | Check .env keys |
| Token 401 | Clear localStorage |

## 📋 Development Roadmap

- [x] Phase 1: Auth + Models
- [x] Phase 2: Plaid Integration
- [x] Phase 3: Visualizations + Budgets
- [ ] Phase 4: Tests + Deploy (Vercel + Render)

## 🤝 Contributing

1. Fork repo
2. `git checkout -b feature`
3. Commit changes
4. Push + PR

## 📄 License

MIT License - see [LICENSE](LICENSE) 

**Built for production-ready personal finance management! **
