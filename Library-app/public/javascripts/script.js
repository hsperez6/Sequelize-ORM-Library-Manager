const { Book } = require('../../models');


/* Pug for original pagination numbers
  .pagination
    - var n = 1;
    ul#pages
      while n <= numOfPages
        li.pagenum= n++
  script(src='/javascripts/script.js')
*/


/** Goes in books.js GET for index page
  const allBooks = await Book.findAndCountAll({ 
    order: [['title', 'ASC']],
    limit: 5,
    offset: ,
  });
 */




  /*index.js PUG template
        while n < page_count+1
        li
          a(href="?page="+n)=n++
  */

   // const paginate = ({ page }) => {
  //   const offset = page * 5;
  //   const limit = 5;
  
  //   return {
  //     offset,
  //     limit,
  //   };
  // };

  // let allBooks = await Book.findAll({
  //     ...paginate,
  // });

  // const allBooks = await Book.findAndCountAll({ 
  //   order: [['title', 'ASC']],
  //   limit: 5,
  //   offset: ,
  // });

  //   let startIndex  = (page * 5) - 5;
  //   let endIndex = (page * 5) - 1;

  //   for (let i=0; i<bookList.length ; i++) {
  //     if (i >= startIndex && i < endIndex) {
  //        studentList.insertAdjacentHTML(
  //           'beforeend',
  //           ``
  //         );
  //     };
  //  };

  // let numOfPages = Math.ceil(bookList.length / 5);




























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