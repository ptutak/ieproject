const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const BearerStrategy  = require('passport-http-bearer').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;
const jwtSecret = require('../../config').jwtSecret;

const model = require('../user/model').model;

module.exports.password = () => (req, res, next) => {
    return passport.authenticate('password', {session: false}, (err, user, info, email) => {
        if (err && err.param) {
            return res.status(400).json(err)
        } else if (err || !user) {
            return res.status(401).end()
        }
        req.logIn(user, {session: false}, (err) => {
            if (err) return res.status(401).end();
            next()
        })
    })(req, res, next)
};

module.exports.master = () =>
    passport.authenticate('master', { session: false });

module.exports.token = ({ required, roles = model.roles } = {}) => (req, res, next) =>
    passport.authenticate('token', { session: false }, (err, user, info) => {
        if (err || (required && !user) || (required && !~roles.indexOf(user.role))) {
            return res.status(401).end()
        }
        req.logIn(user, { session: false }, (err) => {
            if (err) return res.status(401).end();
            next()
        })
    })(req, res, next);

passport.use('password', new BasicStrategy({passReqToCallback: true}, (req, email, password, done) => {
    if(!email || !password) done(err);        // You can use more sophisticated checks here

    model.findOne({ email }).then((user) => {
        if (!user) {
            done(true);
            return null;
        }
        return user.authenticate(password, user.password).then((loggedUser) => {
            done(null, loggedUser);
            return null;
        }).catch(done)
    })
}));

passport.use('master', new BearerStrategy((token, done) => {
    console.log(token);
    if (token === masterKey) {
        done(null, {});
    } else {
        done(null, false);
    }
}));

passport.use('token', new JwtStrategy({
    secretOrKey: jwtSecret,
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromUrlQueryParameter('access_token'),
        ExtractJwt.fromBodyField('access_token'),
        ExtractJwt.fromAuthHeaderWithScheme('Bearer')
    ])
}, ({ id }, done) => {
    model.findById(id).then((user) => {
        done(null, user);
        return null
    }).catch(done)
}));
