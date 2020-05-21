//const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors')




module.exports = app => {

    app.use(cors())
    app.use(helmet());
    app.use(bodyParser.json());    
    app.use(bodyParser.urlencoded({ extended: true }));

   // app.use(morgan());// DEV

};