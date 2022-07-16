const mongoose = require('mongoose');

const Mail = mongoose.Schema(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        reciever: { type: String, required: true },
        subject: { type: String, required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, required: true },
    },
    { timestamps: false }
);

module.exports = mongoose.model('Mail', Mail);
