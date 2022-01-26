const path = require('path');
const express = require('express');
const databaseController = require('./databaseController');

const app = express();
const PORT = 3000;

// handle parsing body
// handle url parameters
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// define route handlers
app.get('/inventory?:category', 
  databaseController.getInventory, 
  (req, res) => {
    return res.status(200).json(res.locals.inventory);
  });

app.post('/trip?:user', 
  databaseController.createTrip,
  (req, res) => {
    return res.status(200).json({});
  });

// app.post('list', 
//   databaseController.updateList,
//   (req, res) => {
//     return res.status(200).json({});
//   });

// route handler to respond with main app
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../src/index.html'));
});

// catch-all route handler for any requests to an unknown routes
app.use((req, res) => res.sendStatus(404));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred'},
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;