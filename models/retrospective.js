var mongoose = require('mongoose'),
    ActionItem = require('./actionItem'),
    Participant = require('./participant'),
	Question = require('./question'),
	Schema = mongoose.Schema,
	StatisticHelper = require('../lib/statisticHelper');

var retrospectiveSchema = new Schema({
	date : Date,
	facilitator : String,
    summary : String,
    actions : { good: [ActionItem], bad: [ActionItem], rolled: [ActionItem] },
    participants : [Participant],
	questions : [Question.schema],
	lastCompletionRate : String
});


retrospectiveSchema.virtual('wideRangingQuestions').get(function () {

	var matchingQuestions = [];
	this.questions.forEach(function(question){
		if(StatisticHelper.getQuestionVariance(question.stats) > 1){
			matchingQuestions.push(question)
		}
	});

	return matchingQuestions;
});


retrospectiveSchema.virtual('unansweredQuestions').get(function () {

	var numberOfParticipants = this.participants.length;
	var matchingQuestions = [];

	this.questions.forEach(function(question){
		if(question.stats[0].percentage > 40)
		{
			matchingQuestions.push(question)
		}
	});

	return matchingQuestions;

});

retrospectiveSchema.virtual('health').get(function () {

	var numberOfQuestions = 0
	var health = 0;

	this.questions.forEach(function(question){
		numberOfQuestions++;
		health += question.health;
	});

	return numberOfQuestions == 0 ? health : Math.round(health / numberOfQuestions);

});

module.exports = retrospectiveSchema;