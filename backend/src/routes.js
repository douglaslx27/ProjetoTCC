const { Router } = require('express');
const UsersControler = require('./controlers/usersControler');
const QuestionsControler = require('./controlers/questionsControler');
const AnswersControler = require('./controlers/answersControler');

const routes = Router();


routes.post('/users', UsersControler.store);
routes.get('/users', UsersControler.get);
routes.put('/users', UsersControler.update);
routes.delete('/users', UsersControler.delete);

routes.get('/questions', QuestionsControler.index);
routes.post('/questions', QuestionsControler.store);

routes.post('/answers', AnswersControler.store);
routes.get('/answers', AnswersControler.get);

module.exports = routes;