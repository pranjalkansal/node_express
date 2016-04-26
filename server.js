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
// End vendors.

// Get custom files.
const Config = require('./Constants/index.js').BASIC;
const Controller = require('./Controller/index.js');
// End custom files import.

/********************* End of dependencies import *****************************/

/************************ Server routes for user ******************************/

// Post application programing interface (api's).
server.post('/customer/register', Controller.customer.register);
server.post('/customer/login', Controller.customer.login);

// Put application programing interface (api's).
server.put('/customer/update_profile', Controller.customer.update_profile);

// Get application programing interface (api's).

// Delete application programing interface (api's).
server.delete('customer/remove_user', Controller.customer.remove_user);

/**************************** Users routes end ********************************/
