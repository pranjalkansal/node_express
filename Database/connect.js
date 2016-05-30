/*******************************************************************************
*                                                                              *
*     File: connect.js                                                         *
*     Functionality: To connect to mySQL database in node app.                 *
*                                                                              *
*******************************************************************************/

// Enable strict mode
'use strict';

// Initialize required modules.
const mysql = require('mysql');

// Get custom files.
const db_config = require('../Constants/index.js').BASIC;
const db_query = require('../Constants/index.js').QUERY;

// Initiate mysql connection.
var mysql_connection = mysql.createConnection(db_config.database);

// Create connection to mySQL database.
mysql_connection.connect();

//Check if some error occured to connection, reconect then.
mysql_connection.on('error', function (error) {
  console.log(error);
  mysql_connection.connect();
});

// Connect to mysql databse and use database provided in BASIC configuration by default.
mysql_connection.query(db_query.use_database, db_query.execute.log);

// IIFE to create basic table structure (IF NOT EXISTS).
(function initialize_tables() {
  mysql_connection.query(db_query.create.user_table, db_query.execute.table_created);
  mysql_connection.query(db_query.create.user_email_table, db_query.execute.table_created);
  mysql_connection.query(db_query.create.user_datetime_table, db_query.execute.table_created);
}());

// Export created connection.
module.exports = {connection: mysql_connection};
