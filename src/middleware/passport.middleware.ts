import passport from 'passport'
import JWTStrategy, { StrategyOptions } from 'passport-jwt'
import userService from '../user/services/user.service';

const { Strategy, ExtractJwt } = JWTStrategy

const opts: StrategyOptions = {
  jwtFromRequest: (req) => null
}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(new Strategy(opts, async (jwt_payload, done) => {
  const user = await userService.findUserForAuth(jwt_payload.name)
    if (!user.rowCount) {
      return done({ message: "User doesn't exist" }, false)
    }
    if (user.rowCount) {
      return done(null, user.rows[0])
    }
}));