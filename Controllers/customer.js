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
      return reply.send(error?error:response);
  });
};

module.exports = customer;
