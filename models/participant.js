var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var participantSchema = new Schema({
	name : String,
    attended : Boolean
});

module.exports = participantSchema;