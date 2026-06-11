const Book = require('../models/BookModel');

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.render('books', { books });
  } catch (err) {
    err.status = 500
    next(err)
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    res.render('bookDetail', { book: req.book });
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

exports.showAddForm = async (req, res, next) => {
  try {
    res.render('addBook');
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const { title, author, description, year } = req.body;
    const book = new Book({ title, author, description, year });
    await book.save();
    res.redirect('/books');
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

exports.showEditForm = async (req, res, next) => {
  try {
    res.render('editBook', { book: req.book });
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    Object.assign(req.book, req.body);
    await req.book.save();
    res.json({ success: true });
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    await req.book.deleteOne();
    res.json({ success: true });
  } catch (err) {
    err.status = 500;
    next(err);
  }
};
