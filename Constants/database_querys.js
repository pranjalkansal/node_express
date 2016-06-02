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
query.create.user_table = query.create.if_not_exits + 'users (user_name VARCHAR(30) PRIMARY KEY, first_name VARCHAR(40), last_name VARCHAR(40))';
query.create.user_email_table = query.create.if_not_exits + 'users_email (user_name VARCHAR(30), user_email VARCHAR(60) PRIMARY KEY, password VARCHAR(20), token TEXT, FOREIGN KEY (user_name) REFERENCES USERS(user_name) ON DELETE CASCADE)';
query.create.user_datetime_table = query.create.if_not_exits + 'users_datetime_details (user_name VARCHAR(30), creation_date DATE, last_login DATE, FOREIGN KEY (user_name) REFERENCES USERS(user_name) ON DELETE CASCADE)';

// Get Query's.
query.show = {};
query.show.databases = 'SHOW DATABASES';
query.show.tables = 'SHOW TABLES';

// Select Query's.
query.select = {};
query.select.select_all = 'SELECT * FROM ';
query.select.username = 'SELECT user_name FROM users WHERE user_name = ?';
query.select.email = 'SELECT user_email FROM users_email WHERE user_email = ?';

// Post Query's.
query.user = {};
query.user.register_user = 'INSERT INTO users (user_name, first_name, last_name) VALUES (?, ?, ?)';
query.user.register_user_email = 'INSERT INTO users_email (user_name, user_email, password, token) VALUES (?, ?, ?, ?)';
query.user.register_user_datetime = 'INSERT INTO users_datetime_details (user_name, creation_date, last_login) VALUES (?, ?, ?)';

// Export configurations.
module.exports = query;
