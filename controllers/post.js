
/*
 * post article
 */

var models = require('../models'),
	Article = models.Article;

exports.add = function(req ,res ,next){
	var method = req.method.toLowerCase();

	if(method === 'get'){
		res.render('posts/add');
		return;
	}
	if(method === 'post'){
		var post_title = req.body.post_title;
		var post_cont = req.body.post_cont;

		//init post data
		var post = new Article(),
		date = new Date();

		post.title = post_title;
		post.content = post_cont;
		post.create_date = date;
		//post.pub_author_id
		post.save(function(err){
			if(err){
				return next(err);
			}
			console.log('新增一篇文章成功');
			res.redirect('/');
		});
	}

};

exports.delete = function(req , res , next){
	res.render('删除');
};


