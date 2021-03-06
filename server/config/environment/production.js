'use strict';

// Production specific configuration
// =================================
module.exports = {
        // Server IP
        ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || undefined,

        // Server port
        port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080,

        // MongoDB connection options
        mongo: {
                uri: process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME || 'mongodb://localhost/gameplatformserver'
        },

        ges: {
                uri: process.env.GES_PORT_8080_TCP_ADDR ? 'http://' + process.env.GES_PORT_8080_TCP_ADDR + ':' + process.env.GES_PORT_8080_TCP_PORT : "http://gameserver-gameolive.rhcloud.com"

        },

        // Seed database on startup
        seedDB: true
};
//# sourceMappingURL=production.js.map
