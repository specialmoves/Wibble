var mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://localhost/Velociraptr');

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log('connected to db');
    });
}