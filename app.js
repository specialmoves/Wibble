
/**
 * Module dependencies.
 */

var express = require('express'),
	controllers = require('./controllers'),
	http = require('http'),
	path = require('path'),
	hbs = require('hbs'),
	mongoose = require('mongoose'),
	dateFormat = require('dateformat'),
	expressValidator = require('express-validator');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(expressValidator());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'assets')));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('format_date', function(){
	return dateFormat(this.date, 'fullDate');
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./lib/routes.js')(app);
require('./lib/db.js')();

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
