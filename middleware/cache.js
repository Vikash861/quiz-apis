const NodeCache = require('node-cache');
const cache = new NodeCache();

const cachedQuizResult = (req,res,next) => {

    const id = req.params.id;
    const quizResult = cache.get(id)
    console.log(quizResult)
    if(quizResult) {
        res.status(200).json({quiz: quizResult})
    }
    next();

}

module.exports = {cachedQuizResult, cache};