const Todo = require('../models/Todo');

// @desc    Get all todos
// @route   GET /api/todos
exports.getTodos = async (req, res, next) => {
  try {
    const { view, startDate, endDate } = req.query;
    let query = {};

    if (view === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      query.date = { $gte: today, $lt: tomorrow };
    } else if (view === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      query.date = { $gte: weekAgo };
    } else if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const todos = await Todo.find(query).sort({ date: -1, createdAt: -1 });
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a todo
// @route   POST /api/todos
exports.createTodo = async (req, res, next) => {
  try {
    const { text, category, date } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Please provide todo text' });
    }

    const todo = await Todo.create({
      text,
      category: category || 'personal',
      date: date || new Date()
    });

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a todo
// @route   PUT /api/todos/:id
exports.updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully', id: req.params.id });
  } catch (error) {
    next(error);
  }
};

// @desc    Get statistics
// @route   GET /api/todos/stats
exports.getStats = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayTodos = await Todo.find({
      date: { $gte: today, $lt: tomorrow }
    });

    const completed = todayTodos.filter(t => t.completed).length;
    const total = todayTodos.length;

    // Calculate streak
    let streak = 0;
    let checkDate = new Date();
    checkDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < 30; i++) {
      const nextDay = new Date(checkDate);
      nextDay.setDate(nextDay.getDate() + 1);

      const dayTodos = await Todo.find({
        date: { $gte: checkDate, $lt: nextDay }
      });

      if (dayTodos.length === 0) break;

      const dayCompleted = dayTodos.filter(t => t.completed).length;
      if (dayCompleted === dayTodos.length) {
        streak++;
      } else {
        break;
      }

      checkDate.setDate(checkDate.getDate() - 1);
    }

    // Get 7-day progress
    const progress = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);

      const dayTodos = await Todo.find({
        date: { $gte: date, $lt: nextDay }
      });

      const dayCompleted = dayTodos.filter(t => t.completed).length;

      progress.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        completed: dayCompleted,
        total: dayTodos.length,
        percentage: dayTodos.length > 0 ? (dayCompleted / dayTodos.length) * 100 : 0
      });
    }

    res.json({
      completed,
      total,
      percentage: total > 0 ? (completed / total) * 100 : 0,
      streak,
      progress
    });
  } catch (error) {
    next(error);
  }
};