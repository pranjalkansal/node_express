/*******************************************************************************
*                                                                              *
*     File: query.js                                                           *
*     Functionality: To cretate and execute query's in mySQL database.         *
*                                                                              *
*******************************************************************************/

// Enable strict mode
'use strict';

// Get vendors.
const JWT = require('jsonwebtoken');
const async = require('async');

// Get custom files.
const mysql = require('./connect.js');
const jwt_token = require('../Constants/index.js').BASIC.jsonwebtoken;
const db_errors = require('../Constants/index.js').DATABASE;
const db_query = require('../Constants/index.js').QUERY;
const message = require('../Constants/index.js').MESSAGE;

// Create empty object to put different query's.
var query = {};

// Query to register new user.
query.register_user = function (user, callback) {
  async.auto({
    create_user: function create_new_user(callback) {
      mysql.connection.query(db_query.user.register_user, [user.user_name, user.first_name, user.last_name], function (error, rows) {
        if(error) return callback(db_errors.user.error);
        console.log(db_errors.query.success.replace('%', db_query.user.register_user));
        callback(null, true);
      });
    },
    create_token: ['create_user', function create_new_token(result, callback) {
      JWT.sign({user: user.first_name, date: new Date()}, jwt_token.secret, jwt_token.options, function (error, token) {
        if(error) return callback(message.token.error);
        console.log(message.token.success);
        callback(null, token);
      });
    }],
    register_user_email: ['create_user', 'create_token', function (result, callback) {
      mysql.connection.query(db_query.user.register_user_email, [user.user_name, user.email, user.password, result.create_token], function (error, rows) {
        if(error) return callback(db_errors.user.error);
        console.log(db_errors.query.success.replace('%', db_query.user.register_user_email));
        callback(null, true);
      });
    }],
    register_user_datetime: ['create_user', function (result, callback) {
      mysql.connection.query(db_query.user.register_user_datetime, [user.user_name, new Date().toJSON(), new Date().toJSON()], function (error, rows) {
        if(error) return callback(db_errors.user.error);
        console.log(db_errors.query.success.replace('%', db_query.user.register_user_datetime));
        callback(null, true);
      });
    }]
  }, function (error, result) {
    if(error) {
      console.log(error);
      return callback({error});
    }
    console.log(db_errors.user.success);
    return callback(null, {message: db_errors.user.success, token: result.create_token});
  });
};

// Export all user's query's.
module.exports = query;
