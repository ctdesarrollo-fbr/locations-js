FROM node

WORKDIR /app

# Copy dependency definitions first
COPY package*.json ./

# Install dependencies inside the image
RUN npm install

# Copy the rest of your application code
COPY . .

EXPOSE 8000