var express = require('express');
var router = express.Router();
const user = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/users/addUser', async (req, res, next) => {
  try {
      let user = new user();
      
      usre.userName = req.body.userName;
      user.fullName = req.body.fullName;
      user.emailId = req.body.emailId;
      user.save().then((data) => {
          res.send({
              CODE: 200,
              Data: {
                  message: "User Added successfully..",
                  data: data
              }
          })
      }).catch((err) => {
          res.send({
              CODE: 500,
              Data: {
                  message: "Database error",
                  data: err
              }
          })
      })

  } catch (err) {
      res.send({
          CODE: 400,
          Data: {
              message: "Bad request",
              data: err
          }
      })
  }

});
module.exports = router;
