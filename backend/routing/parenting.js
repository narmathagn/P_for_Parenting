const express = require('express');
const router = express.Router();
var advancedFind = require('../middleware/advancedFind');
const feed = require('../models/feedschema');
const { getAllQuestions,getQuestionsById,postQuestions,postAnswerToQuestion,IncreaseQuestionCount } = require('../controllers/parenting');


router.get('/allques',advancedFind(feed),getAllQuestions)

router.route('/ques/:id')
        .get(getQuestionsById)
        .put(IncreaseQuestionCount)

router.post('/ques', postQuestions)

router.put('/ans/:id',postAnswerToQuestion)



module.exports = router;