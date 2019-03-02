import passport from 'passport';
import { OAuth2Strategy } from 'passport-google-oauth';

import config from './config';

export default function initPassporGoogle() {
  passport.use(new OAuth2Strategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
  },
    function (accessToken, refreshToken, profile, cb) {
      const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        token: accessToken,
      };
      
      console.log(`User: ${JSON.stringify(user)}`);
      console.log('We should put user in db or do something with credentials, or token');
      
      return cb(null, user);
    }
  ));
}
