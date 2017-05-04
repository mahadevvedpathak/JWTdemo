//for database connection
var mysql = require('mysql');
var http = require('http');
var nodemailer = require('nodemailer');


var enviroment = {
	Dbconnection : mysql.createPool({
			database : 'demowebsite',
		    user : 'root',
			password : '',
		    host :'localhost',
	
	}),

	/** Function For Time stamp**/
	timestamp: function() {
      var UTCtimestamp = new Date();
      return UTCtimestamp.getTime();
    },
    
    'secret': 'ilovescotchyscotch'
      

}
enviroment.siteUrl = 'https://www.sample.com';

module.exports = enviroment;
 

