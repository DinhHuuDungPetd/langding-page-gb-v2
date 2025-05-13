FROM node:20-alpine

# Làm việc trong thư mục /app
WORKDIR /app

# Copy package và cài dependency
COPY package*.json ./
RUN npm install

# Copy toàn bộ mã nguồn (bao gồm cả db.json, nhưng FE không dùng)
COPY . .

# Build FE
RUN npm run build

# Expose FE port
EXPOSE 3002

# Run Next.js production server
CMD ["npm", "start", "--", "-p", "3002"]


