require('dotenv').config();
const { engine: exphbs } = require('express-handlebars');
const handlebars = require('handlebars');
const express = require('express');
const spawn = require('child_process').spawn;
const mongoose = require('mongoose');
const cors = require('cors');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const methodOverride = require('method-override');
const workoutRoutes = require('./routes/api/workouts');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
mongoose.set('strictQuery', true);



const app = express();
app.use(require('./routes/hrv'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(cors());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const options = {
  layoutsDir: 'views/layouts/',
  defaultLayout: 'main',
  partialsDir: ['views/partials/'],
  helpers: require('./helpers/hbs'),
  extname: '.hbs',
};

app.engine(
  '.hbs',
  exphbs({
    ...options,
    handlebars: allowInsecurePrototypeAccess(handlebars),
  })
);
app.set('view engine', '.hbs');


app.set('views', './views');



app.use(express.static(path.join(__dirname, 'public')));

app.get('/python', cb);
function cb(req, res) {
  const process = spawn('python', ['./scripts/python_test.py']);

  process.stdout.on('data', function (data) {
    res.send(data.toString());
  });
}

app.use('/', require('./routes/index'));
app.use('/auth', authRoutes);
app.use('/stories', require('./routes/stories'));
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database');

    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT || 3000);
    });
  })
  .catch((err) => {
    console.log(err);
  });

/*

require('dotenv').config();
const fetch = require('node-fetch');

const userAgent = 'Test Kubios 0.1';

const login = async () => {
  const cookie = 'keyboardCatRandom';
  const myHeaders = {Cookie: `XSRF-TOKEN=${cookie}`, 'User-Agent': userAgent};
  const myBody = new URLSearchParams();
  myBody.set('client_id', process.env.CLIENT_ID);
  myBody.set('redirect_uri', 'https://analysis.kubioscloud.com/v1/portal/login');
  myBody.set('username', process.env.KUBIOS_USERNAME);
  myBody.set('password', process.env.PASSWORD);
  myBody.set('response_type', 'token');
  myBody.set('access_type', 'openid');
  myBody.set('_csrf', cookie);
  const option = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'manual',
    body: myBody,
  };
  const response = await fetch('https://kubioscloud.auth.eu-west-1.amazoncognito.com/login', option);
  const location = response.headers.raw().location[0];
  const token = location.substring(location.indexOf('=') + 1, location.indexOf('&'));
  return token;
};

const perso = async () => {
  const token = await login();
const myHeaders = {Authorization: 'Bearer ' + token, 'User-Agent': userAgent};
  const response = await fetch('https://analysis.kubioscloud.com/v2/user/self', { headers: myHeaders });
  const json = await response.json();
  console.log('json', json);
};

perso();

const data = async () => {
  const token = await login();
  const myHeaders = { Authorization: 'Bearer ' + token, 'User-Agent': userAgent };
  const response = await fetch('https://analysis.kubioscloud.com/v2/result/self?types=readiness&daily=yes&from=2023-01-24T00%3A00%3A00%2B00%3A00&to=2023-02-04T23%3A59%3A59%2B00%3A00', { headers: myHeaders });
  const json = await response.json();
  console.log('json', json);
  };
  
  data(); /*Lisätty kubios koodi riviltä 103 alkaen.*/
