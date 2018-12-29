/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
/* eslint-disable max-len */
import Passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';

import UserModel from '../model/user';

export default class Authentication {
  constructor() {
    console.log('Authentication Initialization.');
    this.passport = Passport;
  }

  async _signUpStrategy(request, email, password, done) {
    try {
      const { firstName, lastName } = request.body;
      // Save the information provided by the user to the the database
      const user = await UserModel.create({
        email,
        password,
        firstName,
        lastName
      });
      // Send the user information to the next middleware
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }

  async _loginStrategy(email, password, done) {
    try {
      // Find the user associated with the email provided by the user
      const user = await UserModel.findOne({
        email
      });
      if (!user) {
        // If the user isn't found in the database, return a message
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Validate password and make sure it matches with the corresponding hash stored in the database
      // If the passwords match, it returns a value of true.
      const validate = await user.isValidPassword(password);
      if (!validate) {
        return done(null, false, {
          message: 'Wrong Password'
        });
      }
      // Send the user information to the next middleware
      return done(null, user, {
        message: 'Logged in Successfully'
      });
    } catch (error) {
      return done(error);
    }
  }

  async _jwtStrategy(token, done) {
    try {
      // Pass the user details to the next middleware
      const { user } = token;
      if (user.expiry > Date.now()) {
        return done('jwt expired');
      }
      return done(null, token.user);
    } catch (error) {
      return done(error);
    }
  }

  initialize() {
    // Create a passport middleware to handle user registration
    this.passport.use(
      'signup',
      new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true,
          session: false
        },
        this._signUpStrategy.bind(this)
      )
    );

    // Create a passport middleware to handle User login
    this.passport.use(
      'login',
      new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        this._loginStrategy.bind(this)
      )
    );

    // This verifies that the token sent by the user is valid
    this.passport.use(
      new JWTstrategy(
        {
          // secret we used to sign our JWT
          secretOrKey: 'top_secret', // we expect the user to send the token as bearer toekn
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        this._jwtStrategy.bind(this)
      )
    );
  }
}
