FROM node:20-alpine

# Làm việc trong thư mục /app
WORKDIR /app

# Copy package và cài dependency
COPY package*.json ./
RUN npm install

COPY . .

# Build FE
RUN npm run build

# Expose FE port
EXPOSE 3000

# Run Next.js production server
CMD ["npm", "start", "--", "-p", "3000"]
