const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const admins_bl = require('../business_logic/administrators.bl');

router.post('/', function (req, res) {
    let userInput = req.body;
    admins_bl.findUser(userInput, (err, answer) => {
          if(err)res.send(false);
          if(answer === "no user")res.send(false);
          if (answer.role) {
                answer.newToken = jwt.sign({ user: answer }, 'shhhh', { expiresIn: 60 * 60, });
                res.send(answer);
          }else{
                res.send(false);
          }
    });
});

module.exports = router;