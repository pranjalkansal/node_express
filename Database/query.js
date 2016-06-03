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
const db_callback = require('../Functions/index.js').DATABASE_CALLBACK;

// Create empty object to put different query's.
var query = {};

// Query to register new user.
query.register_user = function (user, callback) {
  async.auto({
    check_username: function check_username_exists(callback) {
      mysql.connection.query(db_query.select.username, [user.user_name], function (error, rows, fields) {
        if(error) return callback(db_errors.user.user_name.error);
        else if(rows.length) return callback(db_errors.user.user_name.found);
        else callback(null, true);
      });
    },
    check_email: function check_email_exists(callback) {
      mysql.connection.query(db_query.select.email, [user.email], function (error, rows, fields) {
        if(error) return callback(db_errors.user.user_email.error);
        else if(rows.length) return callback(db_errors.user.user_email.found);
        else callback(null, true);
      });
    },
    create_user: ['check_username', 'check_email', function create_new_user(result, callback) {
      mysql.connection.query(db_query.user.register_user, [user.user_name, user.first_name, user.last_name], function (error, rows) {
        if(error) return callback(db_errors.user.name_entry.error);
        console.log(db_errors.user.name_entry.success);
        callback(null, true);
      });
    }],
    create_token: ['create_user', function create_new_token(result, callback) {
      JWT.sign({user: user.user_name, date: new Date()}, jwt_token.secret, jwt_token.options, function (error, token) {
        if(error) return callback(message.token.error);
        console.log(message.token.success);
        callback(null, token);
      });
    }],
    register_user_email: ['create_user', 'create_token', function (result, callback) {
      mysql.connection.query(db_query.user.register_user_email, [user.user_name, user.email, user.password, result.create_token], function (error, rows) {
        if(error) return callback(db_errors.user.email_entry.error);
        console.log(db_errors.user.email_entry.success);
        callback(null, true);
      });
    }],
    register_user_datetime: ['create_user', function (result, callback) {
      mysql.connection.query(db_query.user.register_user_datetime, [user.user_name, new Date().toJSON(), new Date().toJSON()], function (error, rows) {
        if(error) return callback(db_errors.user.datetime_entry.error);
        console.log(db_errors.user.datetime_entry.success);
        callback(null, true);
      });
    }]
  }, function (error, result) {
    if(error) {
      console.log(error);
      return callback({error: db_errors.user.create.error});
    }
    console.log(db_errors.user.create.success);
    return callback(null, {message: db_errors.user.create.success, token: result.create_token});
  });
};

query.login_user = function (user, callback) {
  async.auto({
    check_user: function check_user_exists(callback) {
      mysql.connection.query(db_query.select.username_or_email, [user.username, user.username], function (error, rows, fields) {
        if(error) return callback(db_errors.user.login.error);
        else if(!rows.length) return callback(db_errors.user.login.not_exist);
        else {
          rows[0].password == user.password?callback(null, true):callback(db_errors.user.login.error);
        }
      });
    },
    create_token: function create_new_token(callback) {
      JWT.sign({user: user.username, date: new Date()}, jwt_token.secret, jwt_token.options, function (error, token) {
        if(error) return callback(message.token.error);
        console.log(message.token.success);
        callback(null, token);
      });
    },
    update_token: ['check_user', 'create_token', function get_token_and_update_table(result, callback) {
      mysql.connection.query(db_query.update.token, [result.create_token, user.username, user.username], function (error, rows, fields) {
        if(error) return callback(db_errors.user.token_update.error);
        console.log(db_errors.user.token_update.success);
        callback(null, true);
      });
    }]
  }, function (error, result) {
    if(error) {
      console.log(error);
      return callback({error: db_errors.user.login.error});
    }
    console.log(db_errors.user.login.success);
    return callback(null, {message: db_errors.user.login.success, token: result.create_token});
  });
};

// Export all user's query's.
module.exports = query;
