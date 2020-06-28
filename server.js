const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors');

const adminsRouter = require('./routes/adminsRouter');
const coursesRouter = require('./routes/coursesRouter');
const studentsRouter = require('./routes/studentsRouter');
const filesRouter = require('./routes/filesRouter');
const schoolRouter = require('./routes/schoolRouter');
const loginRouter = require('./routes/loginRouter');

const PORT = process.env.PORT||3000;

app.use(cors());

app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "jhbschool-193e4.firebaseapp.com"); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.use((req, res, next) => {
      if (req.path.indexOf('/uploads') === 0 || req.path === '/login') {
            next();
      } else if(req.headers.authorization){
            token = req.headers.authorization.split(" ")[1];
            try {
                  const verifyedToken = jwt.verify(token, 'shhhh');
                  req.body.verifyed = verifyedToken;
                  next();
            } catch{
                  res.status(403).send();
            }
      }else{
         res.status(403).send();
      }
});

app.post('/', function (req, res) {
      res.send({ token: token, user: req.body.verifyed.user });
});

app.use("/login", loginRouter);
app.use("/school", schoolRouter);
app.use("/admins", adminsRouter);
app.use("/courses", coursesRouter);
app.use("/students", studentsRouter);
app.use("/upload", filesRouter);

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));