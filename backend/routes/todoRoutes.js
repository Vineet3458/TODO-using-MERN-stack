const express = require('express');
const router = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getStats
} = require('../controllers/todoController');

router.route('/').get(getTodos).post(createTodo);
router.route('/stats').get(getStats);
router.route('/:id').put(updateTodo).delete(deleteTodo);

module.exports = router;