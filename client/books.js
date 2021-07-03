const wrapper = document.getElementById("wrapper");
const loader = document.getElementById("loader");

function renderAllBooks(booksList) {
    const booksContainer = document.getElementById("books-container");
    booksList.map(book => {
        booksContainer.insertAdjacentHTML("beforeend", `
        <div class="all-books__container__item">
            <div class="all-books__container__item__img">
                <img src="${book.imageUrl}" alt="book">
            </div>
            <div class="all-books__container__item__info">
                <h3 class="all-books__container__item__info__title">${book.title}</h3>
                <p class="all-books__container__item__info__author">By <span>${book.author}</span></p>
                <p class="all-books__container__item__info__synopsis">${book.synopsis}${book.synopsis}</p>
            </div>
        </div>
        `) 
    }) 
}

(function fetchAllBooks(){
    loader.style.display = "block";
    wrapper.style.display = 'none';
    axios.get("http://localhost:3000/api/books")
        .then(response => {
            loader.style.display = "none";
            wrapper.style.display = 'block';
            renderAllBooks(response.data)
        });
})();
