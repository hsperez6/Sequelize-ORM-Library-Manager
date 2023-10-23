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

/*************************
* ROUTES 
**************************/

/* GET redirect to the first page in list pagination */
router.get('/', asyncHandler(async (req, res, next) => {
  res.redirect('/books/1')
}));

/* GET all books from database and render inside index page */
router.get('/:page', asyncHandler(async (req, res, next) => {
  const pageLimit = 6;
  const pageNum = req.params.page;
  
  const { count, rows } = await Book.findAndCountAll({
    order: [['title', 'ASC']],
    limit: pageLimit,
    offset: pageLimit * (pageNum - 1), 
  });

  const bookList = rows.map( book => book.dataValues );
  const pages = Math.ceil( count / pageLimit );

  res.render('index', { bookList, pages, pageNum, search: {} });
  
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
  res.render('results', { searchResults, search: {} });
}));

/* GET books/new renders create new-book form */
router.get('/new/create', (req, res) => {
  res.render('new-book', { book: {} });
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
router.get('/update/:id', asyncHandler(async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    res.render('update-book', { book })
  } else {
    res.sendStatus(404)
  };
}));

/* POST books/:id Updates book info in the database  */
router.post('/update/:id', asyncHandler(async (req, res, next) => {
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
router.get("/delete/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render("delete", { book });
  } else {
    res.sendStatus(404);
  };
}));

/* Delete individual book. */
router.post('/delete/:id', asyncHandler(async (req ,res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy();
    res.redirect("/books");  
  } else {
    res.sendStatus(404);
  };
}));

module.exports = router;