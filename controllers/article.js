
/*
 * 	article
 */
var models = require('../models'),
	Article = models.Article,
	config = require('../config').config;

exports.index = function(req , res ,next){
	
};

function get_post_by_query(query , opt , cb){
	Article.find(query , opt ,function(err , docs){

	});
}

/*function get_all_posts(){
	Article.find();
}*/

function get_post_by_id(id , cb){
	Article.findOne({_id : id} , cb);
}

exports.get_post_by_id = get_post_by_id;
exports.get_post_by_query = get_post_by_query;
exports.get_all_posts = get_all_posts;


