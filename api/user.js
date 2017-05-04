var express = require('express');
var mysql = require('mysql');
var CRUD = require('mysql-crud');
var env = require('./environment');
var connection = env.Dbconnection;
var userCRUD = CRUD(connection, 'users');
var md5 = require('md5');



exports.userlogin = function(req, res) {
    console.log(req.body);
    /*userCRUD.load({
        'username': req.body.username,
        'password': req.body.password
    }, function(error, result) {
        if (result.length > 0) {
            var responsedata = {
                status: 1,
                record: result,
                message: 'login success'
            }
        } else {
            console.log("error:", error);
            var responsedata = {
                status: 0,
                message: 'error login'
            }
        }
        res.jsonp(responsedata)
    })*/

};

