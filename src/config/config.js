export default {
  jwt: {
    secret: 'myawesomesecret',
    tokenHeaders: 'x-access-token',
  },
  google: {
    clientID: '1008510833806-1nu9iu45kqufs6h36s5psf4cohptkni1.apps.googleusercontent.com',
    clientSecret: 'TS-XTPQUsv2NqSYO9DBj2rch',
    callbackURL: 'http://localhost:8080/auth/passport/google/callback',
  },
  facebook: {
    clientID: '2062663634031250',
    clientSecret: '3aad78d0faaf02a1fd65a77af6059a46',
    callbackURL: 'http://localhost:8080/auth/passport/facebook/callback',
  },
  twitter: {
    consumerKey: 'consumerKey',
    consumerSecret: 'consumerSecret',
    callbackURL: 'http://localhost:8080/auth/passport/twitter/callback',
  },
};
