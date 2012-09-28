
/*
 * sign.
 */

var models = require('../models'),
	Article = models.Article;

exports.index = function(req , res ,next){
	var article = new Article();

		article.title = '这是一篇文章标题';
		article.content = '这里开始是内容部分';
	
	article.save();	
}