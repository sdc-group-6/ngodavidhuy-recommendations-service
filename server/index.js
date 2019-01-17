const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('../db');
const restaurant = require('./controllers/restaurant');
const template = require('./template/template.js');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/restaurants/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId;
  res.status(200).send(template(restaurantId));
});

app.get('/restaurantInfo/:restaurantId', restaurant.getSuggestions);

const PORT = 3005;
app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });
