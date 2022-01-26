const { query } = require('express');
const db = require('./databaseModels');

const databaseController = {};

databaseController.getInventory = async (req, res, next) => {
  console.log('in get inventory');
  try {

    // define query
    const { category } = req.query;
    const values = [category];
    const inventoryQuery = 'SELECT * FROM items WHERE category = $1;'

    // store result in variable, await query
    const result = await db.query(inventoryQuery, values);

    // store result in res.locals
    res.locals.inventory = result.rows;
    next();

  } catch (err) {
    return next({
      log: `databaseController.getInventory ERROR: ${err}`,
      message: {err: 'Error in databaseController.getInventory. Check server logs for details.'}
    });
    
  }
}

databaseController.getTrips = async(req, res, next) => {
  try {

  } catch {

  }
}

module.exports = databaseController;