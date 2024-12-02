#!/bin/bash

# Create necessary directories
mkdir -p src/public/js
mkdir -p src/public/css
mkdir -p src/routes
mkdir -p src/services
mkdir -p src/models

# Install dependencies
npm install

# Copy .env.example to .env if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
fi

echo "Setup complete! Run 'npm run dev' to start the server." 