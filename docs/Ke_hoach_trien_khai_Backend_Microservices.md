# Kế hoạch triển khai Backend Microservices

## Giai đoạn 1. Khởi tạo dự án

**Mục tiêu:** Tạo khung dự án.

**Thực hiện** - Tạo cấu trúc thư mục. - Tạo `.env`, `.env.example`,
`.gitignore`. - Tạo `docker-compose.yml`. - Tạo `package.json`. - Tạo
`README.md`.

**Kết quả** - Chạy `docker compose up`. - RabbitMQ hoạt động.

------------------------------------------------------------------------

## Giai đoạn 2. Shared Library

**Thực hiện** - `shared/config` - `shared/constants` -
`shared/rabbitmq` - `shared/middlewares` - `shared/utils`

Hoàn thiện: - env - logger - response - errors - RabbitMQ connection -
publisher - consumer

**Kết quả** - Mọi service có thể dùng chung thư viện.

------------------------------------------------------------------------

## Giai đoạn 3. Service Template

**Mục tiêu** - Xây dựng template chuẩn cho một service (Auth).

**Thực hiện** - config - routes - controllers - services -
repositories - validations - middlewares - utils

Chỉ tạo endpoint:

`GET /health`

**Kết quả**

``` json
{ "status": "OK" }
```

------------------------------------------------------------------------

## Giai đoạn 4. API Gateway

**Thực hiện** - Xây dựng Gateway. - Routing tới Auth Service. - Chưa xử
lý JWT.

**Kết quả** Client → Gateway → Auth Service hoạt động.

------------------------------------------------------------------------

## Giai đoạn 5. Prisma

**Thực hiện** - Tạo `schema.prisma`. - Tạo `prisma.js`. - Generate
Prisma Client. - Kết nối Neon.

**Kết quả** - Đọc dữ liệu từ PostgreSQL.

------------------------------------------------------------------------

## Giai đoạn 6. Repository Pattern

Hoàn thiện luồng:

Controller → Service → Repository → Prisma

------------------------------------------------------------------------

## Giai đoạn 7. Authentication

Thực hiện: - Login - Logout - Refresh Token - Verify Token - JWT -
bcrypt

**Kết quả** - `POST /login` trả JWT.

------------------------------------------------------------------------

## Giai đoạn 8. Gateway Authentication

**Thực hiện** - Middleware kiểm tra JWT. - Forward request tới service.

------------------------------------------------------------------------

## Giai đoạn 9. RabbitMQ

**Thực hiện** - Publisher - Consumer - Trao đổi event giữa các service.

Ví dụ:

User Service → RabbitMQ → Notification Service

------------------------------------------------------------------------

## Giai đoạn 10. Các Service nghiệp vụ

Triển khai theo thứ tự: 1. User 2. Device 3. Notification ...

------------------------------------------------------------------------

## Giai đoạn 11. Hoàn thiện

-   Validation
-   Error Handler
-   Logging
-   Phân quyền
-   Pagination
-   Filter
-   Upload
-   API Documentation
-   Docker Optimization

------------------------------------------------------------------------

# Lộ trình

``` text
1. Khởi tạo dự án
        ↓
2. Shared Library
        ↓
3. Service Template
        ↓
4. API Gateway
        ↓
5. Prisma
        ↓
6. Repository Pattern
        ↓
7. Authentication
        ↓
8. Gateway Authentication
        ↓
9. RabbitMQ
        ↓
10. User Service
        ↓
11. Product Service
        ↓
12. Order Service
        ↓
13. Notification Service
        ↓
14. Hoàn thiện
```

# Đề xuất Branch

  Branch                    Nội dung
  ------------------------- ----------------------
  01-project-init           Khởi tạo dự án
  02-shared                 Shared Library
  03-service-template       Template Service
  04-api-gateway            Gateway
  05-prisma                 Prisma
  06-auth                   Authentication
  07-gateway-auth           JWT Gateway
  08-rabbitmq               RabbitMQ
  09-user-service           User Service
  10-product-service        Product Service
  11-order-service          Order Service
  12-notification-service   Notification Service
  13-refactor               Hoàn thiện
