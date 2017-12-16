'use strict';
var express = require('express');
var enforce = require('express-sslify');
var logger = require('logfmt');
var passport = require('passport');
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
var crypto = require('crypto');
var multer = require('multer');
var cors = require('cors');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-684984.oktapreview.com/oauth2/default',
  assertClaims: {
    aud: 'api://default',
  },
});

// const storage = multer.diskStorage({
// 	destination: '/app/lib/web/public/assets/uploads',
// 	filename: function (request, file, callback) {
// 		crypto.pseudoRandomBytes(16, function(err, raw) {
// 			if (err) return callback(err);
// 			callback(null, raw.toString('hex') + path.extname(file.originalname));
// 		});
// 	}
// });
// var upload = multer({storage: storage});

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
function authenticationRequired(req, res, next) {
  	const authHeader = req.headers.authorization || '';
  	const match = authHeader.match(/Bearer (.+)/);

  	if (!match) {
    	return res.status(401).end();
  	}

  	const accessToken = match[1];

  	return oktaJwtVerifier.verifyAccessToken(accessToken)
    .then((jwt) => {
      	req.jwt = jwt;
      	next();
    })
    .catch((err) => {
      	res.status(401).send(err.message);
    });
}

module.exports = function lightweightRouter(app) {

	// Lightweight Router
	return new express.Router()

	.use(cors())
	.use(enforce.HTTPS({ trustProtoHeader: true }))
	.use(express.static('/app/lib/web/public'))
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))

	// Angular App Data
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
	// Angular App Data

	

	// Serve Angular App
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
	// Serve Angular App

	//////////////////////////////////////API Endopoints//////////////////////////////////////
	.param('vault', function(request, response, next, id) {
		MediaVault.findById(id, function(err, vault) {
			if (err) {
				logger.log({ info:'Error - Vault Param', message: 'Error Pulling Vault ID From Param ' + err });
				next(err);
			} else if (vault) {
				request.vault = vault;
				request.id = vault._id;
				logger.log({ info:'Vault Param', message: 'Pulled Vault ID From Param ' + request.id});
				next();
			} else {
				logger.log({ info:'Error - Vault Param', message: 'Error Loading Vault'});
				next(new Error('failed to load vault'));
			}
		});
	})
	.param('task', function(request, response, next, id) {
		TaskRunner.findById(id, function(err, task) {
			if (err) {
				logger.log({ info:'Error - Task Param', message: 'Error Pulling Task ID From Param ' + err });
				next(err);
			} else if (task) {
				request.task = task;
				request.id = task._id;
				logger.log({ info:'Task Param', message: 'Pulled Task ID From Param ' + request.id});
				next();
			} else {
				logger.log({ info:'Error - Task Param', message: 'Error Loading Task'});
				next(new Error('failed to load task'));
			}
		});
	})
	.param('user', function(request, response, next, id) {
		UserVault.findById(id, function(err, user) {
			if (err) {
				logger.log({ info:'Error - User Param', message: 'Error Pulling User ID From Param ' + err });
				next(err);
			} else if (user) {
				request.user = user;
				request.id = user._id;
				logger.log({ info:'User Param', message: 'Pulled User ID From Param ' + request.id});
				next();
			} else {
				logger.log({ info:'Error - User Param', message: 'Error Loading User'});
				next(new Error('failed to load user'));
			}
		});
	})
	.param('product', function(request, response, next, id) {
		StoreFront.findById(id, function(err, product) {
			if (err) {
				logger.log({ info:'Error - Product Param', message: 'Error Pulling Product ID From Param ' + err });
				next(err);
			} else if (product) {
				request.product = product;
				request.id = product._id;
				logger.log({ info:'Product Param', message: 'Pulled Product ID From Param ' + request.id});
				next();
			} else {
				logger.log({ info:'Error - Product Param', message: 'Error Loading Product'});
				next(new Error('failed to load product'));
			}
		});
	})
	.get('/applab/get', function(request, response){
		logger.log({ info:'Protected Route', message: 'App Lab Get Endpoint' });
		response.status(201);
	})
	.put('/applab/update', function(request, response){
		logger.log({ info:'Protected Route', message: 'App Lab Update Endpoint' });
		response.status(201);
	})
	.get('/mediavault/get', function(request, response){
		logger.log({ info:'Protected Route', message: 'Media Vault Get Endpoint' });
		response.status(201);
	})
	.put('/mediavault/put', function(request, response){
		logger.log({ info:'Protected Route', message: 'Media Vault Create Vault Endpoint' });
		response.status(201);
	})
	.get('/mediavault/:vault', function(request, response){
		logger.log({ info:'Protected Route', message: 'Media Vault Get Vault By ID Endpoint' });
		response.status(201);
	})
	.put('/mediavault/:vault/update', function(request, response){
		logger.log({ info:'Protected Route', message: 'Media Vault Update Vault By ID Endpoint' });
		response.status(201);
	})
	.delete('/mediavault/:vault/delete', function(request, response){
		logger.log({ info:'Protected Route', message: 'Media Vault Delete Vault By ID Endpoint' });
		response.status(201);
	})
	.get('/taskrunner/get', function(request, response){
		logger.log({ info:'Protected Route', message: 'Task Runner Get Endpoint' });
		response.status(201);
	})
	.put('/taskrunner/put', function(request, response){
		logger.log({ info:'Protected Route', message: 'Task Runner Create Task Endpoint' });
		response.status(201);
	})
	.get('/taskrunner/:task', function(request, response){
		logger.log({ info:'Protected Route', message: 'Task Runner Get Task By ID Endpoint' });
		response.status(201);
	})
	.put('/taskrunner/:task/update', function(request, response){
		logger.log({ info:'Protected Route', message: 'Task Runner Update Task By ID Endpoint' });
		response.status(201);
	})
	.delete('/taskrunner/:task/delete', function(request, response){
		logger.log({ info:'Protected Route', message: 'Task Runner Delete Task By ID Endpoint' });
		response.status(201);
	})
	.get('/uservault/get', function(request, response){
		logger.log({ info:'Protected Route', message: 'User Vault Get Endpoint' });
		response.status(201);
	})
	.put('/uservault/put', function(request, response){
		logger.log({ info:'Protected Route', message: 'User Vault Create User Endpoint' });
		response.status(201);
	})
	.get('/uservault/:vault', function(request, response){
		logger.log({ info:'Protected Route', message: 'User Vault Get User By ID Endpoint' });
		response.status(201);
	})
	.put('/uservault/:vault/update', function(request, response){
		logger.log({ info:'Protected Route', message: 'User Vault Update User By ID Endpoint' });
		response.status(201);
	})
	.delete('/uservault/:vault/delete', function(request, response){
		logger.log({ info:'Protected Route', message: 'User Vault Delete User By ID Endpoint' });
		response.status(201);
	})
	.get('/storefront/get', function(request, response){
		logger.log({ info:'Protected Route', message: 'Store Front Get Endpoint' });
		response.status(201);
	})
	.put('/storefront/put', function(request, response){
		logger.log({ info:'Protected Route', message: 'Store Front Create Product Endpoint' });
		response.status(201);
	})
	.get('/storefront/:product', function(request, response){
		logger.log({ info:'Protected Route', message: 'Store Front Get Product By ID Endpoint' });
		response.status(201);
	})
	.put('/storefront/:product/update', function(request, response){
		logger.log({ info:'Protected Route', message: 'Store Front Update Product By ID Endpoint' });
		response.status(201);
	})
	.delete('/storefront/:product/delete', function(request, response){
		logger.log({ info:'Protected Route', message: 'Store Front Delete Product By ID Endpoint' });
		response.status(201);
	})
	.get('/myvault/get', authenticationRequired, function(request, response){
		logger.log({ info:'Protected Route', message: 'User Personal Account Get Endpoint' });
		response.status(201).send("User Personal Account Endpoint");
	})
	.put('/myvault/put', function(request, response){
		logger.log({ info:'Protected Route', message: 'User Personal Account Update Endpoint' });
		response.status(201);
	})
	.delete('/myvault/delete', function(request, response){
		logger.log({ info:'Protected Route', message: 'User Personal Account Delete Endpoint' });
		response.status(201);
	});

	//////////////////////////////////////API Endopoints//////////////////////////////////////

	// .post('/api/router/signin', signin)
	// .put('/api/router/signup', signup)
	// .post('/api/router/signout', signout)
	// .get('/api/router/users', getAllUsers)
	// .post('/api/media/upload', upload.array('files', 1), function(request, response) {
	// 	if (!request.files) {
	// 		logger.log({ info:'Upload Info', message: 'No File Received' });
	// 		return response.send({
	// 			success: false
	// 		});

	// 	} else {
	// 		var host = request.hostname;
	// 		var filePath = request.protocol + "://" + host + '/' + request.files[0].path;
	// 		logger.log({ info:'Upload Info', message: 'Files Received' });
	// 		return response.send(request.files[0].filename)
	// 	}
	// })
	
	// Lightweight Router

	// function signup(request, response, next) {
	// 	app
	// 	.user_signup(request)
	// 	.then(sendData, next);
	// 	function sendData(data) {
	// 		response.status(200).send("success!");
	// 	}
	// }

	// function signin(request, response, next) {
	// 	logger.log({ info:'Route Info', message: 'Signin Route Reached' });
	// 	passport.authenticate('local', function (err, user, info) {
	// 		if (err) { logger.log({ info:'Auth Info', message: 'Error Authenticating' }); return next(err); }
	// 		if (!user) {
	// 			logger.log({ info:'Auth Info', message: 'User Not Found' });
	// 			return response.status(401).send({ message: info.message });
	// 		}
	// 		request.login(user, function(err) {
	// 			logger.log({ info:'Auth Info', message: 'Login Function Activated' });
	// 			request.session.user = user.toJSON();
	// 			if (err) { logger.log({ info:'Auth Info', message: 'Signin Failed Because Of An Error' }); return next(err); }
	// 			return response.status(200).send(request.session.user);
	// 		});
	// 	})(request, response, next);
	// }


	// function signout(request, response) {
	// 	request.logout();
	// 	request.session.user = null;
	// 	response.status(200).end();
	// }

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

	// function getAllUsers(request, response, next){

	// 	app.find_users({}, 'personal_info role _id', userCallback);

	// 	function userCallback(err, users) {
	// 		if (err) {
	// 			return response.status(500).json({message: err.message});
	// 		} else if (!request.user){
	// 			return response.status(503).redirect('/#/unauthorized');
	// 		}
	// 		response.json(users);
	// 	}
	// }
	

	// function query_database(taskName, conditions) {
	// 	app
	// 		.add_to_query_database_queue(taskName, conditions)
	// 		.then(execute_query, next);

	// 	function execute_query(taskName, conditions) {
	// 		res.json({ link: '/articles/' + id + '.json' });
	// 	}
	// }

	// function upload_media(request, response, next){

	// 	var tempPath = req.files.file.path,
 //        targetPath = path.resolve('./uploads/image.png');
	//     if (path.extname(req.files.file.name).toLowerCase() === '.png') {
	//         fs.rename(tempPath, targetPath, function(err) {
	//             if (err) throw err;
	//             console.log("Upload completed!");
	//         });
	//     } else {
	//         fs.unlink(tempPath, function () {
	//             if (err) throw err;
	//             console.error("Only .png files are allowed!");
	//         });
	//     }

 //    }

};
