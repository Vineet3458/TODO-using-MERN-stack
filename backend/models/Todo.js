const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add a todo text'],
    trim: true,
    maxlength: [500, 'Todo cannot exceed 500 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['personal', 'work', 'fitness', 'learning'],
    default: 'personal'
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: String,
    default: 'default_user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

todoSchema.index({ date: -1, userId: 1 });

module.exports = mongoose.model('Todo', todoSchema);