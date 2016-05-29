/*******************************************************************************
*                                                                              *
*     File: query.js                                                           *
*     Functionality: To cretate and execute query's in mySQL database.         *
*                                                                              *
*******************************************************************************/

// Enable strict mode
'use strict';

// Get custom files.
const mysql = require('./connect.js');
const db_errors = require('../Constants/index.js').DATABASE;
const db_query = require('../Constants/index.js').QUERY;

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
  console.log(db_query.create.user_table);
  mysql.connection.query(db_query.create.user_table, db_query.execute.table_created);
  mysql.connection.query(db_query.create.user_email_table, db_query.execute.table_created);
  mysql.connection.query(db_query.create.user_datetime_table, db_query.execute.table_created);
}());

// Query to show all tables.
query.show_tables = function () {
  mysql.connection.query(db_query.show.tables, function (error, rows, fields) {});
};

module.exports = query;
