const dashboardTableWrapper = document.getElementById("dash-table");
const bookDetailsModal = document.getElementById("book-details-modal");
const bookDetailsModalClose = document.getElementById('book-details-modal-close');
const bookDetailsModalForm = document.getElementById('book-details-modal-form');
const wrapper = document.getElementById("wrapper");
const authorDetailsModal = document.getElementById("author-details-modal");
const authorDetailsModalClose = document.getElementById("author-details-modal-close");
const loader = document.getElementById("loader");
const authorDetailsModalForm = document.getElementById('author-details-modal-form');

const authorDetailSubmit = document.getElementById('author-details-submit');
const bookDetailSubmitBtn = document.getElementById('book-details-submit');


authorDetailsModalClose.addEventListener('click', () =>{
    authorDetailsModal.style.display = "none";
    wrapper.style.filter = "blur(0px) opacity(1)";
})

authorDetailSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    const newAuthor = {
        id: document.getElementById('author-id').value, 
        name: document.getElementById('name').value,
        imgUrl: document.getElementById('imgUrl').value,
        biography: document.getElementById('biography').value,
    }

    axios.post("http://localhost:3000/api/authors", newAuthor)
    .then(() => {
            notification.textContent = "SUCCESS";
            notification.classList.add("success", "animation");
            setTimeout(() => notification.classList = "notification", 3000);
            handleAuthorDetailsModalCLose();
            fetchAllAuthors();
    })
})

bookDetailSubmitBtn.addEventListener('click', (e) =>{
    e.preventDefault();

    const newBook = {
        id: document.getElementById("book-id").value,
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        publisher : document.getElementById("publisher").value,
        publishDay : document.getElementById("publishDay").value,
        sold: document.getElementById("sold").value,
        genre: [],
        imageUrl: document.getElementById("imageUrl").value,
        synopsis: document.getElementById("synopsis").value,
        bookCover: Boolean(document.getElementById("hard").checked) ? "hard" : "soft",
        price: document.getElementById("price").value,
    }

    const allCheckBoxes = document.querySelectorAll('input[type="checkbox"]:checked');

    for(let i = 0; i < allCheckBoxes.length; i++){
        newBook.genre.push(allCheckBoxes[i].value);
    }

    axios.post("http://localhost:3000/api/books", newBook)
    .then(() => {
            notification.textContent = "SUCCESS";
            notification.classList.add("success", "animation");
            setTimeout(() => notification.classList = "notification", 3000);
            handleBookDetailsModalClose();
            fetchAllBooks();
    })

    
})


function handleAuthorDetailsModalOpen(){
    authorDetailsModal.style.display = "block";
    wrapper.style.filter = "blur(3px) opacity(0.4)";
}

function handleAuthorDetailsModalCLose(){
    authorDetailsModal.style.display = "none";
    wrapper.style.filter = "blur(0px) opacity(1)";
    authorDetailsModalForm.reset();
}

function handleBookDetailsModalClose(){
    bookDetailsModal.style.display = "none";
    wrapper.style.filter = "blur(0px) opacity(1)";
    bookDetailsModalForm.reset();
}

bookDetailsModalClose.addEventListener('click', () =>{
    handleBookDetailsModalClose();
})

function createAddBookAction() {
    const addBookBtn = document.getElementById("book-details-modal-add");
    addBookBtn.addEventListener("click", handleDetailsModalOpen);
}

function createAddAuthorAction() {
    const addAuthorBtn = document.getElementById("author-details-modal-add");
    addAuthorBtn.addEventListener("click", handleAuthorDetailsModalOpen);
}

function handleDetailsModalOpen(){
    bookDetailsModal.style.display = "block";
    wrapper.style.filter = "blur(3px) opacity(0.4)";

}

function deleteEditAuthorById(){
    const tableDataWrapper = dashboardTableWrapper.firstElementChild;
    for(let i=1; i < tableDataWrapper.children.length; i++) {
        const deleteIcon = tableDataWrapper.children[i].children[0].lastElementChild.firstElementChild;

        deleteIcon.addEventListener('click', () => {
            const id = deleteIcon.id.split("-")[2];
            axios.delete(`http://localhost:3000/api/authors/${id}`)
            .then(() => {
                notification.textContent = "SUCCESS";
                notification.classList.add("success", "animation");
                setTimeout(() => notification.classList = "notification", 3000);
                fetchAllAuthors();
            })
        })

    }
}

