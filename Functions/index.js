/*******************************************************************************
*                                                                              *
*       File: index.js                                                         *
*       Functionality: To combine all configuration file and export one object *
*                                                                              *
*******************************************************************************/

// Enable strict mode.
'use strict';

// Import all configuratin files.
const DATABASE_CALLBACK = require('./database.js');

// Export configuration files.
module.exports = {DATABASE_CALLBACK};
