import express from 'express';
import {
  getAllTodos,
  createTodo,
  deleteTodo,
  summarizeAndSend,
} from '../controllers/todoController.js';

const router = express.Router();

router.route('/')
  .get(getAllTodos)
  .post(createTodo);

router.route('/:id')
  .delete(deleteTodo);

router.route('/summarize')
  .post(summarizeAndSend);

export default router;