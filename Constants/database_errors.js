/*******************************************************************************
*                                                                              *
*     File: database_errors.js                                                 *
*     Functionality: To config all the database errors that may occur node app.*
*                                                                              *
*******************************************************************************/

// Enable strict mode
'use strict';

// Configure Database messages.
const DATABASE = {
  // Config connection messages.
  connection: {error: 'Error: Connection to database fails!!', success: 'Success: Connection to database established!!'},
  // Configure database query messages.
  query: {error: 'Error: Database query % failed to execute!!', success: 'Success: Database query % successfully executed!!'},
  // User create.
  user: {error: 'Error: User registration failed!!', success: 'Success: User successfully registered!!'}
};
// Database messages configuration end.

// Export configurations.
module.exports = DATABASE;
