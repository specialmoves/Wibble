var Question = require('../models/question');

// GET: /admin
exports.index = function (req, res) {
	Question.find(function (error, questions) {
		if (error) {
			console.log('error getting questions from db');
			return next(error);
		}

		res.render('admin', {
			title: 'Admin',
			showButton: (questions.length === 0)
		});
	});
};



// POST: /admin/questions/add
exports.addQuestions = function (req, res) {

	var questions = [
		{
			category: 'Project Health',
			name: 'I\'m enjoying this project',
			order: 1
		},

		{
			category: 'Project Health',
			name: 'The team is working well together',
			order: 2
		},

		{
			category: 'Project Health',
			name: 'I understand what the project is and its aims and goals',
			order: 3
		},

		{
			category: 'Project Health',
			name: 'I\'m confident that deadlines will be met on this project',
			order: 4
		},

		{
			category: 'Project Smells Check',
			name: 'Project backlog complete',
			description: 'The project backlog has all stories created with clear acceptance criteria',
			order: 1
		},

		{
			category: 'Project Smells Check',
			name: 'Work is <em>done</em> done',
			description: 'Work is developed and tested and visible before considered done and demo-able',
			order: 2
		},

		{
			category: 'Project Smells Check',
			name: 'Planning is effective',
			description: 'Planning sessions happen on time, people are enthusiastic, and the planning makes the work go smoother',
			order: 3
		},

		{
			category: 'Project Smells Check',
			name: 'Churn rate is low',
			description: 'Once work is done, it\'s complete and doesn\'t have to be adjusted and altered and changed',
			order: 4
		},

		{
			category: 'Project Smells Check',
			name: 'The team is focussed on the project',
			description: 'People aren\'t always switching on/off the project and/or being distracted by other work',
			order: 5
		},

		{
			category: 'Project Smells Check',
			name: 'Documentation is easy to find and is useful',
			description: 'People don\'t need to ask where to find designs, specs, planning; documents are clearly written and have enough detail',
			order: 6
		},

		{
			category: 'Project Smells Check',
			name: 'Stand-ups are effective',
			description: 'They happen on time, at the same time, and are to the point and useful',
			order: 7
		}
	];

	questions.forEach(function (questionConfig) {
		var question = new Question(questionConfig);

		question.save(function (error) {
			if (error) {
				console.log('error populating questions', error);
				return next(error);
			}
		});
	});

	res.redirect('/admin');
};