var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var env = require('./environment');

exports.login = function (req,res) {
	var username = req.body.username;
	var password = req.body.password;

	console.log(app.get('superSecret'));

	if(username == 'sameer' && password == 'sameer'){
		
		// create a token
        var token = jwt.sign(req.body, env.secret, {
          expiresIn : 60*60*24 // expires in 24 hours
        });

        // return the information including token as JSON
        res.jsonp({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          record : req.body
        });
	}
};
