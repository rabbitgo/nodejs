
/*
 * sign.
 */

var models = require('../models'),
	EventProxy = require('eventproxy').EventProxy,
	User = models.User;

// var config = require('../config').config;

exports.index = function(req,res,next){
	var user_name = req.params.name;
	console.log(user_name);
	get_user_by_name(user_name , function(err , user){
		if(!user){
			res.render('notify/notify',{error:'这个用户不存在'});
			return;
		}else{
			console.log(user);
			res.render('user/index',{user:user});
		}
	});
}



//some method used for get data from database
function get_user_by_id(id , cb){
	User.findOne({_id : id},cb);
}

function get_user_by_name(name , cb){
	User.findOne({name:name},cb);
}

function get_user_by_query(query , opt , cb){
	User.find(query , [] , opt ,cb);
}

exports.get_user_by_name = get_user_by_name;
exports.get_user_by_id = get_user_by_id;
exports.get_user_by_query = get_user_by_query;