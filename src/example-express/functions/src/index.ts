import * as functions from 'firebase-functions';

import App from './app'

import * as bodyParser from 'body-parser'
import loggerMiddleware from './middlewares/logger'

import HomeController from './controllers/home.controller'

const app = new App({
    controllers: [
        new HomeController(),
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
})

app.app.get('/', function (req, res) {
    res.send('Health Check!');
});

exports.exampleModule = functions.https.onRequest(app.app);
