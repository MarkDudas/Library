const myLibrary = [];


function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}


function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayLibrary();
}


function displayLibrary() {
    const libraryDisplay = document.getElementById('libraryDisplay');
    libraryDisplay.innerHTML = ''; 
  
    myLibrary.forEach((book, index) => {
      
        const bookCardContainer = document.createElement('div');
        bookCardContainer.classList.add('book-card-container');
      
        
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-index', index);
      
       
        bookCard.innerHTML = `
          <h3>${book.title}</h3>
          <p>Author: ${book.author}</p>
          <p>Pages: ${book.pages}</p>
          <p>Read: ${book.read ? 'Yes' : 'No'}</p>
          <button class="toggleReadBtn">Toggle Read Status</button>
          <button class="removeBtn">Remove</button>
        `;
      
    
        bookCardContainer.appendChild(bookCard);
      
       
        libraryDisplay.appendChild(bookCardContainer);
      });
      
  

    document.querySelectorAll('.toggleReadBtn').forEach(button => {
      button.addEventListener('click', toggleReadStatus);
    });
  
    document.querySelectorAll('.removeBtn').forEach(button => {
      button.addEventListener('click', removeBook);
    });
  }
  

  function toggleReadStatus(event) {
    const bookIndex = event.target.parentElement.getAttribute('data-index');
    myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
    displayLibrary();
  }
  

  function removeBook(event) {
    const bookIndex = event.target.parentElement.getAttribute('data-index');
    myLibrary.splice(bookIndex, 1); 
    displayLibrary();
  }
  

  document.getElementById('newBookBtn').addEventListener('click', () => {
    document.getElementById('bookFormModal').showModal();
  });
  
  document.getElementById('cancelBtn').addEventListener('click', () => {
    document.getElementById('bookFormModal').close();
  });
  
  document.getElementById('bookForm').addEventListener('submit', (event) => {
    event.preventDefault(); 
  

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
  
  
    addBookToLibrary(title, author, pages, read);
    document.getElementById('bookForm').reset();
    document.getElementById('bookFormModal').close();
  });
  

  addBookToLibrary('1984', 'George Orwell', 328, true);
  addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);
  
  displayLibrary();