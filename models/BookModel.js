const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true,
    minlength: [2, 'Title must be at least 2 characters']
  },
  author: { 
    type: String, 
    required: [true, 'Author is required'],
  },
  description:{
    type: String, 
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [1000, 'Invalid year']
  },

}, { 
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