function deleteEditBookById() {
    const tableDataWrapper = dashboardTableWrapper.firstElementChild;
    for(let i=1; i < tableDataWrapper.children.length; i++) {
        const deleteIcon = tableDataWrapper.children[i].children[0].lastElementChild.firstElementChild;
        const editIcon = tableDataWrapper.children[i].children[0].lastElementChild.lastElementChild;

        deleteIcon.addEventListener('click', () => {
            const id = deleteIcon.id.split("-")[2];
            axios.delete(`http://localhost:3000/api/books/${id}`)
            .then(() => {
                notification.textContent = "SUCCESS";
                notification.classList.add("success", "animation");
                setTimeout(() => notification.classList = "notification", 3000);
                fetchAllBooks();
            })
        })

        editIcon.addEventListener('click', () =>{
            const id = editIcon.id.split('-')[2];
            console.log(id);

            axios.get(`http://localhost:3000/api/books/${id}`)
            .then(({data: bookById}) => {
                handleDetailsModalOpen();

                document.getElementById("id").value = bookById.id;
                document.getElementById("title").value = bookById.title;
                document.getElementById("author").value = bookById.author;
                document.getElementById("publisher").value = bookById.publisher;
                document.getElementById("publishDay").value = bookById.publishDay;
                document.getElementById("sold").value = bookById.sold;
                document.getElementById("imageUrl").value = bookById.imageUrl;
                document.getElementById("synopsis").value = bookById.synopsis;
                document.getElementById("price").value = bookById.price;

                bookById.bookCover === "hard" ? document.getElementById("hard").checked : document.getElementById("soft").checked

                bookById.genre.map((genreItem => {
                    const allGenres = document.querySelectorAll('input[type="checkbox"]');

                    for(let i = 0; i < allGenres.length; i++){
                        if(allGenres[i].value === genreItem){
                            allGenres[i].checked = true;
                            break;
                        }
                    }
                }))
            })
        })
    }
}

function renderAllBooks(bookList) {
    dashboardTableWrapper.innerHTML = "";
    const bookTable = `
        <table>
            <tr>
                <th>#id</th>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>Price</th>
                <th> 
                <img src="./assets/icons/cancel.svg" alt="add" class="book-details-modal__add" id="book-details-modal-add" style="cursor: pointer">
                </th>
            </tr>
        </table>
    `;
    dashboardTableWrapper.insertAdjacentHTML("afterbegin", bookTable);
    bookList.map(book => {
        dashboardTableWrapper.firstElementChild.insertAdjacentHTML("beforeend", `
            <tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.publisher}</td>
                <td>$${book.price}</td>
                <td>
                    <img src='./assets/icons/delete.svg' style="cursor: pointer;" id="delete-book-${book.id}">
                    <img src='./assets/icons/pencil.svg' style="cursor: pointer;" id="edit-book-${book.id}">
                </td>
            </tr>
        `);
    })
    createAddBookAction();
    deleteEditBookById();
} 

function renderAllAuthors(authorList){
    dashboardTableWrapper.innerHTML = "";
    const bookTable = `
        <table>
            <tr>
                <th>#id</th>
                <th>Name</th>
                <th> 
                <img src="./assets/icons/cancel.svg" alt="add" class="book-details-modal__add" id="author-details-modal-add" style="cursor: pointer">
                </th>
            </tr>
        </table>
    `;
    dashboardTableWrapper.insertAdjacentHTML("afterbegin", bookTable);

    authorList.map(author =>{
        dashboardTableWrapper.firstElementChild.insertAdjacentHTML("beforeend", `
        <tr>
            <td>${author.id}</td>
            <td>${author.name}</td>
            <td>
                <img src='./assets/icons/delete.svg' style="cursor: pointer;" id="delete-book-${author.id}">
            </td>
        </tr>
    `);
    })

    createAddAuthorAction();
    deleteEditAuthorById();
}

function renderAllUsers(userList){
    dashboardTableWrapper.innerHTML = "";
    const userTable = `
    <table>
        <tr>
            <th>#id</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Mail</th>
            <th>Password</th>
        </tr>
    </table>
`;
    dashboardTableWrapper.insertAdjacentHTML("afterbegin", userTable);
    userList.map(user =>{
        dashboardTableWrapper.firstElementChild.insertAdjacentHTML("beforeend", `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.surname}</td>
            <td>${user.mail}</td>
            <td>${user.password}</td>
        </tr>
    `);
    })
}

function fetchAllUsers(){
    loader.style.display = "block";
    wrapper.style.display = 'none';
    axios.get("http://localhost:3000/api/users")
    .then((response) => {
        renderAllUsers(response.data);
        loader.style.display = "none";
        wrapper.style.display = 'block';
    })
    .catch((err) => {
        console.log(err);
    })
}

function fetchAllBooks() {
    loader.style.display = "block";
    wrapper.style.display = 'none';
    axios.get("http://localhost:3000/api/books")
    .then(response => {
        renderAllBooks(response.data);
        loader.style.display = "none";
        wrapper.style.display = 'block';
    })
    .catch(err => console.log(err));         
};

function fetchAllAuthors(){
    loader.style.display = "block";
    wrapper.style.display = 'none';
    axios.get("http://localhost:3000/api/authors")
    .then(response => {
        loader.style.display = "none";
        wrapper.style.display = 'block';
        renderAllAuthors(response.data);
        console.log("success")
    })
    .catch(err => console.log(err))
}

(function getActiveNavItem() {
    const booksTab = document.getElementById("books-dash");
    const authorsTab = document.getElementById("authors-dash");
    const usersTab = document.getElementById("users-dash");
    booksTab.className = "dashboard__navigation__active";
    fetchAllBooks();

    booksTab.addEventListener('click', () => {
        authorsTab.className = "";
        usersTab.className = "";
        booksTab.className = "dashboard__navigation__active";
        fetchAllBooks();
    });

    authorsTab.addEventListener('click', () => {
        booksTab.className = "";
        usersTab.className = "";
        authorsTab.className = "dashboard__navigation__active";
        fetchAllAuthors();
    });

    usersTab.addEventListener('click', () => {
        booksTab.className = "";
        authorsTab.className = "";
        usersTab.className = "dashboard__navigation__active";
        fetchAllUsers();
    });
})();
