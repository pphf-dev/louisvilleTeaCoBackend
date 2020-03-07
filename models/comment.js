const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    firstname: {
        type: String,
        default: '',
        required: true
    },
    lastname: {
        type: String,
        default: '',
        required: true
    },
    email: {
        type: String,
        default: ''
    },
    newsletter: {
        type: Boolean,
        default: false
    },
    text: {
        type: String,
        default: '',
        required: true
    }
}, {
    timestamps: true
});

const Comment = mongoose.model('Feedback', commentSchema);

module.exports = Comment;