
/*
 * 	sign
 	signin		//loggin
 	signup		//register a new user
 */
var models = require('../models'),
	User = models.User,
	crypto = require('crypto'),
	config = require('../config').config;


exports.signup = function(req , res ,next){
	
	var method = req.method.toLowerCase();
	if(method === 'get'){
		res.render('sign/signup');
		return;
	}
	if(method === 'post'){
		var name = req.body.name,
			loginname = name.toLowerCase(),//Todo , need to know why loginname exist
			email = req.body.email.toLowerCase(),
			password = req.body.password;

		//Todo , this validation can be done by client js
		if( name == '' || password == '' || email == ''){
			res.render('sign/signup',{error:'信息不完整', name :name , email: email});
			return;
		}
		if(name.length < 5){
			res.render('sign/signup' , {error:'用户名至少需要5个字符',name:name , email:email});
			return;
		}

		// search user ind db to check whether it is already exist
		User.find({'$or':[
			{'loginname':loginname },
			{'email' : email},
			function(err,users){
				if(err){
					return next(err);
				}
				if(users.length > 0){
					res.render('sign/signup',{error:'用户名或邮箱已被占用',name:name, email : email});
					return;
				}
			}
			]});

		//md5 password
		password = md5(password);

		//init data
		var user = new User();
		user.name = name;
		user.loginname = loginname;
		user.password = password;
		user.email = email;
		user.save(function(err){
			if(err){
				return next(err);
			}
			console.log('已成功添加新用户');
			res.render('sign/signup',{success:'欢迎加入'});
			return;
		});

	}
};

exports.showLogin = function(req , res){
	req.session._loginReferer = req.headers.referer;
	res.render('sign/signin');
};


//define some page when login just jump to the home page
var notJump = [
'/active_account',
'/reset_pass',
'/signup',
'/signin'
];

exports.login = function(req , res , next){
	var loginname = req.body.name.toLowerCase(),
		password = req.body.password;

		if(!loginname || !password){
			return res.render('sign/signin',{error : '信息不完整'});
		}

		User.findOne({'loginname' : loginname} , function(err , user){
			if(err){
				return next(err);
			}
			if(!user){
				return res.render('sign/signin',{error : '这个用户不存在啊'});
			}

			password = md5(password);

			if(password !==  user.password ){
				return res.render('sign/signin' , {error :'密码不一致'});
			}
			//Todo , wait for mail
			/*if(!user.active){
				res.render('sign/signin',{error:'此帐号还没有激活'});
				return;
			}*/

			//store session cookie
			gen_session(user , res);

			var refer = req.session._loginReferer || 'home';
			for(var i = 0 , len = notJump.length ; i != len ; ++i){
				if(refer.indexOf(notJump[i]) >= 0){
					refer = 'home';
					break;
				}
			}
			res.redirect(refer);
		});
};

exports.signout = function(req,res,next){
	req.session.destroy();
	res.clearCookie(config.author_cookie , { path : '/'});
	res.redirect(req.headers.referer || 'home');
};


//custom middleware
exports.auth_user = function(req , res , next){
	if(req.session.user){
		if(config.admins[req.session.user.name]){
			req.session.user.is_admin = true;
		}

		//res.locals({'current_user' : req.session.user});
		res.locals.current_user = req.session.user;
		return next();

	}
	else{
		var cookie = req.cookies[config.author_cookie];
		if(!cookie){
			return next();
		}
		var auth_token = decrypt(cookie , config.session_secret);
		var author = auth_token.split('\t');
		var user_id = author[0];
		console.log('user_id:'+user_id);

		User.findOne({_id : user_id} , function(err, user){
			if(err){
				return next(err);
			}
			if(user){
				if(config.admins[user.name]){
					user.is_admin = true;
				}
				req.session.user =user;
				//res.locals({'current_user':req.session.user});
          		res.locals.current_user = req.session.user;
          		return next();
			}
			else{
				return next();
			}
		});
	}
};


/*
 * private functions
 */
function gen_session(user , res){
	var author = encrypt(user._id + '\t' +user.name + '\t' +user.password + '\t' + user.email , config.session_secret);
	res.cookie( config.author_cookie , author , {path: '/' , maxAge :1000*60*60*24*30}); //cookie a month
}

//encrypt info
function encrypt(str , secret){
	var cipher = crypto.createCipher('aes192' , secret );
	var	enc =  cipher.update(str , 'utf8' , 'hex');
	enc += cipher.final('hex');
	return enc;
}

//decrypt info
function decrypt(str , secret){
	var decipher = crypto.createDecipher('aes192' , secret);
	var	dec = decipher.update(str , 'hex','utf8');
	dec += decipher.final('utf8');
	return dec;
}

//md5 func
function md5(str){
	var md5 = crypto.createHash('md5');
	md5.update(str);
	str = md5.digest('hex');
	return str;
}
