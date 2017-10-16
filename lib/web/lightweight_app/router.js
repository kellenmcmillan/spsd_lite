'use strict';
var express = require('express');
var logger = require('logfmt');
var passport = require('passport');
var cache = require('/app/lib/cache-middleware');
var cacheConfig = require('/app/lib/cache.json');
var fs = require('fs');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var path = require('path');



var ERR_MAP = {
	'DataNotFound': 404,
	'VoteNotAllowed': 403,
	'ScrapeFailed': 500
};

module.exports = function lightweightRouter(app) {

	// Lightweight Router
	return new express.Router()

	.use(express.static('/app/lib/web/public'))
	.use(bodyParser.urlencoded({ extended: false }))
	.get('/api/router/appData', getAppData)
	.get('/api/router/staffData', getStaffData)
	.get('/api/router/indexSlideshowData', getIndexSlideshowData)
	.get('/api/router/signedin', checkSignin)
	.get('/auth/google', googleAuth)
	.get('/auth/google/callback', googleCallback)
	// .get('/api/router/appData', getAppData)
	.get('/api/router/users', getAllUsers)
	.get('/api/router/authorization', send_authorization)
	.get('*', function (request, response, next) {
		var options = {
			root: '/app/lib/web/public/',
			dotfiles: 'deny',
			headers: {
				'x-timestamp': Date.now(),
				'x-sent': true
			}
		};
		response.sendFile('index.html', options, function (err) {
			if (err) {next(err);}
		});
	})
	.post('/api/router/signin', signin)
	.post('/api/upload/media', upload_media)
	.put('/api/router/signup', signup)
	.post('/api/router/signout', signout)
	.all('/#/not-found');
	// .use(routerErrors);
	// Lightweight Router

	function googleAuth() {
		return passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/userinfo.profile' })
	}

	function googleCallback() {
		return passport.authenticate('google', {
			successRedirect : '/',
			failureRedirect: '/'
		});
	}

	function sendApp(request, response){
		response.sendFile('/app/lib/web/public/index.html');
	}

	function signup(request, response, next) {
		app
		.user_signup(request)
		.then(sendData, next);
		function sendData(data) {
			response.status(200).send("success!");
		}
	}

	function signin(request, response, next) {
		logger.log({ info:'Route Info', message: 'Signin Route Reached' });
		passport.authenticate('local', function (err, user, info) {
			if (err) { logger.log({ info:'Auth Info', message: 'Error Authenticating' }); return next(err); }
			if (!user) {
				logger.log({ info:'Auth Info', message: 'User Not Found' });
				return response.status(401).send({ message: info.message });
			}
			request.login(user, function(err) {
				logger.log({ info:'Auth Info', message: 'Login Function Activated' });
				request.session.user = user.toJSON();
				if (err) { logger.log({ info:'Auth Info', message: 'Signin Failed Because Of An Error' }); return next(err); }
				return response.status(200).send(request.session.user);
			});
		})(request, response, next);
	}


	function signout(request, response) {
		request.logout();
		request.session.user = null;
		response.status(200).end();
	}

	function checkSignin(request, response) {
		request.session.user ? response.status(200).send(request.session.user) : response.status(503).send("User Not Signed In");
	}

	function getAppData(request, response, next) {

		fs.readFile('lib/web/lightweight_app/index--slideshow.json', 'utf8', function (err, data) {

	        if (err) {
	            return logger.log({ info:'Slideshow Data Request', message: 'Couldn\'t Locate Slideshow Data' });
	        }

	        logger.log({ info:'Slideshow Data Request', message: 'Slideshow Data is = ' + data });

	        response.send(data);

    	});
			
	}

	function getStaffData(request, response, next) {

		fs.readFile('lib/web/lightweight_app/staff.json', 'utf8', function (err, data) {

	        if (err) {
	            return logger.log({ info:'Staff Data Request', message: 'Couldn\'t Locate Staff Data' });
	        }

	        logger.log({ info:'Staff Data Request', message: 'Staff Data is = ' + data });

	        response.send(data);

    	});
			
	}

	function getIndexSlideshowData(request, response, next) {

		fs.readFile('lib/web/lightweight_app/index--slideshow.json', 'utf8', function (err, data) {

	        if (err) {
	            return logger.log({ info:'Staff Data Request', message: 'Couldn\'t Locate Staff Data' });
	        }

	        logger.log({ info:'Index Slideshow Data Request', message: 'Index Slideshow Data is = ' + data });

	        response.send(data);

    	});
			
	}

	function send_authorization(request, response, next){
		// app
		// .get_permissions_config()
		// .then(sendData, next);
		
		var user_to_scan = request.session.user;
		var user_role = user_to_scan.role.role_id;
		logger.log({ info:'User Data Request', message: 'Session User Role is = ' + user_role });
		response.json(user_to_scan);

		// function sendData(data) {
		// 	response.json(data);
		// }
	}


	function getAllUsers(request, response, next){

		app.find_users({}, 'personal_info role _id', userCallback);

		function userCallback(err, users) {
			if (err) {
				return response.status(500).json({message: err.message});
			} else if (!request.user){
				return response.status(503).redirect('/#/unauthorized');
			}
			response.json(users);
		}
	}
	

	function query_database(taskName, conditions) {
		app
			.add_to_query_database_queue(taskName, conditions)
			.then(execute_query, next);

		function execute_query(taskName, conditions) {
			res.json({ link: '/articles/' + id + '.json' });
		}
	}

	function upload_media(request, response, next){

		// create an incoming form object
	  	var form = new formidable.IncomingForm();

		// specify that we want to allow the user to upload multiple files in a single request
		form.multiples = true;
		logger.log({ info:'Image Upload Fuction', message: 'Starting'});
		// store all uploads in the /uploads directory

		// every time a file has been uploaded successfully,
		// rename it to it's orignal name
		form.on('file', function(field, file) {
			logger.log({ info:'Image Upload Fuction', message: 'File Uploaded'});
			fs.rename(file.path, path.join('/app/lib/web/lightweight_app/assets/uploads', file.name));
			logger.log({ info:'Image Upload Fuction', message: 'File Upload Is Working'});
		});

		// log any errors that occur
		form.on('error', function(err) {
			logger.log({ info:'Image Upload Fuction', message: 'Fail!: ' + err});
		});

		// once all the files have been uploaded, send a response to the client
		form.on('end', function(file) {
			logger.log({ info:'Image Upload Fuction', message: 'Success!'});
			response.send('Successful image Upload!');
		});

		// parse the incoming request containing the form data
		form.parse(request);

    }




	function showForm(req, res, next) {
		res.render(path.join(__dirname, 'list'));
	}

	function listArticles(req, res, next) {
		app
			.listArticles(req.user.id, 15, req.param('fresh'))
			.then(sendList, next);

		function sendList(list) {
			res.json(list);
		}
	}

	

	function showArticle(req, res, next) {
		app
			.getArticle(req.params.articleId)
			.then(sendArticle, next);

		function sendArticle(article) {
			return res.json(article);
		}
	}

	function upvoteArticle(req, res, next) {
		app
			.addUpvote(req.user.id, req.params.articleId)
			.then(sendLink, next);

		function sendLink(id) {
			return res.json({ link: '/articles/' + id + '.json' });
		}
	}

	function routerErrors(err, req, res, next) {
		var status = ERR_MAP[err.name];
		if (status) err.status = status;
		next(err);
	}
};
