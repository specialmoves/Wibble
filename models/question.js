var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	QuestionAnswer = require('./questionAnswer');

var questionSchema = new Schema({
	name : String,
	description : String,
	category : String,
	order : Number,
	answers : [QuestionAnswer],

});


questionSchema.virtual('stats').get(function () {

	var stats = [
				{total : 0, percentage : 0}, 
				{total : 0, percentage : 0},
				{total : 0, percentage : 0},
				{total : 0, percentage : 0},
				{total : 0, percentage : 0}];

	var numberOfParticipants = 0;
	this.answers.forEach(function(answer){
		stats[answer.answer].total++;
		numberOfParticipants++
	});

	this.answers.forEach(function(answer){
			stats[answer.answer].percentage = stats[answer.answer].total / numberOfParticipants * 100;
	});

	return stats;
});


questionSchema.virtual('health').get(function () {

	var numberOfParticipants = 0;

	this.answers.forEach(function(answer){
		if(answer.answer != 0)
		{
			numberOfParticipants++;
		}

	});	

	if(numberOfParticipants == 0){
		return 0;
	}

	var health = 0;	

	for (var i = 0; i < this.stats.length; i++) {
		switch(i){
			case 0:
			case 4:
				break;
			case 1:
				health += (this.stats[i].total * 100) / numberOfParticipants;
				break;
			case 2:
				health += (this.stats[i].total * 66) / numberOfParticipants;
				break;
			case 3:
				health += (this.stats[i].total * 33) / numberOfParticipants;
				break;
		}
	}
	
	return health;

});


module.exports = mongoose.model('question', questionSchema);