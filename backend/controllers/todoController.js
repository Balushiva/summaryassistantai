import Todo from '../models/Todo.js';
import { summarizeTodos } from '../services/openaiService.js';
import logger from '../utils/logger.js';

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort('-createdAt');
    res.json({ success: true, count: todos.length, data: todos });
  } catch (error) {
    logger.error(`Get all todos error: ${error.message}`);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

export const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    logger.error(`Create todo error: ${error.message}`);
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    res.json({ success: true, data: {} });
  } catch (error) {
    logger.error(`Delete todo error: ${error.message}`);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

export const summarizeAndSend = async (req, res) => {
  try {
    const result = await summarizeTodos();
    res.json({ success: true, data: result });
  } catch (error) {
    logger.error(`Summarize error: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to generate summary' 
    });
  }
};