import fs from 'fs';
import passport from 'passport';
import LocalStrategy from 'passport-local';

const usersPath = `${__dirname}/../../assets/users.json`;
const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

export default function initPassportLocal () {
  passport.serializeUser((user, done) => done(null, user.email));

  passport.deserializeUser(({ login }, done) => done(null, users.find(user => user.email === login)));

  passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
  },
    function (login, password, done) {
      const storedUser = users.find(user => user.email === login);

      if (storedUser && storedUser.password === password) {
        return done(null, {
          email: storedUser.email,
          username: storedUser.name
        });
      } else {
        return done(null, false, { message: 'Incorrect login or password.' });
      }
    }))
}