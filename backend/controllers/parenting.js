const feed = require('../models/feedschema');
const asyncHandler = require('../middleware/async');

console.log('attempting to connect parenting route')

const getAllQuestions = asyncHandler(async (req, res) => {
    feed.aggregate([
        {$unwind: '$answer'},
        {$sort: {'answer.count':-1}},
        {$group: {_id: '$_id', 'answer': {$push:'$answer'},question : { $first: '$question' },viewCount : { $first: '$viewCount' }}},
        {$sort:{viewCount:-1}}
        ]).exec((err,docs)=>{
           res.json({data:docs,advanced:res.advancedResults})
       })
    // res.status(200).json(res.advancedResults)
})


const getQuestionsById = asyncHandler(async (req, res) => {
    feed.findOne({ _id: req.params.id }, function (err, feeds) {
        console.log("found")
        res.json(feeds)
    })
})

const postQuestions = asyncHandler(async (req, res) => {
    feed.findOne({ question: req.body.question }, function (err, doc) {
        console.log("found")
        if (doc) {
            res.json({ message: "this question is already exist" })
        }
        else {
            var quest = new feed({
                question: req.body.question
            })
            quest.save(function (err, feeds) {
                if (err) {
                    return console.error(err);
                }
                console.log("saved to parenting collection")
                res.status(200).json({
                    "message": "Data received", "data": feeds
                })
            })
        }
    })
})

const postAnswerToQuestion = asyncHandler(async (req, res) => {
    var ques_id = req.params.id;

    let doc = await feed.findOne({ _id: ques_id });
    if (doc.answer.some(value => value["solution"] === req.body.answer)) {
        var loc = doc.answer.map(item => item.solution).indexOf(req.body.answer);
        doc.answer[loc].count = doc.answer[loc].count + 1;
        doc.save().then(savedDoc => {
            res.status(200).json({
                "data": savedDoc
            })
        });
    }
    else {
        feed.findByIdAndUpdate(ques_id, { $push: { answer: { solution: req.body.answer , does:req.body.does} } }, {
            new: true,
            runValidators: true
        }).then(data => {
            res.status(200).json({
                "data": data
            })
        })
    }
})
const IncreaseQuestionCount=asyncHandler(async (req, res)=>{
    var quest_id=req.params.id;
    let doc = await feed.findOne({ _id: quest_id });
    doc.viewCount=doc.viewCount+1;
        doc.save().then(savedDoc => {
            res.status(200).json({
                "data": savedDoc
            })
        });
})

module.exports = { getAllQuestions, getQuestionsById, postQuestions, postAnswerToQuestion,IncreaseQuestionCount };