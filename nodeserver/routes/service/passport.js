const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy  = require('passport-http-bearer').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;
const jwtSecret = require('../../config').jwtSecret;

const model = require('../user/model').model;

passport.use('password', new LocalStrategy({usernameField:'email',passwordField:'password'},
    (email, password, done) => {
        if(!email || !password)
            return done(err);        // You can use more sophisticated checks here
        model.findOne({ email })
            .then((user) => {
                if (!user) {
                    return done(null,false,'Wrong email');
                }
                return user.authenticate(password, user.password)
                    .then((loggedUser) => {
                        return done(null, loggedUser);
                    }).catch(done)
            })
    })
);

passport.use('master', new BearerStrategy((token, done) => {
    console.log(token);
    if (token === masterKey) {
        return done(null, {});
    } else {
        return done(null, false);
    }
}));

passport.use('token', new JwtStrategy({
    secretOrKey: jwtSecret,
    jwtFromRequest:
        ExtractJwt.fromExtractors([
            ExtractJwt.fromUrlQueryParameter('token'),
            ExtractJwt.fromBodyField('token'),
            ExtractJwt.fromAuthHeaderWithScheme('Bearer')
        ])
}, ({ id }, done) => {
    model.findById(id).then((user) => {
        return done(null, user);
    }).catch(done)
}));


module.exports.password = (req, res, next) => {
        passport.authenticate('password', {session: false}, (err, user, info, email) => {
            if (err && err.param) {
                return res.status(400).json(err)
            } else if (err || !user) {
                return res.status(401).end()
            }
            req.logIn(user, {session: false}, (err) => {
                    if (err)
                        return res.status(401).end();
                    next();
                })
        })(req, res, next)
    };

module.exports.master = passport.authenticate('master', { session: false });

module.exports.token = ({ required, roles = model.roles } = {}) => (req, res, next) =>
    passport.authenticate('token', { session: false }, (err, user, info) => {
        let rankBool=false;
        if (user) {
            let roleRank = model.roles.indexOf(user.role);
            let roleRankArr = [];
            for (let role of roles) {
                roleRankArr.push(model.roles.indexOf(role));
            }
            let lowestRoleRank = Math.min.apply(Math, roleRankArr);
            if (roleRank<lowestRoleRank)
                rankBool=true;
        }
        if (err || (required && !user) || (required && rankBool)) {
            return res.status(401).end()
        }
        req.logIn(user, { session: false }, (err) => {
            if (err)
                return res.status(401).end();
            next()
        })
    })(req, res, next);




