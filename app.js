require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const { updateQuizStatus } = require('./controller/quizzesController');
const quizzesRouter = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const limiter = require('./middleware/rateLimitingMiddleware');
const connectDB = require('./config/dbConfig')


// intializing express app
const app = express();
// database connection
connectDB()

// Middleware
app.use(express.json());
app.use(limiter);

// Routes
app.use('/quizzes', quizzesRouter);

// Error handling middleware
app.use(errorHandler);

// update quizzes status on every minute
cron.schedule('* * * * *', updateQuizStatus);

// Start the server
const port = process.env.PORT || process.env.PORT_DEV;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
