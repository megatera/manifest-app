const { query } = require('express');
const db = require('./databaseModels');

const databaseController = {};

databaseController.getInventory = async (req, res, next) => {
  try {
    // define query
    const { category, trip_id } = req.query;
    const values = [category, trip_id];
    const inventoryQuery = 'SELECT * FROM items WHERE category = $1 AND _id NOT IN(SELECT item_id FROM trip_lists WHERE trip_id = $2);'

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

databaseController.addItemsToList = async(req, res, next) => {
  try {
    let insertQuery = 'INSERT INTO trip_lists VALUES ';
    const { trip_id, item_ids } = req.body;
    const values = [trip_id];

    // update insertQuery with item_ids from req.body
    for (let i = 0; i < item_ids.length; i++) {
      if (i === 0) {
        insertQuery +=`($1 , ${item_ids[i]}, DEFAULT)`;
      } else if (i === item_ids.length -1) {
        insertQuery += `,($1 , ${item_ids[i]}, DEFAULT);`;
      } else {
      insertQuery +=`,($1 , ${item_ids[i]}, DEFAULT)`;
      }
    };

    await db.query(insertQuery, values);
    next();
  } catch(err) {
    return next({
      log:`databaseController.addItemsToList ERROR: ${err}`,
      message: {err: 'Error in databaseController.addItemsToList. Check server logs for details.'}
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