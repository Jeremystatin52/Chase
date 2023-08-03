const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const useragent = require('express-useragent');
var noBots = require('express-nobots');


const errorController = require('./controllers/error');
const clientRoutes = require('./routes/client');

const app = express();

app.set('view engine', 'ejs'); 
app.set('views', 'views');

app.use(useragent.express());
app.use(noBots({block:true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(clientRoutes);

app.use(errorController.get404);

app.listen(process.env.PORT || 3000);