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


/* GET Books */
router.get('/', asyncHandler(async (req, res, next) => {
  const allBooks = await Book.findAll();
  res.render('index', { title: 'Books', allBooks });
  // res.json( allBooks.map(singleBook => singleBook.toJSON()));
}));


/* GET books/new shows create new book form*/
router.get('/', asyncHandler(async (req, res, next) => {

}));


/* POST books/new Posts a new book to the database */
router.post('/', asyncHandler(async (req, res, next) => {

}));

/* GET books/:id shows book detail form */
router.get('/', asyncHandler(async (req, res, next) => {
  
}));


/* POST books/:id Updates book info in the database  */
router.post('/', asyncHandler(async (req, res, next) => {

}));


/* POST books/:id/delete Deletes a book. Be careful, this can't be undone. Create a new "test" book to test deleting*/
router.post('/', asyncHandler(async (req, res, next) => {

}));




module.exports = router;
