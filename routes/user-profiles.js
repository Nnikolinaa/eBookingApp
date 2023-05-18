const router = require('express').Router();
const bcrypt = require('bcryptjs');
let UserProfile = require('../models/user-profile.model');

router.route('/').get((req, res) => {
    UserProfile.find().then(userprofiles => res.json(userprofiles)).catch(err=> res.status(400).json('Error: ' + err));
});



router.route('/add').post(async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await UserProfile.findOne({ email: email });
        if (user) {
            res.status(400).json('Error: User with this email address already exists');
        } else {
            const newUser = new UserProfile({ name, email, password });
            await newUser.save();
            res.json('User added!');
        }
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

router.route('/login').post(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const user = await UserProfile.findOne({ email });
      if (!user) {
        res.status(400).json('Error: User with this email address does not exist');
      } else {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          res.json('Login successful!');
        } else {
            console.error(`Error: Password comparison failed - provided password: ${password}, hashed password: ${user.password}`);
          res.status(400).json('Error: Incorrect password');
        }
      }
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  });

module.exports = router;
