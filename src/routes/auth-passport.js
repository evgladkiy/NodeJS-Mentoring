import express from 'express';
import passport from 'passport';

const router = express.Router();

router.post(
  '/local',
  passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/error',
  })
);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email', 'openid'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.redirect('/success');
  }
);

export default router;
