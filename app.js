
/**
 * Module dependencies.
 */
var express = require('express'),
    http = require('http'),
    routes = require('./routes'),
    path = require('path'),
    config = require('./config').config;

var app = express();

app.configure(function(){
  app.set('port' , process.env.PORT || 8080);     //端口
  app.set('views' , __dirname + '/views');        //模板路径
  app.set('view engine' , 'html');
  app.engine('.html', require('ejs').renderFile);

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());//analysis post
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));

  //session
  app.use(express.cookieParser());
  app.use(express.session({
    secret : config.session_secret
    // store : sessionStore({reapInterval :60000 * 10})
  }));

  // custom middleware
  app.use(require('./controllers/sign').auth_user);
  
  //local variablity
  app.locals({
    config : config
  });

  //app.use(app.router);
  
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

routes(app);

http.createServer(app).listen(app.get('port'),function(){
  console.log('server run in 8080');
});

