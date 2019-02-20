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
    successRedirect: '/success',
  })
);

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/error',
    successRedirect: '/success',
  })
);

export default router;
