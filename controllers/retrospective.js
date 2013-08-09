var Project = require('../models/project');
var Retrospective = require('../models/retrospective');
var Participant = require('../models/participant');
var moment = require('moment');
var Question = require('../models/question');
var DateHelper = require('../lib/dateHelper');
var dateFormat = require('dateformat');

// GET : /project/:projectId/retrospective/:retrospectiveId

exports.viewRetrospective = function(req, res) {

    var project = req.project;

    var retrospective = filterRetrospective(req, project);

    var projectHealth = filterQuestions(retrospective, 'Project Health');
    var projectSmells = filterQuestions(retrospective, 'Project Smells Check');

    res.render('retrospective', {
        title : dateFormat(retrospective.date, 'fullDate'),
        project: project,
        projectHealth : projectHealth,
        projectSmells : projectSmells,
        retrospective : retrospective
    });

};

function filterQuestions(collection, type) {
    return collection.questions.filter(function(questions){
        return questions.category == type;
    });
}

function filterRetrospective(req, project) {
    return project.retrospectives.filter(function(retro){
        return retro._id == req.params.retrospectiveId;
    })[0];
}

// POST : /project/:projectId/retrospective/:retrospectiveId

exports.updateRetrospective = function(req, res, next){


    project = req.project;

    if (!project) {
        return res.send('404 - Project Not Found', 404);
    }
        
        var retrospective = filterRetrospective(req, project);

    retrospective.lastCompletionRate = req.body.lastCompletionRate;

    updateExistingRetrospectiveActions(retrospective.actions.bad, 'bad', req.body);
    updateExistingRetrospectiveActions(retrospective.actions.good, 'good', req.body);
    updateExistingRetrospectiveActions(retrospective.actions.rolled, 'rolled', req.body);

    addNewActionsToRetrospective(retrospective.actions.bad, 'bad', req.body);
    addNewActionsToRetrospective(retrospective.actions.good, 'good', req.body);
    addNewActionsToRetrospective(retrospective.actions.rolled, 'rolled', req.body);

    retrospective.participants.forEach(function(participant){
        participant.attended = typeof req.body[participant._id] != "undefined";
    });

    retrospective.summary = req.body.retrospectiveSummary;

    project.save(function(error){
        if(error){
            return next(error);
        }
        return res.redirect('/project/' + project._id + '/retrospective/' + retrospective._id);
    });

};

function addNewActionsToRetrospective(retrospectiveActions, type, formPost){

    var newItems = formPost['actions.' + type +'.create.item'];
    var newKeyPoints = formPost['actions.' + type + '.create.keyPoints'];
    var newActions = formPost['actions.' + type + '.create.actions'];

    var newItemsCount = newItems instanceof Array ? newItems.length : newItems ? 1 : 0;

    if(newItemsCount == 1){
        retrospectiveActions.push({
            item : newItems,
            keyPoints : newKeyPoints,
            actions : newActions
        });
    }
    else{
        for(var i = 0; i < newItemsCount; i++){
            retrospectiveActions.push({
                item : newItems[i],
                keyPoints : newKeyPoints[i],
                actions : newActions[i]
            });
        }
    }
}

function updateExistingRetrospectiveActions(retrospectiveActions, type, formPost){

    retrospectiveActions.forEach(function(actionItem){
        actionItem.item = formPost['actions.' + type +'.' + actionItem._id + '.item'];
        actionItem.keyPoints = formPost['actions.' + type +'.' + actionItem._id + '.keyPoints'];
        actionItem.actions = formPost['actions.' + type +'.' + actionItem._id + '.actions'];
    });
}

// GET : /project/:projectId/retrospective/:retrospectiveId/form/:formId?

