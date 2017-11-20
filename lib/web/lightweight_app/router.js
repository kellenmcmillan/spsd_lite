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
var crypto = require('crypto');
var multer = require('multer');

const storage = multer.diskStorage({
	destination: '/app/lib/web/public/assets/uploads',
	filename: function (request, file, callback) {
		crypto.pseudoRandomBytes(16, function(err, raw) {
			if (err) return callback(err);
			callback(null, raw.toString('hex') + path.extname(file.originalname));
		});
	}
});

var upload = multer({storage: storage});

var ERR_MAP = {
	'DataNotFound': 404,
	'VoteNotAllowed': 403,
	'ScrapeFailed': 500
};

module.exports = function lightweightRouter(app) {

	// Lightweight Router
	return new express.Router()

	.use(express.static('/app/lib/web/public'))
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))
	.get('/api/router/appData', getAppData)
	.get('/api/router/indexSlideshowData', getIndexSlideshowData)
	.get('/api/router/getMissionData', getMissionData)
	.get('/api/router/getFeaturedServicesData', getFeaturedServicesData)
	.get('/api/router/firstParallaxData', getFirstParallaxData)
	.get('/api/router/secondParallaxData', getSecondParallaxData)
	.get('/api/router/imageGalleries', getImageGalleries)
	.get('/api/router/thirdParallaxData', getThirdParallaxData)
	.get('/api/router/contactData', getContactData)
	.get('/api/router/staffData', getStaffData)
	.get('/api/router/servicePageData', getServicePageData)
	.get('/api/router/signedin', checkSignin)
	.get('/auth/google', googleAuth)
	.get('/auth/google/callback', googleCallback)
	.get('/api/router/users', getAllUsers)
	.get('/api/router/authorization', send_authorization)
	.get('*', function (request, response, next) {
		if (!request.session.user.security_clearance.permissions.backend){
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
		} else if (request.session.user.security_clearance.permissions.backend){
			var options = {
				root: '/app/lib/web/private/',
				dotfiles: 'deny',
				headers: {
					'x-timestamp': Date.now(),
					'x-sent': true
				}
			};
			response.sendFile('index.html', options, function (err) {
				if (err) {next(err);}
			});
		}
	})
	.post('/api/router/signin', signin)
	.post('/api/media/upload', upload.array('files', 1), function(request, response) {
		if (!request.files) {
			console.log("No file received");
			return response.send({
				success: false
			});

		} else {
			var host = request.hostname;
			var filePath = request.protocol + "://" + host + '/' + request.files[0].path;
			console.log('file received');
			return response.send(request.files[0].filename)
		}
	})
	.put('/api/router/signup', signup)
	.post('/api/router/signout', signout)
	.all('/#/not-found');
	// .use(routerErrors);
	// Lightweight Router





	//Authorization




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




	//Authorization



	//JSON Files



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
	            return logger.log({ info:'Staff Data Request', message: 'Couldn\'t Locate Staff Page Data' });
	        }

	        logger.log({ info:'Staff Page Data Request', message: 'Staff Page Data is = ' + data });

	        response.send(data);

    	});
			
	}

	function getServicePageData(request, response, next) {

		fs.readFile('lib/web/lightweight_app/page--services.json', 'utf8', function (err, data) {

	        if (err) {
	            return logger.log({ info:'Service Page Data Request', message: 'Couldn\'t Locate Service Page Data' });
	        }

	        logger.log({ info:'Service Page Data Request', message: 'Service Page Data is = ' + data });

	        response.send(data);

    	});
			
	}

	function getIndexSlideshowData(request, response, next) {

		fs.readFile('lib/web/lightweight_app/index--slideshow.json', 'utf8', function (err, data) {

	        if (err) {
	            return logger.log({ info:'Index Slideshow Data Request', message: 'Couldn\'t Locate Slideshow Data' });
	        }

	        logger.log({ info:'Index Slideshow Data Request', message: 'Index Slideshow Data is = ' + data });

	        response.send(data);

    	});
			
	}

	function getMissionData(request, response, next) {

		fs.readFile('lib/web/lightweight_app/index--mission.json', 'utf8', function (err, data) {

	        if (err) {
	            return logger.log({ info:'Mission Data Request', message: 'Couldn\'t Locate Mission Data' });
	        }

	        logger.log({ info:'Mission Data Request', message: 'Mission Data is = ' + data });

	        response.send(data);

    	});
			
	}

	function getFirstParallaxData(request, response, next) {

		fs.readFile('lib/web/lightweight_app/parallax--first.json', 'utf8', function (err, data) {

	        if (err) {
	            return logger.log({ info:'1st Parallax Data Request', message: 'Couldn\'t Locate 1st Parallax Data' });
	        }

	        logger.log({ info:'1st Parallax Data Request', message: '1st Parallax Data is = ' + data });

	        response.send(data);

    	});
			
	}

	function getSecondParallaxData(request, response, next) {

		fs.readFile('lib/web/lightweight_app/parallax--second.json', 'utf8', function (err, data) {

	        if (err) {
	            return logger.log({ info:'2nd Parallax Data Request', message: 'Couldn\'t Locate 2nd Parallax Data' });
	        }

	        logger.log({ info:'2nd Parallax Data Request', message: '2nd Parallax Data is = ' + data });

	        response.send(data);

    	});
			
	}

	function getImageGalleries(request, response, next) {

		fs.readFile('lib/web/lightweight_app/galleries.json', 'utf8', function (err, data) {

	        if (err) {
	            return logger.log({ info:'Gallery Data Request', message: 'Couldn\'t Locate Gallery Data' });
	        }

	        logger.log({ info:'Gallery Data Request', message: 'Gallery Data is = ' + data });

	        response.send(data);

    	});
			
	}

	function getThirdParallaxData(request, response, next) {

		fs.readFile('lib/web/lightweight_app/parallax--third.json', 'utf8', function (err, data) {

	        if (err) {
	            return logger.log({ info:'3rd Parallax Data Request', message: 'Couldn\'t Locate 3rd Parallax Data' });
	        }

	        logger.log({ info:'3rd Parallax Data Request', message: '3rd Parallax Data is = ' + data });

	        response.send(data);

    	});
			
	}

	function getFeaturedServicesData(request, response, next) {

		fs.readFile('lib/web/lightweight_app/index--services.json', 'utf8', function (err, data) {

	        if (err) {
	            return logger.log({ info:'Index Services Data Request', message: 'Couldn\'t Locate Index Services Data' });
	        }

	        logger.log({ info:'Index Servces Data Request', message: 'Index Services Data is = ' + data });

	        response.send(data);

    	});
			
	}

	function getContactData(request, response, next) {

		fs.readFile('lib/web/lightweight_app/index--contact.json', 'utf8', function (err, data) {

	        if (err) {
	            return logger.log({ info:'Index Contact Data Request', message: 'Couldn\'t Locate Index Contact Data' });
	        }

	        logger.log({ info:'Index Contact Data Request', message: 'Index Contact Data is = ' + data });

	        response.send(data);

    	});
			
	}

	//JSON Files


	


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

		var tempPath = req.files.file.path,
        targetPath = path.resolve('./uploads/image.png');
	    if (path.extname(req.files.file.name).toLowerCase() === '.png') {
	        fs.rename(tempPath, targetPath, function(err) {
	            if (err) throw err;
	            console.log("Upload completed!");
	        });
	    } else {
	        fs.unlink(tempPath, function () {
	            if (err) throw err;
	            console.error("Only .png files are allowed!");
	        });
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
