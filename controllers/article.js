
/*
 * 	article
 */
var models = require('../models'),
	Article = models.Article,
	config = require('../config').config;

exports.index = function(req , res ,next){
	
};

function get_post_by_query(query , opt , cb){
	Article.find(query , {} , opt , cb);
}

function get_posts_by_page(query, opt , cb){
	var skipData = (page-1)*limit;
	Article.find().skip(skipData).limit(limit).sort({'_id':-1});
}

function get_post_by_id(id , cb){
	Article.findOne({_id : id} , cb);
}

exports.get_post_by_id = get_post_by_id;
exports.get_post_by_query = get_post_by_query;
exports.get_all_posts = get_all_posts;


