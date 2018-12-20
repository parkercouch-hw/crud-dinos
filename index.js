const express = require('express');
const app = express();
const PORT = 3000;

const ejsLayouts = require('express-ejs-layouts');
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));

app.use(express.static(__dirname + '/public'));
app.use(ejsLayouts);

app.use('/dinosaurs', require('./controllers/dinosaurs'));
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'));

// UPDATE THIS
app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.listen(PORT);