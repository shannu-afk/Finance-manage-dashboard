@echo off
echo 🚀 PFM Dashboard Setup Script
echo ==============================
echo.

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd server
call npm install
copy .env.example .env
echo ✅ Backend setup complete!
echo ⚠️  Please update server\.env with your MongoDB URI
echo.

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd ..\client
call npm install
copy .env.example .env
echo ✅ Frontend setup complete!
echo.

echo 🎉 Setup complete!
echo.
echo 📝 Next steps:
echo 1. Update server\.env with your MongoDB connection string
echo 2. Start MongoDB
echo 3. Run backend: cd server ^&^& npm run dev
echo 4. In another terminal, run frontend: cd client ^&^& npm run dev
echo.
echo 🌐 Backend: http://localhost:5000
echo 🌐 Frontend: http://localhost:3000
