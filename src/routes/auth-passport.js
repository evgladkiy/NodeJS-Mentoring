import express from 'express';
import passport from 'passport';

const router = express.Router();

// local

router.post(
  '/local',
  passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/error',
  })
);

// google

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

// facebook

router.get('/facebook', passport.authenticate('facebook'));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/error',
    successRedirect: '/success',
  })
);

// twitter
// Messages from skype mentoring group

// Dzianis:
// Hey all. Does anyone succeed with creating a Twitter app?
// I describe my use case as it is, but receive rejections on my requests.
// ...
// Vitali K.:
// Twitter is known with such behavior. If you are facing with such rejections or
// request-related issues for Twitter - feel free to skip confirmation factor.

router.get('/twitter', passport.authenticate('twitter'));

router.get(
  '/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/login',
    successRedirect: '/success',
  })
);

export default router;
