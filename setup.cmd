@echo off

:: Create project structure
mkdir BYTE
cd BYTE
mkdir src\public src\views src\routes src\controllers src\services src\models

:: Initialize project
npm init -y

:: Install dependencies
npm install express mongoose redis socket.io @solana/web3.js @solana/spl-token dotenv bull ejs express-ejs-layouts express-session gpu.js node-schedule tailwindcss
npm install --save-dev nodemon eslint jest

:: Create .env file
echo PORT=3000 > .env
echo NODE_ENV=development >> .env
echo MONGODB_URI=mongodb://localhost:27017/byte >> .env
echo REDIS_URL=redis://localhost:6379 >> .env
echo SOLANA_RPC_URL=https://api.devnet.solana.com >> .env
echo BYTE_TOKEN_ADDRESS=your_token_address_here >> .env

:: Create index.js
echo const express = require('express'); > src\index.js
echo const path = require('path'); >> src\index.js
echo const app = express(); >> src\index.js
echo app.use(express.static(path.join(__dirname, 'public'))); >> src\index.js
echo app.listen(3000, () => console.log('Server running on port 3000')); >> src\index.js

:: Move index.html to public folder
move index.html src\public\

:: Update package.json scripts
npm pkg set scripts.start="node src/index.js"
npm pkg set scripts.dev="nodemon src/index.js"

echo Setup complete! Run 'npm run dev' to start the application. 