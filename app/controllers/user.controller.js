const db = require("../../models");
const User = db.users;
const UserLoginLoger = db.user_login_logger;
const Op = db.Sequelize.Op;

const config = require("../../config/auth.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const iplocate = require('node-iplocate');

const ERROR_MESSAGE = 'Something went wrong.'

const { body, validationResult } = require('express-validator/check')

//import {windows, android, linux, macos, ios} from 'platform-detect/os.mjs'

var platform = require('platform-detect')


exports.validate = (method) => {
  switch (method) {
    case 'registerUserValidation': {
     	return [ 
			body('username', "username required").exists().trim().escape(),
			body('password', "Password required").exists(),
			body('password', "Password required minimum 6 characters.").exists().isLength({ min: 6 })
			.custom((value,{req, loc, path}) => {
				if (value !== req.body.confirm_password) {
					throw new Error("Passwords don't match");
				} else {
					return value;
				}
			}),
        ]
	}
	case 'loginUserValidation': {
		return [
			body('username', 'Invalid username').exists().trim().escape(),
			body('password', "Password required").exists(),
        ]
	}
  }
}

// User Register
exports.register = (req, res) => {
  	try{
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		let userObj = {
			username: req.body.username,
			password: bcrypt.hashSync(req.body.password, 8)
		}
		User.create(userObj)
		.then(user => {
			return res.status(201).send({ message: "User was registered successfully!" });
		})
		.catch(err => {
			console.log(err);
			return res.status(500).send({ message: err.message || ERROR_MESSAGE });
		});
	}catch(err){
		return res.status(500).send({ message: err.message || ERROR_MESSAGE });
	}

}

//User Login
exports.login = (req, res) => {
	try{
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		User.findOne({where: {username: req.body.username, status:1}})
		.then(user => {
				if (!user) {
					return res.status(404).send({ message: "User Not found." });
				}
				var passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
				if (!passwordIsValid) {
					return res.status(401).send({accessToken: null,message: "Invalid Password!"});
				}
				var token = jwt.sign({ id: user.id, username: user.username, role : user.role }, config.secret, {
					expiresIn: config.jwatExpiresIn // 24 hours
				});

				//Save user login loger

				let login_device = 'Uknown'
				if(platform.windows || platform.linux || platform.macos){
					login_device = 'PC'
				}else if(platform.android){
					login_device = 'android'
				}else if(platform.ios){
					login_device = 'ios'
				}

				let ip = '';
				if (req.headers['x-forwarded-for']) {
					ip = req.headers['x-forwarded-for'].split(",")[0];
				} else if (req.connection && req.connection.remoteAddress) {
					ip = req.connection.remoteAddress;
				} else {
					ip = req.ip;
				}

				let country = '';
				let userId = user.id;
				let date = new Date(); 
				date = date.toISOString().slice(0, 10);
				let saveLogger = {
					user_id :userId,
					login_date: date,
					login_device: login_device,
					ip_address: ip,
					country : country,
				}

				saveLoginLoger(saveLogger);


				return res.status(201).send({
					message: "User was login successfully!",
					data:{
						id: user.id,
						username: user.username,
						email: user.email,
						role : user.role,
						accessToken: token,
					}
				});		
		})
		.catch(err => {
			return res.status(500).send({ message: err.message || ERROR_MESSAGE });
		});
	}catch(err){
		return res.status(500).send({ message: err.message || ERROR_MESSAGE });
	}
}

async function saveLoginLoger(saveLogger){

	//https://iplocate.docs.apiary.io/
	await iplocate(saveLogger.ip_address).then((results) => {

		try{
			saveLogger.country = results.country
		}catch(err){}

		UserLoginLoger.create(saveLogger)
		.then(obj => {
			console.log("save login logger success")
		})
		.catch(err => {
			console.log("save login loger err")
			console.log(err);
		});
	});
} 

exports.me = (req, res) => {
	try{
		User.findOne({where: {id: req.user.id}})
		.then(user => {
			if (!user) {
				return res.status(404).send({ message: "User Not found." });
			}else{
				return res.status(201).send({
					message: "User found successfully!",
					data:{
						id: user.id,
						username: user.username,
						role : user.role,
					}
				});	
			}
		}).catch(err => {
			return res.status(500).send({ message: err.message || ERROR_MESSAGE });
		});

	}catch(err){
		return res.status(500).send({ message: err.message || ERROR_MESSAGE });
	}
}