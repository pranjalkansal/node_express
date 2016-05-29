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

// Configure Database messages.
const QUERY = {
  // Use database.
  use_database: 'USE ' + CONFIG.database_to_use,
  // Get Query's.
  show_databases: 'SHOW DATABASES',
  show_tables: 'SHOW TABLES',
  select_all: 'SELECT * FROM '
};
// Database query configuration end.

/**************** Common functions to execute with query. *********************/

// Execute logs.
QUERY.execute_log = function (error, rows, fields) {
  if(error) {
    console.log(db_errors.connection.error);
    return false;
  }
  console.log('Fetched rows: ', rows);
  console.log('Fetched fields: ', fields);
};

//********************** End of common functions. *****************************/

// Export configurations.
module.exports = QUERY;
