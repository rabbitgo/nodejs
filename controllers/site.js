
/*
 * site.
 */

var config = require('../config').config,
	models = require('../models'),
	Article = models.Article;

exports.index = function(req , res ,next){
	var limit = config.list_article_count;
	Article.find({}, function(err, article){
		if(err){
			return next(err);
		}
		res.render('index',{article : article});
	});
};
