# SmartBiz Backend

Do‘kon boshqaruv tizimi — Express.js + MongoDB

## Papka tuzilmasi

```
backend/
├── src/
│   ├── config/          # Sozlamalar
│   ├── controllers/     # Controller qatlam
│   ├── services/        # Business logic
│   ├── models/          # Mongoose modellari
│   ├── routes/          # Route'lar
│   ├── middlewares/     # Middleware'lar
│   ├── utils/           # Yordamchi funksiyalar (AppError, catchAsync)
│   ├── docs/            # Swagger hujjatlari
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Ishga tushirish (keyinroq)

```bash
npm install
cp .env.example .env
npm run dev
```

## Reja (bosqichma-bosqich)

1. ✅ Loyiha skeleti
2. MongoDB ulanish
3. Product modeli + CRUD
4. Order modeli
5. Statistics (Aggregation)
6. Logging (Winston)
7. Swagger
8. Docker
