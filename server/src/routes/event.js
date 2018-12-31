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
        website,
        otherCity
      } = req.body;
      let finalCity = city;
      if (city && city === 'other') {
        finalCity = otherCity;
      }
      const event = await EventModel.create({
        userEmail: req.user.email,
        title,
        state,
        city: finalCity,
        zip,
        address,
        description,
        category,
        activity,
        phone,
        email,
        website
      });
      const eventCount = await EventModel.countDocuments({
        userEmail: req.user.email
      });
      return res.status(200).send({ event, eventCount });
    } catch (error) {
      return next(error);
    }
  }
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const eventCount = await EventModel.countDocuments({
        userEmail: req.user.email
      });
      return res.status(200).send({ eventCount });
    } catch (error) {
      return next(error);
    }
  }
);

export default router;
