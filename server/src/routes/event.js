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
        otherCity,
        _id
      } = req.body;
      console.log(_id);
      let finalCity = city;
      if (city && city === 'other') {
        finalCity = otherCity;
      }
      const event = await EventModel.create({
        userEmail: req.user.email,
        title,
        state,
        city: finalCity,
        otherCity,
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
  '/count',
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

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, nextError) => {
    try {
      const { next, previous } = req.query;
      let limit = 10;
      if (req.query.limit) {
        limit = parseInt(req.query.limit, 10);
      }
      const totalCount = await EventModel.countDocuments({});
      const allEvents = await EventModel.paginate({ limit, next, previous });
      allEvents.totalCount = totalCount;
      return res.status(200).send({ allEvents });
    } catch (error) {
      return nextError(error);
    }
  }
);

export default router;
