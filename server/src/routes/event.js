/* eslint-disable comma-dangle */
import express from 'express';
import passport from 'passport';
import EventModel from '../model/event';

const router = express.Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const {
        title,
        state,
        city,
        zip,
        address,
        description,
        category,
        activity,
        phone,
        email,
        website
      } = req.body;
      const event = await EventModel.create({
        userEmail: req.user.email,
        title,
        state,
        city,
        zip,
        address,
        description,
        category,
        activity,
        phone,
        email,
        website
      });
      return res.status(200).send({ event });
    } catch (error) {
      return next(error);
    }
  }
);

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) =>
  res.status(200).send({ value: 2 })
);

export default router;
