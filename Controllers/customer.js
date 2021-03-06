/*******************************************************************************
*                                                                              *
*     File: customer.js                                                        *
*     Functionality: Execute customer logic functions in node app.             *
*                                                                              *
*******************************************************************************/

// Enable strict mode
'use strict';

// Get custom files.
const query = require('../Database/query.js');

var customer = {};

// Customer registration and login functions.
customer.register = function (request, reply) {
  query.register_user(request.body, function (error, response) {
    reply.status(error?400:200);
    return reply.send(error?error:response);
  });
};

customer.login = function (request, reply) {
  query.login_user(request.body, function (error, response) {
    reply.status(error?400:200);
    return reply.send(error?error:response);
  });
}

// Return customer functions.
module.exports = customer;
