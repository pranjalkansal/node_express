/*******************************************************************************
*                                                                              *
*     File: errors.js                                                          *
*     Functionality: To config all the messages that may be needed in node app.*
*                                                                              *
*******************************************************************************/

// Enable strict mode
'use strict';

// Configure Messages to display (error or success).
const MESSAGE = {
  // Config connection messages.
  token: {error: 'Error: Token creation fails!!', success: 'Success: Token created successfully!!'},
  // Configure database query messages.
  query: {error: 'Error: Database query % failed to execute!!', success: 'Success: Database query % successfully executed!!'}
};
// Messages configuration end.

// Export configurations.
module.exports = MESSAGE;
