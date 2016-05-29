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

// Create connection to mySQL database.
mysql.connection.connect();

//Check if some error occured to connection, reconect then.
mysql.connection.on('error', function (error) {
  console.log(error);
  mysql.connection.connect();
});

// Connect to mysql databse and use database provided in BASIC configuration by default.
mysql.connection.query(db_query.use_database, db_query.execute.log);

// IIFE to create basic table structure (IF NOT EXISTS).
(function initialize_tables() {
  mysql.connection.query(db_query.create.user_table, db_query.execute.table_created);
  mysql.connection.query(db_query.create.user_email_table, db_query.execute.table_created);
  mysql.connection.query(db_query.create.user_datetime_table, db_query.execute.table_created);
}());

// Query to register new user.
query.register_user = function (user) {
  mysql.connection.query(db_query.user.register_user, [user.user_name, user.first_name, user.last_name], function (error, rows, fields) {
    if(error) {
      console.log(db_errors.query.error.replace('%', db_query.user.register_user));
      return db_errors.user.error;
    }
    console.log(db_errors.query.success.replace('%', db_query.user.register_user));

    // Register other details after creating parent row.
    async.parallel([
      function user_emial_register(callback) {
        mysql.connection.query(db_query.user.register_user_email, [user.user_name, user.email, user.password], function (error, rows, fields) {
          if(error) return callback(error);
          callback(null, rows);
        })
      },
      function user_datetime_registration(callback) {
        mysql.connection.query(db_query.user.register_user_datetime, [user.user_name, new Date().toJSON(), new Date().toJSON()], function (error, rows, fields) {
          if(error) return callback(error);
          callback(null, rows);
        })
      }
    ], function (error, result) {
      if (error) {
        console.log(db_errors.query.error.replace('%', 'Query'));
        return db_errors.user.error;
      }
      JWT.sign({user: user.first_name, date: new Date()}, jwt_token.secret, jwt_token.options, function (error, token) {
        if(error)
          console.log(message.token.error);
        else {
          console.log(message.token.success);
          console.log(db_errors.user.success);
          return {message: db_errors.user.success, access_token: token};
        }
      });
    });
  });
};

module.exports = query;
