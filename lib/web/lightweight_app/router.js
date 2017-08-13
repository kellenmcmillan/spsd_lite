'use strict';
var express = require('express');
var logger = require('logfmt');
var passport = require('passport');
var cache = require('/app/lib/cache-middleware');
var cacheConfig = require('/app/lib/cache.json');

var ERR_MAP = {
	'DataNotFound': 404,
	'VoteNotAllowed': 403,
	'ScrapeFailed': 500
};

module.exports = function lightweightRouter(app) {

	// Lightweight Router
	return new express.Router()

	.use('/', express.static('/app/lib/web/public'))
	.get('/#/', function (request, response, next) {
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
	.get('/api/router/authorization', send_authorization)
	.post('/api/router/signin', signin)
	.put('/api/router/signup', signup)
	.post('/api/router/signout', signout)
	.get('/api/router/signedin', checkSignin)
	.get('/auth/google', googleAuth)
	.get('/auth/google/callback', googleCallback)
	.get('/api/router/appData', getAppData)
	.get('/api/router/users', getAllUsers)
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
		response.send(request.session.user ? response.status(200).send(request.session.user) : response.status(503).send("User Not Signed In"));
	}

	function getAppData(request, response, next) {

		app
		.get_app_data()
		.then(sendData, next);

		function sendData(data) {
			response.send(data);
		}
			
	}

	function send_authorization(request, response, next){
		// app.get_permissions_config();
		logger.log({ info:'User Data Request', message: 'Session User Data is = ' + request.session.user });
		var user_to_scan = request.session.user;
		var user_role = user_to_scan.role.role_id;
		
		response.json(user_role);
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
