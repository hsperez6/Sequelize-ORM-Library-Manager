var express = require('express');
var router = express.Router();

const { Op } = require('../models').Sequelize;
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







/* GET all books from database and render inside index page */
router.get('/', asyncHandler(async (req, res, next) => {
  const allBooks = await Book.findAll({ order: [['title', 'ASC']]});

  // let numOfPages = Math.ceil(allBooks.length / 5)

  // console.log(numOfPages);


  res.render('index', { title: 'Books', allBooks, search: {} });

}));




















/* POST search and render search results*/
router.post('/', asyncHandler(async (req, res, next) => {
  const searchTerm = req.body.search;
  const searchResults = await Book.findAll({
    where: {
      [Op.or]: [
        {title: { [Op.substring]: searchTerm }}, 
        {author: { [Op.substring]: searchTerm }}, 
        {genre: { [Op.substring]: searchTerm }}, 
        {year: searchTerm}
      ]
    }
  });
  res.render('results', { searchResults });
}));

/* GET books/new renders create new-book form */
router.get('/new', (req, res) => {
  res.render('new-book', { book: {}});
});

/* POST books/new posts a new book to the database */
router.post('/new', asyncHandler(async (req, res, next) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect('/');
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render('new-book', { book, errors: error.errors });
    } else {
      throw error;
    }
  };
}));

/* GET books/:id shows update-book form */
router.get('/:id/update', asyncHandler(async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    res.render('update-book', { book })
  } else {
    res.sendStatus(404)
  };
}));

/* POST books/:id Updates book info in the database  */
router.post('/:id/update', asyncHandler(async (req, res, next) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
      res.redirect('/');
    } else {
      res.sendStatus(404);
    };
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id;
      res.render('update-book', { book, errors: error.errors });
    } else {
      throw error;
    };
  };
}));

/* Delete book form. */
router.get("/:id/delete", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render("delete", { book });
  } else {
    res.sendStatus(404);
  };
}));

/* Delete individual book. */
router.post('/:id/delete', asyncHandler(async (req ,res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy();
    res.redirect("/books");  
  } else {
    res.sendStatus(404);
  };
}));

module.exports = router;