const dotenv = require('dotenv-safe').config();

const requireProcessEnv = (name) => {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable')
    }
    return process.env[name]
};

const config = {
    all: {
        //env: process.env.NODE_ENV || 'development',
        //root: path.join(__dirname, '.'),
        //port: process.env.PORT || 9000,
        //ip: process.env.IP || '0.0.0.0',
        //apiRoot: process.env.API_ROOT || '/api',
        jwtSecret: requireProcessEnv('JWT_SECRET'),
/*        mongo: {
            options: {
                db: {
                    safe: true
                }
            }
        }
*/
    }
/*    ,test: {
        mongo: {
            uri: 'mongodb://localhost/internet-eng-test',
            options: {
                debug: false
            }
        }
    },
    development: {
        mongo: {
            uri: 'mongodb://localhost/internet-eng-dev',
            options: {
                debug: true
            }
        }
    },
    production: {
        mongo: {
            uri: 'mongodb://localhost/internet-eng-prod',
            options: {
                debug: false
            }
        }
    }
    */
};

//module.exports = Object.assign(config.all, config[config.all.env]);
module.exports = config.all;