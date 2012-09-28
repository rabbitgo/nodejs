
/**
 * model
 */

var mongoose = require('mongoose');
//var models = require('../models');
var config = require('../config').config;

mongoose.connect( config.db , function(err){
	if(err){
		console.error('connect errors' , config.db , err.message);
		process.exit(1);
	}
	else{
		console.log('mongodb connect success');
	}
});

//models
require('./user');
require('./article');

exports.User = mongoose.model('User');
exports.Article = mongoose.model('Article');