exports.viewRetrospectiveForm = function(req, res, next) {

    var formId = req.params.formId;
    var pageTitle = 'Retrospective Form';

    if (formId) {
        pageTitle += ' for user ' + formId;
    }

	var project = req.project;
    var retrospective = filterRetrospective(req, project);

    var validDate = moment(retrospective[0].date).format("MMM Do YYYY");

    res.render('retrospectiveForm', {
        title : pageTitle,
        projectHealth : req['project-health-questions'],
        projectSmells : req['project-smells-questions'],
        project : project,
        retrospective : retrospective[0],
        retrospectiveDate : validDate,
    });

};

// POST : /project/:projectId/retrospective/:retrospectiveId/form/save

exports.saveRetrospectiveForm = function(req, res, next) {

    var project = req.project;
    var questions = [];

    req['project-health-questions'].forEach(function(question) {
        questions.push(question._id);
    });

    req['project-smells-questions'].forEach(function(question) {
        questions.push(question._id);
    });

    req.assert(questions, "Some questions need answering").notNull();
    req.assert("participantName", "Name cannot be Empty").notEmpty();

    var pageErrors = req.validationErrors();

    if (!pageErrors) {

        var retrospective = filterRetrospective(req, project);

        retrospective.questions.forEach(function(question){
            question.answers.push({
                participant : req.body.participantName,
                answer : parseInt(req.body[question._id]),
                attended : false
            });
        });

        retrospective.participants.push({ name : req.body.participantName});

        project.save(function(error){

            if(error){
                return next(error);
            }

            return res.redirect('/project/' + req.params.projectId + '/retrospective/' + req.params.retrospectiveId);

        });

    } else {

            var formId = req.params.formId;
            var pageTitle = 'Retrospective Form';

            if (formId) {
                pageTitle += ' for user ' + formId;
            }

            var retrospective = filterRetrospective(req, project);
            var validDate = moment(retrospective.date).format("MMM Do YYYY");

            res.render('retrospectiveForm', {
                title : pageTitle,
                projectHealth : req['project-health-questions'],
                projectSmells : req['project-smells-questions'],
                project : project,
                retrospective : retrospective,
                retrospectiveDate : validDate,
                errors: pageErrors
            });

    }
};

// POST: /retrospective/create

exports.createRetrospective = function(req, res, next){

	var projectId = req.body.projectId;

    var date  = req.body.date;
    var month = req.body.month;
    var year  = req.body.year;

    var fullDate = date + '-' + month + '-' + year;

    req.assert("facilitator", "Facilitor cannot be Empty").notEmpty();

    var pageErrors = req.validationErrors();

    var projects = Project.find(function(error, projects){

        var project = req.project;

        if (!pageErrors) {

            var retrospective = filterRetrospective(req, project);

            project.retrospectives.push({
                date: fullDate,
                facilitator : req.body.facilitator,
                questions : req.questions
            });

            project.save(function (error, project) {
                if(error){
                    console.log('error adding retrospective to db');
                    return next(error);
                }
            });

            res.render('project', {
                title: project.name,
                project: project,
                retrospective: retrospective,
                date_options: DateHelper.dateOptions,
                month_options: DateHelper.monthOptions,
                year_options: DateHelper.yearOptions
            });

        } else {

            var retrospective = filterRetrospective(req, project);

            return res.render('project', {
                title: project.name,
                project: project,
                retrospective: retrospective,
                date_options: DateHelper.dateOptions,
                month_options: DateHelper.monthOptions,
                year_options: DateHelper.yearOptions,
                errors : pageErrors
            });

        }
    });

};

// GET: /project/:projectId/retrospective/:retrospectiveId/print

exports.viewRetrospectiveShort = function(req, res){

    var projectId = req.params.projectId;
    var retrospectiveIndex;

    Project.findOne({_id: projectId}, function(error, project){

        project.retrospectives.sort(DateHelper.dateSortDesc);

        var retrospective = project.retrospectives.filter(function(retro) {
            return retro._id == req.params.retrospectiveId;
        })[0];

        var participants = retrospective.participants.filter(function(participant) {
            return participant.attended == true;
        });

        console.log(participants);

        res.render('print', {
            title : project.name,
            project : project,
            retrospective : retrospective,
            participants : participants
        });

    });

};

