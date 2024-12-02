#!/bin/bash

# Create project structure
mkdir -p BYTE/src/{public,views,routes,controllers,services,models}
cd BYTE

# Initialize project and install dependencies
npm init -y
npm install express mongoose redis socket.io @solana/web3.js @solana/spl-token dotenv bull ejs express-ejs-layouts express-session gpu.js node-schedule tailwindcss
npm install --save-dev nodemon eslint jest

# Create .env file
cat > .env << EOL
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/byte
REDIS_URL=redis://localhost:6379
MIN_ALLOCATION_SIZE=0.1
MAX_ALLOCATION_SIZE=1.0
SOLANA_RPC_URL=https://api.devnet.solana.com
BYTE_TOKEN_ADDRESS=your_token_address_here
EOL

# Move index.html to public folder
mv index.html src/public/

# Update package.json scripts
npm pkg set scripts.start="node src/index.js"
npm pkg set scripts.dev="nodemon src/index.js"
npm pkg set scripts.setup="bash setup.sh"

# Make the script executable
chmod +x setup.sh

echo "Setup complete! Run 'npm run dev' to start the application." 