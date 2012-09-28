
/**
 * route.js
 * Module dependencies.
 */

var user = require('./controllers/user'); 
var site = require('./controllers/site');
var sign = require('./controllers/sign');
var post = require('./controllers/post');
var init = require('./controllers/init');

module.exports = function(app){
	//home page
	app.get('/', site.index);
	app.get('/home' , site.index);

	app.get('/user' , user.index);
	
	// sign up , sign in , Loggout
	app.get('/signup' , sign.signup);
	app.post('/signup' , sign.signup);

	app.get('/signin' , sign.showLogin);
	app.post('/signin' , sign.login);

	app.get('/signout', sign.signout);

	//app.get('/active_accout', sign.active_account);

	//app.get('/init',init.index);

	//app.get('/article' , article.);
	app.get('/add' , post.add);
	app.post('/add', post.add);

};
