import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/database';
import { logger, morganStream } from './config/logger';
import { errorHandler } from './middlewares/error.middleware';
import { validateEnv } from './utils/validateEnv';
import routes from './routes';

// Load environment variables first
require('dotenv').config();

// Then validate environment variables
validateEnv();

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(','),
    credentials: true
  })
);
app.use(helmet());
app.use(cookieParser());

// Logging middleware
app.use(
  morgan('combined', {
    stream: morganStream,
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

// Handle unhandled routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new Error(`Can't find ${req.originalUrl} on this server!`));
});

// Start server
const PORT = process.env.PORT || 3000;
let server: any;

const startServer = async () => {
  try {
    await connectDB();
    server = app.listen(PORT, () => {
      logger.info(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      );
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
  if (server) {
    server.close(() => {
      logger.info('💥 Process terminated!');
    });
  }
});

startServer();

export default app;
