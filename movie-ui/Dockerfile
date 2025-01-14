# Sử dụng Node.js làm base image
FROM node:20

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép file package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .

# Biên dịch mã TypeScript
RUN npm run build

# Mở cổng ứng dụng
EXPOSE 3000

# Lệnh khởi động ứng dụng
CMD ["npm", "run","dev"]