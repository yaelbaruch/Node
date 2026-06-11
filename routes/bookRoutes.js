const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');
const checkBookExists = require('../middleware/checkBookExists');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

router.get('/', bookController.getAllBooks);
router.get('/add', bookController.showAddForm);
router.post('/', bookController.createBook);
router.get('/:id/edit', checkBookExists, bookController.showEditForm);
router.post('/:id/edit', authenticateToken, requireAdmin, checkBookExists, bookController.updateBook);
router.put('/:id', authenticateToken, requireAdmin, checkBookExists, bookController.updateBook);
router.delete('/:id', authenticateToken, requireAdmin, checkBookExists, bookController.deleteBook);
router.get('/:id', checkBookExists, bookController.getBookById);

module.exports = router;