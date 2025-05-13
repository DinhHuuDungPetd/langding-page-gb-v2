FROM node:20-alpine

WORKDIR /app

RUN npm install -g json-server

# Copy db.json từ context chính
COPY ./db.json ./db.json

EXPOSE 3003

CMD ["json-server", "--watch", "db.json", "--host", "0.0.0.0", "--port", "3003", "--cors"]
