var mongoose = require('mongoose'), 
	Schema = mongoose.Schema,
	Retrospective = require('./retrospective'),
	DateHelper = require('../lib/DateHelper');

var projectSchema = new Schema({
	name : String,
	retrospectives : [Retrospective]
});

projectSchema.virtual('health').get(function () {

	var numberOfRetrospectives = this.retrospectives.length;
	var health = 0;

	if(numberOfRetrospectives > 0)
	{
		this.retrospectives.sort(DateHelper.dateSortDesc);

		var variation = 0

		if(this.retrospectives.length > 1){
			variation = this.retrospectives[0].health - this.retrospectives[1].health;
		}

		return {amount : this.retrospectives[0].health, variation: variation};
	}

	return {amount : health, variation: 0}

});

module.exports = mongoose.model('project', projectSchema);