var Project = require('../models/project'),
    Question = require('../models/question');

exports.ensureProject = function(req, res, next) {

    var projectId = req.body.projectId == null ? projectId = req.params.projectId : req.body.projectId;

    Project.findOne({_id: projectId }, function(error, project){

        if (error) {
            return next(error);
        }

        if (!project) {
            return res.send('404 - Project Not Found', 404);
        }

        req.project = project;

        next();
    });
}

exports.ensureQuestions = function(options){

    var query = {};

    if(options && options.category){
        query.category = options.category;
    }

    return function(req, res, next){
        Question.find(query, function(error, questions){


            if(error){
                return next(error);
            }

            if(!questions){
                return res.send('404 - Questions Not Found', 404);
            }

            if(options && options.key){
                req[options.key] = questions
            }
            else{
                req.questions = questions;
            }

            next();
        });
    }
}


exports.getRetrospectiveById = function(retrospectiveId, project) {

    var retrospective = project.retrospectives.filter(function(retro){
        return retro._id == retrospectiveId;
    })[0];

    return retrospective;

}
