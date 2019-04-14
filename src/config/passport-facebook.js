import passport from 'passport';
import FacebookStrategy from 'passport-facebook';

import config from './config';

export default function initPassportFacebook() {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: ['id', 'displayName',  'email'],
    enableProof: true,
  },
    function(accessToken, refreshToken, profile, cb) {
      const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        token: accessToken,
      };
      console.log(`User: ${JSON.stringify(user)}`);
      console.log('We should put user in db or do something with credentials, or token');

      cb(null, user);
    }
  ));
}
