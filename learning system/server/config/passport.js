const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models").userModel;

module.exports = (passport) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = process.env.TOKENSECRET;
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      try {
        let user = await User.findOne({ _id: jwt_payload._id });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (e) {
        return done(err, false);
      }
    })
  );
};
