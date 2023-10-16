var express = require('express');
var router = express.Router();
const { Book } = require('../models');





/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      // Forward error to the global error handler
      res.status(500).send(error);
    }
  }
};


/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  // res.render('index', { title: 'Express' });
  const allBooks = await Book.findAll();
  console.log( allBooks.map(singleBook => singleBook.toJSON()));
}));

module.exports = router;
