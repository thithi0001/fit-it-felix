# Hướng dẫn chạy dự án Backend

## 1. Khởi động môi trường bằng Docker
Từ thư mục gốc của dự án:

```bash
docker compose up -d rabbitmq
docker compose up -d --build auth gateway
```

Các dịch vụ sẽ chạy ở:
- Gateway: http://localhost:3000
- Auth service: http://localhost:3001
- RabbitMQ UI: http://localhost:15672

## 2. Xem log
```bash
docker compose logs -f auth gateway rabbitmq
```

## 3. Dừng môi trường
```bash
docker compose down
```

## 4. Khi có thay đổi code cần chạy lại môi trường
### Trường hợp thay đổi source code trong service hoặc shared
```bash
docker compose restart auth gateway
```

### Trường hợp thay đổi Dockerfile, docker-compose.yml, hoặc package.json
```bash
docker compose up -d --build auth gateway
```

### Trường hợp thay đổi Prisma schema
```bash
docker compose exec auth npx prisma generate
```
Nếu cần tạo migration mới thì chạy:
```bash
docker compose exec auth npx prisma migrate dev
```

## 5. Chạy local (nếu cần kiểm thử riêng từng service)
### Auth service
```bash
cd services/auth
npm install
npm run dev
```

### Gateway
```bash
cd gateway
npm install
npm run dev
```

## 6. Cài đặt phụ thuộc mới
Nếu thêm package vào service hoặc gateway, chạy:
```bash
cd services/auth && npm install
# hoặc
cd gateway && npm install
```

## 7. Ghi chú quan trọng
- Nếu thay đổi code nhưng container vẫn chưa phản ánh, hãy ưu tiên chạy lại bằng `docker compose restart ...` trước.
- Nếu thay đổi cấu hình container hoặc dependency, hãy dùng `docker compose up -d --build ...`.
- Nếu sửa schema Prisma, cần chạy lại generate/migrate trước khi test.
