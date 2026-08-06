Tổng thể:
backend/
│
├── .env
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
├── README.md
│
├── gateway/
├── services/
├── shared/
└── docs/

api-gateway:
gateway/
│
├── Dockerfile
├── package.json
├── .env
├── .dockerignore
│
└── src/
    │
    ├── app.js
    ├── server.js
    │
    ├── config/
    │   ├── env.js
    │   └── services.js
    │
    ├── routes/
    │   ├── auth.route.js
    │   ├── user.route.js
    │   ├── product.route.js
    │   ├── order.route.js
    │   ├── notification.route.js
    │   └── index.js
    │
    ├── middlewares/
    │   ├── auth.middleware.js
    │   ├── rate-limit.middleware.js
    │   ├── error.middleware.js
    │   └── not-found.middleware.js
    │
    └── utils/
        └── response.js

shared:
shared/
│
├── config/
│   ├── env.js
│   └── index.js
│
├── constants/
│   ├── events.js
│   ├── queues.js
│   ├── exchanges.js
│   ├── roles.js
│   └── index.js
│
├── rabbitmq/
│   ├── connection.js
│   ├── publisher.js
│   ├── consumer.js
│   └── index.js
│
├── middlewares/
│   ├── error.middleware.js
│   └── index.js
│
└── utils/
    ├── logger.js
    ├── response.js
    ├── errors.js
    ├── crypto.js
    └── index.js

các service:
services/
│
├── auth/
├── user/
├── product/
├── order/
└── notification/
...

cấu trúc chung của 1 service:
auth/
│
├── Dockerfile
├── package.json
├── .env
├── .dockerignore
│
├── prisma/
│   └── schema.prisma
│
└── src/
    │
    ├── app.js
    ├── server.js
    │
    ├── config/
    │   ├── env.js
    │   ├── prisma.js
    │   └── rabbitmq.js
    │
    ├── routes/
    │   ├── auth.route.js
    │   └── index.js
    │
    ├── controllers/
    │   └── auth.controller.js
    │
    ├── services/
    │   └── auth.service.js
    │
    ├── repositories/
    │   └── auth.repository.js
    │
    ├── validations/
    │   └── auth.validation.js
    │
    ├── middlewares/
    │   └── auth.middleware.js
    │
    ├── consumers/
    │
    ├── publishers/
    │
    └── utils/
        ├── jwt.js
        ├── helper.js
        └── response.js


