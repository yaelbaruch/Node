const User = require('../models/UsersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.showRegisterForm = (req, res) => {
  res.render('register');
};

exports.showLoginForm = (req, res) => {
  res.render('login');
};

exports.register = async (req, res) => {
  try {
    const { userName, password, role } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(409).json({ message: "username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
     
    const newUser = await User.create({ userName, password: hashedPassword, role: role || 'user' });

    res.redirect('/auth/login');
  } catch (error) {
    res.status(400).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ error: 'userName and password required' });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "invalid userName or password" });
    }

    const token = jwt.sign(
      { userId: user._id, userName: user.userName, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, userName: user.userName, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.logout = (req, res) => {
  res.redirect('/');
};

