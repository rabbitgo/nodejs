
/**
 * global variability
 * 
 */

var path = require('path');

exports.config = {
	//site information
	title : 'RabbitGo',
	description : '这里是搞seo的一些词来着',

	//the number of lists
	list_article_count:'10',

	//db information
	db : 'mongodb://127.0.0.1/blog',
	

	//session
	session_secret:'rabbitgo',
	author_cookie :'rabbit',
	admins : { admin :true }
};