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
router.get('./books/new', (req, res) => {
  res.render('new-book', {});
});


/* POST books/new Posts a new book to the database */
router.post('/', asyncHandler(async (req, res, next) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/books/" + article.id);
  } catch (error) {
    if(error.name === "SequelizeValidationError") { // checking the error
      article = await Article.build(req.body);
      res.render("articles/new", { article, errors: error.errors, title: "New Article" })
    } else {
      throw error;
    }  
}));

/* POST create article. 
router.post('/', asyncHandler(async (req, res) => {
  let article;
  try {
    article = await Article.create(req.body);
    res.redirect("/articles/" + article.id);
  } catch (error) {
    if(error.name === "SequelizeValidationError") { // checking the error
      article = await Article.build(req.body);
      res.render("articles/new", { article, errors: error.errors, title: "New Article" })
    } else {
      throw error;
    }  
  };
}));



















/**
/* GET articles listing.
router.get('/', asyncHandler(async (req, res) => {
  const articles = await Article.findAll({ order: [['createdAt', 'DESC']] });
  res.render("articles/index", { articles, title: "Sequelize-It!" });
}));

/* Create a new article form. 
router.get('/new', (req, res) => {
  res.render("articles/new", { article: {}, title: "New Article" });
});

/* POST create article. 
router.post('/', asyncHandler(async (req, res) => {
  let article;
  try {
    article = await Article.create(req.body);
    res.redirect("/articles/" + article.id);
  } catch (error) {
    if(error.name === "SequelizeValidationError") { // checking the error
      article = await Article.build(req.body);
      res.render("articles/new", { article, errors: error.errors, title: "New Article" })
    } else {
      throw error;
    }  
  };
}));

 */














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
