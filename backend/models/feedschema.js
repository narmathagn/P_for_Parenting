const mongoose = require('mongoose');

const FeedSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Question is mandatory']
    },
    answer: [{
        solution: {
            type: String
        },
        count: {
            type: Number,
            default: 1
        },
        does:{
            type: Boolean
        }
    }],
    viewCount: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const feed = mongoose.model('feed', FeedSchema);


module.exports = feed