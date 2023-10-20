
const { Book } = require('../../models');



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


asyncHandler(async (req, res, next) => {
  const allBooks = await Book.findAll({ order: [['title', 'ASC']]});

  let bookList = allBooks.map(book => book.toJSON());

  console.log(bookList)
})


































/************************************************************************************ */


let pages = document.querySelector('#pages');
pages.innerHTML = '1, 2, 3, 4';


/*
function addPagination (list) {
   let numOfPages = Math.ceil(list.length / 9);
   let linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   for (let i=1; i<=numOfPages; i++) {
      linkList.insertAdjacentHTML(
         'beforeend',
         `<li>
            <button type="button">${i}</button>
         </li>`
       );
   };
   document.querySelector('button').className = 'active';
   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         document.querySelector('.active').className = '';
         e.target.className = 'active';
         showPage(list, e.target.textContent)
      }
   });
 }

// Call functions
showPage(data, 1)
addPagination(data);
*/