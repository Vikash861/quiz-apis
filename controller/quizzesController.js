const Quiz = require('../model/Quiz');
const {cache} = require('../middleware/cache');

// Create a new quiz
async function createQuiz(req, res, next) {
  try {

    const { question, options, rightAnswer, startDate, endDate } = req.body;

    const quiz = new Quiz({
      question,
      options,
      rightAnswer,
      startDate,
      endDate
    });

    await quiz.save();

    res.status(201).json({ message: 'Quiz created successfully', quizId: quiz._id });
  } catch (error) {
    next(error);
  }
}

// Get the active quiz
async function getActiveQuiz(req, res, next) {
  try {
    const currentDateTime = new Date();
    const activeQuiz = await Quiz.findOne({
      startDate: { $lte: currentDateTime },
      endDate: { $gte: currentDateTime },
    });

    if (!activeQuiz) {
      return res.status(404).json({ message: 'No active quiz found' });
    }

    res.status(200).json({ cachedQuiz: activeQuiz });
  } catch (error) {
    next(error);
  }
}

// Get the result of a quiz by its ID

async function getQuizResult(req, res, next) {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (quiz.status !== 'finished') {
      return res.status(400).json({ message: 'Quiz result not available yet' });
    }

    const result = quiz.options[quiz.rightAnswer];
    console.log(quizId)
    cache.set(quizId,result)

    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
}

// Get all quizzes
async function getAllQuizzes(req, res, next) {
  try {
    const quizzes = await Quiz.find();

    res.status(200).json({ quizzes });
  } catch (error) {
    next(error);
  }
}


// Updating the quizzes status
async function updateQuizStatus() {
  try {
    const currentDateTime = new Date();

 
    const quizzes = await Quiz.find({
      $or: [
        { status: 'active' },
        { status: 'inactive' },
      ],
    });

    quizzes.forEach(async (quiz) => {

      if (quiz.startDate <= currentDateTime && currentDateTime <= quiz.endDate) {
        quiz.status = 'active';
      } else if (currentDateTime > quiz.endDate) {
        quiz.status = 'finished';
      } else {
        quiz.status = 'inactive';
      }

      await quiz.save();
    });
  } catch (error) {
    next(error);
  }
}



module.exports = { createQuiz, getActiveQuiz, getQuizResult, getAllQuizzes, updateQuizStatus };
