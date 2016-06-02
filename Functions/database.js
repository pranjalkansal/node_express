/*******************************************************************************
*                                                                              *
*     File: database.js                                                        *
*     Functionality: Config common methods to use as database callbacks.       *
*                                                                              *
*******************************************************************************/

// Enable strict mode
'use strict';

// Get custom data from files.
const db_errors = require('../Constants/database_errors.js');

var database = {};

// Execute logs.
database.execute = {};

database.execute.log = function (error, rows, fields) {
  if(error) {
    console.log(db_errors.connection.error);
    return false;
  }
  console.log('Fetched rows: ', rows);
  console.log('Fetched fields: ', fields);
};

// Execute callbacks related to database change.
database.execute.database_changed = function (error, rows, fields) {
  var database_name = this.sql.split(' ');
  database_name = database_name[database_name.length - 1];
  if(error) {
    console.log(db_errors.database.error.replace('%', database_name));
    return false;
  }
  console.log(db_errors.database.success.replace('%', database_name));
};

// Execute table creating function.
database.execute.table_created = function (error, rows, fields) {
  var table_name = this.sql.split('(')[0].split(' ');
  table_name = table_name[table_name.length - 2];
  if(error) {
    console.log(db_errors.create_table.error.replace('%', table_name));
    return false;
  }
  console.log(db_errors.create_table.success.replace('%', table_name));
};

// Export the object containing these common function.
module.exports = database;
