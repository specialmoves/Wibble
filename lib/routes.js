var controllers = require('../controllers'),
    projectHelper = require('./retrospectiveHelper');

module.exports = function(app){
    app.get('/', controllers.project.index);

    app.post('/project/create', 
         controllers.project.createProject);

    app.post('/retrospective/create', [
            projectHelper.ensureProject,
            projectHelper.ensureQuestions(false)
        ],
        controllers.retrospective.createRetrospective);

    app.post('/retrospective/update', 
        projectHelper.ensureProject,
        controllers.retrospective.updateRetrospective);

    app.get('/admin', controllers.admin.index);

    app.post('/admin/questions/add', controllers.admin.addQuestions);

    app.get('/project/:projectId',
        projectHelper.ensureProject,
        controllers.project.viewProject);

    app.get('/project/:projectId/retrospective/:retrospectiveId', [
            projectHelper.ensureProject
        ],        
        controllers.retrospective.viewRetrospective);

    app.get('/project/:projectId/retrospective/:retrospectiveId/form/:formId?',[    
        projectHelper.ensureProject,
        projectHelper.ensureQuestions({ category : 'Project Health', key : 'project-health-questions'}),
        projectHelper.ensureQuestions({ category : 'Project Smells Check', key : 'project-smells-questions'})],
        controllers.retrospective.viewRetrospectiveForm);

    app.post('/project/:projectId/retrospective/:retrospectiveId/form/save', [
            projectHelper.ensureProject,
            projectHelper.ensureQuestions({ category : 'Project Health', key : 'project-health-questions'}),
            projectHelper.ensureQuestions({ category : 'Project Smells Check', key : 'project-smells-questions'})
        ],
        controllers.retrospective.saveRetrospectiveForm);


    app.get('/project/:projectId/retrospective/:retrospectiveId/print', controllers.retrospective.viewRetrospectiveShort);
}
