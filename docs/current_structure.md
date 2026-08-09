# Current Project Structure Snapshot

Tài liệu này chỉ dùng để lưu cấu trúc thư mục hiện tại của dự án.
- Chỉ cập nhật khi có yêu cầu rõ ràng từ người dùng.
- Không tự động cập nhật khi code hoặc thư mục thay đổi.

Snapshot thời gian: 2026-08-09

```text
backend/ # root của dự án
├── docker-compose.yml
├── package.json
├── README.md
├── docs/
│   ├── current_structure.md
│   ├── folder_structure.md
│   ├── instructions.md
│   └── Ke_hoach_trien_khai_Backend_Microservices.md
├── gateway/
│   ├── Dockerfile
│   ├── package.json
│   ├── .env
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── config/
│       │   └── env.js
│       ├── middlewares/
│       │   └── error.middleware.js
│       ├── routes/
│       │   └── auth.route.js
│       ├── utils/
│       │   └── response.js
├── services/
│   └── auth/
│       ├── Dockerfile
│       ├── package.json
│       ├── prisma/
│       │   └── schema.prisma
│       └── src/
│           ├── app.js
│           ├── server.js
│           ├── config/
│           │   ├── env.js
│           │   └── prisma.js
│           ├── consumers/
│           ├── controllers/
│           │   └── auth.controller.js
│           ├── middlewares/
│           │   └── auth.middleware.js
│           ├── publishers/
│           ├── repositories/
│           │   └── auth.repository.js
│           ├── routes/
│           │   └── auth.route.js
│           ├── services/
│           │   └── auth.service.js
│           ├── utils/
│           │   └── jwt.js
│           └── validations/
│               └── auth.validation.js
├── shared/
│   ├── Dockerfile
│   ├── package.json
│   ├── config/
│   │   ├── env.js
│   │   └── index.js
│   ├── constants/
│   │   ├── events.js
│   │   ├── exchanges.js
│   │   ├── index.js
│   │   └── queues.js
│   ├── middlewares/
│   │   ├── error.middleware.js
│   │   └── index.js
│   ├── rabbitmq/
│   │   ├── connection.js
│   │   ├── consumer.js
│   │   └── index.js
│   ├── utils/
│   │   ├── crypto.js
│   │   ├── date.js
│   │   ├── errors.js
│   │   ├── helper.js
│   │   ├── index.js
│   │   ├── logger.js
│   │   └── proxy.js
│   └── response.js
└── db/
    ├── delete_db.sql
    ├── trigger_updated_at.sql
    └── user_service.sql
```
