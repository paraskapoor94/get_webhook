process.env.NODE_CONFIG_DIR = 'config/';
// Moving NODE_APP_INSTANCE aside during configuration loading
var app_instance = process.argv.NODE_APP_INSTANCE;
process.argv.NODE_APP_INSTANCE = "";
config = require('config');
process.argv.NODE_APP_INSTANCE = app_instance;

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var getWebhook = require('./routes/getWebhook');

var app = express();

app.set('port', process.env.PORT || config.get('PORT'));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.post('/getWebhook', getWebhook.getWebhook);


startServer = http.createServer(app).listen(app.get('port'), function () {
    console.log('Server started on port: ', app.get('port'));
});