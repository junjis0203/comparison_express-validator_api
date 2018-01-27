const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', './views');
app.set('view engine', 'ejs');

// for legacy API
const expressValidator = require('express-validator')
app.use(expressValidator());

const legacy_api = require('./legacy_api');
const new_api = require('./new_api');

app.use('/legacy_api', legacy_api);
app.use('/new_api', new_api);

app.listen(3000, function () {
    console.log('listening on port 3000');
});
