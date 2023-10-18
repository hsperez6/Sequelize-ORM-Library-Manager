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
  const allBooks = await Book.findAll({ order: [['author', 'ASC']]});
  res.render('index', { title: 'Books', allBooks });
  // res.json( allBooks.map(singleBook => singleBook.toJSON()));
}));


/* GET books/new shows create new book form*/
router.get('/new', (req, res) => {
  res.render('new-book', { book: {}});
});


/* POST books/new Posts a new book to the database */
router.post('/new', asyncHandler(async (req, res, next) => {
  // let book;
  let book = await Book.create(req.body);
  res.redirect('/')

}));
















/* GET books/:id shows book detail form */
router.get('/:id/edit', asyncHandler(async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  res.render('edit', { book })
}));


/* POST books/:id Updates book info in the database  */
router.post('/:id/edit', asyncHandler(async (req, res, next) => {
  let book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect('/');
}));

/* Delete book form. */
router.get("/:id/delete", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render("delete", { book });

}));

/* Delete individual book. */
router.post('/:id/delete', asyncHandler(async (req ,res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect("/books");
}));






module.exports = router;
