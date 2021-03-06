const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerdocs.json');
const cors = require('cors');
const ImmunizationController = require('./controllers/immunization.controller');
const UssdController = require('./controllers/ussd.controller');

/** Setting up environment variable */
const port = process.env.PORT || 8080;
const app = express();

/** set up middlewares */
app.options('*', cors());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** initializing swagger environment */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/** set up routes {API Endpoints} */
app.post('/api/v1/immunization/child-registration', (req, res, next) => {
    ImmunizationController.registerChild(req, res, next);
});

app.get('/api/v1/immunization/all-records', (req, res, next) => {
    ImmunizationController.getAllRecord(req, res, next);
});

app.post('/api/v1/immunization/child-profile', (req, res, next) => {
    ImmunizationController.getChildProfile(req, res, next);
});

app.post('/api/v1/immunization/search-records', (req, res, next) => {
    ImmunizationController.searchRecords(req, res, next);
});

app.post('/api/v1/ussd/create', (req, res, next) => {
    UssdController.create(req, res, next);
});

/** starting up the server */
app.listen(port, () => {
    console.log('Server running on port ' + port);
});

module.exports = app;