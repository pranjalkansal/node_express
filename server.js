/*******************************************************************************
*                                                                              *
*         File: server.js                                                      *
*         Functionality: Entery point of node application.                     *
*                                                                              *
*******************************************************************************/

// Enable strict mode.
'use strict';

/****************** Get all dependencies in index file ************************/

// Get vendors.
const server = require('express')();
const body_parser = require('body-parser')
// End vendors.

// Get custom files.
const Config = require('./Constants/index.js').BASIC;
const Controller = require('./Controllers/index.js');
const Mysql = require('./Database/query.js');
// End custom files import.

/********************* End of dependencies import *****************************/

/********************* Middleware to parse json data **************************/
server.use(body_parser.json());
server.use(body_parser.urlencoded({extended: true}));

/************************ End of Middlewares **********************************/

/************************ Server routes for user ******************************/

server.get('/', function (request, reply) {
  console.log(request);
  return reply.send('hello world!!')
});

// Post application programing interface (api's).
server.post('/customer/register', Controller.customer.register);
server.listen(Config.port);
return;
server.post('/customer/login', Controller.customer.login);

// Put application programing interface (api's).
server.put('/customer/update_profile', Controller.customer.update_profile);

// Get application programing interface (api's).

// Delete application programing interface (api's).
server.delete('customer/remove_user', Controller.customer.remove_user);

/**************************** Users routes end ********************************/
