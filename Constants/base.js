/*******************************************************************************
*                                                                              *
*     File: base.js                                                            *
*     Functionality: To config all the basic constants needed in node app.     *
*                                                                              *
*******************************************************************************/

// Enable strict mode
'use strict';

// Configure the Constants.
const CONFIG = {
  // Config port to use to listen incoming requests
  port: 8000,
  // Configure database details.
  database: {host: 'localhost', user: 'node', password: 'qwerty', port: '8889'},
  // Configure database to use.
  database_to_use: 'node_chat_dev',
  // jsonwebtoken configurations.
  jsonwebtoken: {secret: 'node_mysql_database_express ' + new Date(), options: {algorithm: 'HS256'}}
};
// Constants configuration end.

// Export configurations.
module.exports = CONFIG;
