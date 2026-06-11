const jwt = require('jsonwebtoken');
const User = require('../models/UsersModel');

//בדיקה
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.redirect('/auth/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('<h1>אין הרשאה</h1><p>רק מנהלים יכולים למחוק ספרים</p><a href="/books">חזרה לספרים</a>');
  }
  next();
};

module.exports = { authenticateToken, requireAdmin };