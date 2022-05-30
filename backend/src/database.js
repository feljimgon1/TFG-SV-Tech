const mongoose = require('mongoose');

const config = require('../config/database'); // Mongoose Config

mongoose.connect(config.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
    },
    (err, db) => {
        // Check if database was able to connect
        if (err) {
          console.log('Could NOT connect to database: ', err); // Return error message
        } else {
          console.log('Connected to ' + config.db); // Return success message
        }
      });