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
    // define query
    const { user_id } = req.query;
    const values = [user_id];
    const tripsQuery = 'SELECT * FROM trips WHERE user_id = $1;'

    // store result in variable, await query
    const result = await db.query(tripsQuery, values);

    // store result in res.locals
    res.locals.trips = result.rows;
    next();

  } catch (err){
    return next({
      log: `databaseController.getTrips ERROR: ${err}`,
      message: {err: 'Error in databaseController.getInventory. Check server logs for details.'}
    });

  }
}

databaseController.addTrip = async(req, res, next) => {
  try {
    const { destination } = req.body;
    const { user_id } = req.query;
    const values = [destination, user_id];
    const tripQuery = 'INSERT INTO trips VALUES (DEFAULT, $1, $2)';

    await db.query(tripQuery, values);
    next();
    
  } catch (err) {
    return next({
      log: `database.addTrip ERROR: ${err}`,
      message: {err: 'Error in databaseController.addTrip. Check server logs for details.'},
    });
  }
}

databaseController.getList = async(req, res, next) => {
  try {
    const { trip_id } = req.query;
    const values = [trip_id];
    const listQuery = 'SELECT items._id AS item_id, items.name AS item, trip_lists.status AS status FROM items INNER JOIN trip_lists ON trip_lists.item_id = items._id WHERE trip_id = $1;'

    const result = await db.query(listQuery, values);
    res.locals.list = result.rows;
    next();

  } catch (err) {
    return next({
      log: `databaseController.getList ERROR: ${err}`,
      message: {err: 'Error in databaseController.getList. Check server logs for details.'}
    });
  }
}

databaseController.updateList = async(req, res, next) => {
  try{
    const { status, item_id, trip_id } = req.body;
    const values = [status, item_id, trip_id];
    const updateQuery = 'UPDATE trip_lists SET status = $1 WHERE item_id = $2 AND trip_id = $3 RETURNING *;'

    const result = await db.query(updateQuery, values);
    res.locals.list = result.rows[0];
    next();

  } catch (err) {
    return next({
      log: `databaseController.updateList ERROR: ${err}`,
      message: {err: 'Error in databaseController.updateList. Check server logs for details.'}
    });
  }
}

module.exports = databaseController;