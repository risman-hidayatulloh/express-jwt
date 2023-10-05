const express = require('express');
const errorHandler = require('./handler/errorHandler');
const cors = require('cors');
const { User } = require('./models');
const { checkPassword } = require('./helpers/bcrypt');
const { signToken, decodeToken } = require('./helpers/jwt');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3003;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post('/register', async (req, res, next) => {
  try {
    const payload = req.body;
    const createdUser = await User.create(payload);
    res
      .status(201)
      .json({ message: `User with email ${payload.email} is created` });
  } catch (error) {
    next(error);
  }
});

app.post('/login', async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password)
      throw { name: 'EmailPasswordMissing' };

    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) throw { name: 'InvalidCredentials' };
    req.body.id = user.dataValues.id;

    const isPasswordValid = checkPassword(req.body.password, user.password);
    if (!isPasswordValid) throw { name: 'InvalidCredentials' };

    let { dataValues } = user;
    const generatedToken = signToken({
      id: dataValues.id,
      name: dataValues.name,
      email: dataValues.email,
    });

    res.status(200).json({ message: 'Login success', token: generatedToken });
  } catch (err) {
    next(err);
  }
});

app.get('/me', async (req, res, next) => {
  try {
    const userInfo = decodeToken(req.headers.token);
    res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is running on port : ${port}`);
});
