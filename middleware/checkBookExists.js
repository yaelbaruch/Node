const Book = require('../models/BookModel');

const checkBookExists = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    req.book = book;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid book ID' });
  }
};

module.exports = checkBookExists;