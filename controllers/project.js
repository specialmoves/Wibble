
var Project = require('../models/project');
var Question = require('../models/question');
var DateHelper = require('../lib/dateHelper');

// GET: /
exports.index = function(req, res) {
	Project.find({active: true},function(error, projects) {
		res.render('index', {
			title: 'Projects',
			projects: projects
		});
	});
};

// POST: /project/create
exports.createProject = function (req, res, next) {

	req.assert("projectName", "Title cannot be Empty").notEmpty();

	var pageErrors = req.validationErrors();

	var projects = Project.find({active: true},function(error, projects){

		if (!pageErrors) {

			var project = new Project({
				name: req.body.projectName,
				active: true
			});

			Project.findOne({name: { $regex: new RegExp("^" + project.name.toLowerCase(), "i") } }, function(error, project) {
				if (error) {
					console.log('error getting project from db');
					return next(error);
				}

				if (project) {
					console.log('name already exists');
					return res.render('index', {
						title : 'Projects',
						projects : projects,
						errors : [{param: "title", msg: "There is already a project by that name", value: req.body.projectName }]
					});
				}

				if (!project) {

					var project = new Project({
						name : req.body.projectName,
						active: true
					});

					console.log('project: project name does exist');

					project.save(function(error, project){
						if(error){
							console.log('error saving', error);
							return next(error);
						}

						res.redirect('/project/' + project._id);
					});
				}
			});

		} else {

			return res.render('index', {
				title: 'Projects',
				projects : projects,
				errors : pageErrors
			});

		}

	});
};

exports.deleteProject = function (req, res, next) {
	var project = req.project;
	project.active = false;

	project.save(function(error, project){
		if(error){
			console.log('error saving', error);
			return next(error);
		}

		res.redirect('/');
	});	

}

exports.viewProject = function (req, res, next) {
	var project = req.project;

	project.retrospectives.sort(DateHelper.dateSortDesc);

	res.render('project', {
		title: project.name,
		project: project,
		date_options: DateHelper.dateOptions,
		month_options: DateHelper.monthOptions,
		year_options: DateHelper.yearOptions
	});
};