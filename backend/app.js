import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js';
import logger from './utils/logger.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/todos', todoRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error Handling
app.use((err, req, res, next) => {
  logger.error(`Unhandled Error: ${err.stack}`);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;