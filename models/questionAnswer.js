var mongoose = require('mongoose'), 
	Schema = mongoose.Schema;

var questionAnswerSchema = new Schema({
	participant : String,
	answer : Number
});

module.exports = questionAnswerSchema;