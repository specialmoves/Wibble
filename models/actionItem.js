var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var actionItemSchema = new Schema({
    item: String,
    keyPoints: String,
    actions: String
});

module.exports = actionItemSchema;