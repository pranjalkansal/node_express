/*******************************************************************************
*                                                                              *
*     File: database_errors.js                                                 *
*     Functionality: To config all the database querys that may occur node app.*
*                                                                              *
*******************************************************************************/

// Enable strict mode
'use strict';

// Get configuratin files.
const CONFIG = require('./base.js');
const db_errors = require('./database_errors.js');

// Create empty object to store database query's.
var query = {};

// Use database.
query.use_database = 'USE ' + CONFIG.database_to_use;

// Create tables (Basic Structure).
query.create = {};
query.create.if_not_exits = 'CREATE TABLE IF NOT EXISTS ';
query.create.user_table = query.create.if_not_exits + 'USERS (user_name VARCHAR(30) PRIMARY KEY, first_name VARCHAR(40), last_name VARCHAR(40))';
query.create.user_email_table = query.create.if_not_exits + 'USERS_EMAIL (user_name VARCHAR(30), user_email VARCHAR(60) PRIMARY KEY, FOREIGN KEY (user_name) REFERENCES USERS(user_name) ON DELETE CASCADE)';
query.create.user_datetime_table = query.create.if_not_exits + 'USER_DATETIME_DETAILS (user_name VARCHAR(30), creation_date DATE, last_login DATE, FOREIGN KEY (user_name) REFERENCES USERS(user_name) ON DELETE CASCADE)';

// Get Query's.
query.show = {};
query.show.databases = 'SHOW DATABASES';
query.show.tables = 'SHOW TABLES';
query.select_all = 'SELECT * FROM ';

/**************** Common functions to execute with query. *********************/

query.execute = {};
// Execute logs.
query.execute.log = function (error, rows, fields) {
  if(error) {
    console.log(db_errors.connection.error);
    return false;
  }
  console.log('Fetched rows: ', rows);
  console.log('Fetched fields: ', fields);
};

// Execute table creating function.
query.execute.table_created = function (error, rows, fields) {
  if(error) {
    console.log(db_errors.query.error.replace('%', this.sql));
    return false;
  }
  console.log(db_errors.query.success.replace('%', this.sql));
};
//********************** End of common functions. *****************************/

// Export configurations.
module.exports = query;
