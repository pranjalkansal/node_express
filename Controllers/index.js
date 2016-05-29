/*******************************************************************************
*                                                                              *
*       File: index.js                                                         *
*       Functionality: To combine all configuration file and export one object *
*                                                                              *
*******************************************************************************/

// Enable strict mode.
'use strict';

// Import all configuratin files.
const customer = require('./customer.js');

// Export configuration files.
module.exports = {customer};
