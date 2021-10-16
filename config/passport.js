import passportJWT from "passport-jwt";
import { User } from "../models/user.model";
import { SECRET_KEY } from "./dbconfig";

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

export const configPassport = (passport) => {
  var opts = {};

  opts.secretOrKey = SECRET_KEY;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");

  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.find(
        {
          id: jwt_payload.id,
        },
        function (err, user) {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        }
      );
    })
  );
};
