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

// Initiate mysql connection.
var mysql_connection = mysql.createConnection(db_config.database);

// Export created connection.
module.exports = {connection: mysql_connection};
