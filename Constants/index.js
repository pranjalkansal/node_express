/*******************************************************************************
*                                                                              *
*       File: index.js                                                         *
*       Functionality: To combine all configuration file and export one object *
*                                                                              *
*******************************************************************************/

// Enable strict mode.
'use strict';

// Import all configuratin files.
const BASIC = require('./base.js');
const DATABASE = require('./database_errors.js');
const MESSAGE = require('./errors.js');
const QUERY = require('./database_querys.js');

// Export configuration files.
module.exports = {BASIC, DATABASE, MESSAGE, QUERY};
