import passport from 'passport';
import TwitterStrategy from 'passport-twitter';

import config from './config';

export default function initPassporTwitter() {
  passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL,
  },
    function(accessToken, tokenSecret, profile, cb) {
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
