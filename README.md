# 📚 ספרייה דיגיטלית - Digital Library Management System

פרויקט Node.js מלא למערכת ניהול ספרייה עם אימות משתמשים והרשאות.

## 🎯 תכונות הפרויקט

### טכנולוגיות
- **Node.js** - סביבת הרצה
- **Express** - פריימוורק שרת
- **MongoDB** - מסד נתונים
- **Mongoose** - ODM למונגו
- **EJS** - מנוע תצוגה
- **JWT** - אימות משתמשים
- **bcrypt** - הצפנת סיסמאות

### אבטחה
- הרשמה והתחברות מלאה
- הצפנת סיסמאות עם bcrypt
- JWT tokens לאימות
- שני סוגי משתמשים: user / admin
- הגנה על routes בהתאם להרשאות

### CRUD מלא על ספרים
- ✅ GET /books - קבלת כל הספרים
- ✅ GET /books/:id - קבלת ספר לפי ID
- ✅ POST /books - יצירת ספר חדש
- ✅ PUT /books/:id - עדכון ספר (admin בלבד)
- ✅ DELETE /books/:id - מחיקת ספר (admin בלבד)

## 📁 מבנה הפרויקט

```
TRY-NODE/
├── controllers/          # לוגיקה עסקית
│   ├── authController.js
│   └── bookController.js
├── db/
│   └── confing.js       # חיבור למונגו
├── middleware/          # middleware functions
│   ├── auth.js          # אימות JWT
│   ├── checkBookExists.js
│   ├── errorHandler.js
│   └── validation.js
├── models/              # מודלים של MongoDB
│   ├── BookModel.js
│   └── UsersModel.js
├── routes/              # ניתוב
│   ├── authRoutes.js
│   └── bookRoutes.js
├── views/               # תצוגות EJS
│   ├── index.ejs
│   ├── books.ejs
│   ├── bookDetail.ejs
│   ├── addBook.ejs
│   ├── register.ejs
│   └── login.ejs
├── public/
│   └── style.css
├── .env                 # משתני סביבה
├── app.js              # קובץ ראשי
└── package.json

```

## 🚀 התקנה והרצה

### דרישות מקדימות
- Node.js מותקן
- MongoDB מותקן ורץ

### שלבי התקנה

1. התקנת תלויות:
```bash
npm install
```

2. הגדרת משתני סביבה (קובץ .env כבר קיים):
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookLibary
JWT_SECRET=mySecretKey
ACCESS_TOKEN_SECRET=mySecretKey
JWT_EXPIRES_IN=1h
NODE_ENV=development
```

3. הרצת MongoDB:
```bash
mongod
```

4. הרצת השרת:
```bash
npm start
```
או עם nodemon:
```bash
npm run dev
```

5. פתיחת הדפדפן:
```
http://localhost:3000
```

## 📋 Collections במונגו

### 1. Users Collection
```javascript
{
  userName: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin']),
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Books Collection
```javascript
{
  title: String (required, min: 2),
  author: String (required),
  description: String,
  year: Number (required, min: 1000),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Routes ואבטחה

### Auth Routes (פתוח לכולם)
- `GET /auth/register` - טופס הרשמה
- `POST /auth/register` - יצירת משתמש
- `GET /auth/login` - טופס התחברות
- `POST /auth/login` - התחברות

### Book Routes
- `GET /books` - כל הספרים (פתוח)
- `GET /books/add` - טופס הוספה (פתוח)
- `GET /books/:id` - ספר בודד (פתוח) + **Middleware: checkBookExists**
- `POST /books` - יצירת ספר (פתוח)
- `PUT /books/:id` - עדכון (admin) + **Middleware: authenticateToken, requireAdmin, checkBookExists**
- `POST /books/:id/delete` - מחיקה (admin) + **Middleware: authenticateToken, requireAdmin, checkBookExists**

## 🛡️ Middleware

### checkBookExists
- בודק אם ספר קיים לפי ID
- אם לא קיים → 404
- אם קיים → שומר ב-req.book

### authenticateToken
- בודק JWT token בheader
- אם לא תקף → 401
- אם תקף → שומר משתמש ב-req.user

### requireAdmin
- בודק אם המשתמש הוא admin
- אם לא → 403

### errorHandler
- טיפול מרכזי בשגיאות
- CastError → 400
- ValidationError → 400
- Duplicate → 400
- אחר → 500

## 📝 דוגמאות שימוש

### יצירת משתמש admin
1. גש ל-http://localhost:3000/auth/register
2. מלא שם משתמש וסיסמה
3. בחר "מנהל" בתפריט
4. לחץ הירשם

### הוספת ספר
1. גש ל-http://localhost:3000/books/add
2. מלא פרטי ספר
3. לחץ הוסף ספר

### מחיקת ספר (דורש admin)
1. התחבר כ-admin
2. גש לספר ספציפי
3. לחץ על כפתור מחק

## ✅ עמידה בדרישות הפרויקט

- ✅ Node.js + Express
- ✅ MongoDB עם 2 collections (Users, Books)
- ✅ EJS - 6 עמודים
- ✅ MVC architecture
- ✅ async/await בכל הפונקציות
- ✅ errorHandler מרכזי עם status codes
- ✅ dotenv למשתני סביבה
- ✅ הרשמה והתחברות
- ✅ הצפנת סיסמאות (bcrypt)
- ✅ JWT tokens
- ✅ Middleware לאימות
- ✅ 2 סוגי משתמשים (user/admin)
- ✅ הגנה על routes
- ✅ ולידציה במודלים
- ✅ CRUD מלא על Books
- ✅ Middleware ייעודי checkBookExists

## 🎨 עמודי EJS

1. **index.ejs** - עמוד בית
2. **register.ejs** - הרשמה
3. **login.ejs** - התחברות
4. **books.ejs** - רשימת ספרים
5. **bookDetail.ejs** - פרטי ספר
6. **addBook.ejs** - הוספת ספר

## 📌 הערות חשובות

- הקוד נקי וקריא עם שמות משמעותיים
- אין קוד מיותר
- כל הפונקציות async/await
- טיפול בשגיאות מקיף
- ולידציה בכל שכבה
