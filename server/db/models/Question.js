const mongoose = require('mongoose');

const Question = mongoose.Schema(
    {
        title: { type: String, required: true },
        text: { type: String, required: true },
        creator: { type: String, required: true },
        status: { type: String, required: true },
        createdAt: { type: Date, required: true },
        views: { type: Number, required: true },
        answers: { type: Number, required: true },
        comments: { type: Number, required: true },
        upvotes: { type: Number, required: true },
        downvotes: { type: Number, required: true },
    },
    { timestamps: { createdAt: false, updatedAt: true } }
);

module.exports = mongoose.model('Question', Question);
