const express = require('express');
const router = express.Router();
const { createQuiz, getActiveQuiz, getQuizResult, getAllQuizzes } = require('../controller/quizzesController');
const {cachedQuizResult} = require('../middleware/cache')

// Create a new quiz
router.post('/', createQuiz);

// Get the active quiz
router.get('/active', getActiveQuiz);

// Get the result of a quiz by its ID
router.get('/:id/result',cachedQuizResult, getQuizResult);

// Get all quizzes
router.get('/all', getAllQuizzes);

//unmatch route
router.use('*', (req, res) => {
    res.status(404).json({ error: 'Resource not found' });
});

module.exports = router;
