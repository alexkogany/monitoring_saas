/* eslint-disable no-console */
const User = require('../models/User');

//const DailyActivityRecord = require('../models/DailyActivity');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');
const log = require('../log/loggly');
const sequelize = require('../../config/database');


const UserController = () => {
  const register = async (req, res) => {
    const { body } = req;

    if (body.password === body.password2) {
      try {
        const user = await User.create({
          email: body.email,
          password: body.password,
        });
        const token = authService().issue({ id: user.id });

        return res.status(200).json({ token, user });
      } catch (err) {
        console.log(err);
        return res.status(500).json(
          { msg: 'Internal server error' },
        );
      }
    }

    return res.status(400).json({ msg: 'Bad Request: Passwords don\'t match' });
  };

  const login = async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      try {
        const user = await User
          .findOne({
            where: {
              email,
            },
          });

        if (!user) {
          return res.status(400).json({ msg: 'Bad Request: User not found' });
        }

        if (bcryptService().comparePassword(password, user.password)) {
          const token = authService().issue({ id: user.id });

          return res.status(200).json({ token, user });
        }

        return res.status(401).json({ msg: 'Unauthorized' });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: Email or password is wrong' });
  };

  const validate = (req, res) => {
    const { token } = req.body;

    authService().verify(token, (err) => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: 'Invalid Token!' });
      }

      return res.status(200).json({ isvalid: true });
    });
  };

  const getAll = async (req, res) => {
    try {
      const users = await User.findAll();

      return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const addUserRecord = async (req, res) => {
    try {
      log.send2server(req.body);
      // const { sUserName, cUserName } = req.body;

      // console.log(sUserName);
      // console.log(cUserName);

     // UserRecord.create(req.body);


      return res.status(200).json({});
    } catch (err) {
      console.log(err);
      log.send2server(`{"error":"${err.message}"}`);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

 




  return {
    register,
    login,
    validate,
    getAll,
    addUserRecord,
    //addDailyActivityRecord,
  };
};

module.exports = UserController;
