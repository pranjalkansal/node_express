/*******************************************************************************
*                                                                              *
*     File: database_errors.js                                                 *
*     Functionality: To config all the database errors that may occur node app.*
*                                                                              *
*******************************************************************************/

// Enable strict mode
'use strict';

// Configure Database messages.
var DATABASE = {
  // Config connection messages.
  connection: {error: 'Error: Connection to database fails!!', success: 'Success: Connection to database established!!'},
  // Configure database query messages.
  query: {error: 'Error: Database query % failed to execute!!', success: 'Success: Database query % successfully executed!!'},
  // Database errors.
  database: {error: 'Error: Failed to switch database: "%"', success: 'Success: Switched to database: "%"'},
  // Table creation.
  create_table: {error: 'Error: Failed to create table: "%"', success: 'Success: Table created successfully: "%"'},
  // User create.
  user: {}
};
// Database messages configuration end.

// Database errors while performing users operations.

// When new user is created.
DATABASE.user.create = {error: 'Error: User registration failed!!', success: 'Success: User successfully registered!!'};

// While creating new user multiple database queries are performed.
DATABASE.user.user_name = {error: 'Error: Failed to fetch usernames!!', success: 'Success: Usernames fetched successfully!!', found: 'Status: Same username already exists!!'};
DATABASE.user.user_email = {error: 'Error: Failed to fetch registered emails!!', success: 'Success: Registered emails fetched successfully!!', found: 'Status: Same email already exists!!'};
DATABASE.user.name_entry = {error: 'Error: User name entery failed!!', success: 'Success: User name entry successfully created!!'};
DATABASE.user.email_entry = {error: 'Error: User email registration failed!!', success: 'Success: User email successfully registered!!'};
DATABASE.user.datetime_entry = {error: 'Error: User datetime registration failed!!', success: 'Success: User datetime successfully registered!!'};

// Database errors while performing users operations end.

// Export configurations.
module.exports = DATABASE;
