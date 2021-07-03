const wrapper = document.getElementById("wrapper");
const signUp = document.getElementById("signup-btn");
const signUpModal = document.getElementById("signup-modal");
const signUpModalClose = document.getElementById("signup-modal-close");
const signUpSubmit = document.getElementById("sign-up-submit");
const notification = document.getElementById('notification');
const loginModal = document.getElementById('login-modal');
const loginModalClose = document.getElementById('login-modal-close');
const loginSubmit = document.getElementById('login-submit');
const loginBtn = document.getElementById('login-btn');
const dashBoard = document.getElementById('dashboard');
const logoutBtn = document.getElementById('logout-btn');
const logo = document.getElementById('logo');

logo.addEventListener('click', () =>{
    location.href = 'index.html';
})

logoutBtn.addEventListener('click', () =>{
    localStorage.removeItem("USER_LOGGED_IN");
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
    signUp.style.display = "block";
    dashBoard.style.display = "none";
    const localMail = document.getElementById("local-mail");
    localMail.style.display = "none";

    notification.textContent = `GOOD BYE ${localMail.firstChild.textContent}`;
    notification.classList.add("bye", "animation");
    setTimeout(() => notification.classList = "notification", 3000);
})

dashBoard.addEventListener('click', () =>{
    location.href = "dashboard.html";
})

const allBooks = document.getElementById("all-books");
const allAuthors = document.getElementById('all-authors');

// CLICK ON ALL AUTHORS
allAuthors.addEventListener('click', () =>{
    location.href = "authors.html";
})

// CLICK ON ALL BOOKS
allBooks.addEventListener("click", () => {
    location.href = "books.html";
})

loginBtn.addEventListener('click', () => {
    loginModal.style.display = "block";
    wrapper.style.filter = "blur(2px)";
    signUpModal.style.display = "none";
});

if(localStorage.getItem("USER_LOGGED_IN")){
    loginBtn.insertAdjacentHTML("beforebegin",`<li id="local-mail" style="color: black">${localStorage.getItem("USER_LOGGED_IN")}</li>`)
    logoutBtn.style.display = "block";
    loginBtn.style.display = "none";
    signUp.style.display = "none";
    dashBoard.style.display = "block";
}

loginSubmit.addEventListener('click', (e) =>{
    e.preventDefault();
    const loginData = {
        mail: document.getElementById('login-mail').value,
        password: document.getElementById('login-password').value
    };

    function logUserIn(userMail) {
        localStorage.setItem("USER_LOGGED_IN", `${userMail}`);
        loginBtn.insertAdjacentHTML("beforebegin",`<li id="local-mail" style="color: black">${userMail}</li>`)
        // loginBtn.innerText = "Log out";
        loginBtn.style.display = "none";
        logoutBtn.style.display = "block";
        signUp.style.display = "none";
        dashBoard.style.display = "block";
    };

    axios.post("http://localhost:3000/api/books/login", loginData)
    .then(() => {
            notification.textContent = "SUCCESS";
            document.getElementById("login-form").reset();
            loginModal.style.display = "none";
            wrapper.style.filter = "blur(0px)";
            notification.classList.add("success", "animation");
            setTimeout(() => notification.classList = "notification", 3000);
            logUserIn(loginData.mail);
    })
    .catch((err) =>{
        console.log(err);
        notification.textContent = "ERROR OCCURED";
        notification.classList.add("error", "animation");
        setTimeout(() => notification.classList = "notification", 3000);
    })

})

loginModalClose.addEventListener('click', () => {
    document.getElementById("login-form").reset();
    loginModal.style.display = "none";
    wrapper.style.filter = "blur(0px)";
});

signUp.addEventListener('click', () => {
    signUpModal.style.display = "block";
    wrapper.style.filter = "blur(2px)";
    loginModal.style.display = "none";
});

signUpModalClose.addEventListener('click', () => {
    document.getElementById("signup-form").reset();
    signUpModal.style.display = "none";
    wrapper.style.filter = "blur(0px)";
});

signUpSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const newUser = {
        name: document.getElementById("name").value,
        surname: document.getElementById("surname").value,
        mail: document.getElementById("mail").value,
        password: document.getElementById("password").value,
    };

    axios.post("http://localhost:3000/api/books/signup", newUser)
        .then((response) => {
            notification.textContent = "SUCCESS";
            notification.classList.add("success", "animation");
            document.getElementById("signup-form").reset();
            signUpModal.style.display = "none";
            wrapper.style.filter = "blur(0px)";
            setTimeout(() => notification.classList = "notification", 3000)
            
        })
        .catch((err) => {
            console.log(err);
            notification.textContent = "ERROR";
            notification.classList.add("error", "animation");
            setTimeout(() => notification.classList = "notification", 3000)
        })
});

function isLoaderVisible(visibility) {
    const loader = document.getElementById("loader");
    if(visibility) {
        wrapper.style.display = "none"
        loader.style.display = "block"
    } else {
        wrapper.style.display = "block"
        loader.style.display = "none"
    }

}

// RENDER LIST OF TOP SELLING BOOKS
function renderTopBooksSold(bookList) {
    const topSellingWrapper = document.getElementById("top-selling");

    bookList.map(book => {
        topSellingWrapper.insertAdjacentHTML("beforeend", `
            <div class="top-selling__books__item">
                <img src="${book.imageUrl}" alt="top">
                <h4>${book.title}</h4>
                <p class="top-selling__books__item__author">By <span>${book.author}</span></p>
                <p class="top-selling__books__item__price">$${book.price}</p>
            </div>
        `)
    })
}

// RENDER FIRST 3 OPENING BOOKS
function renderFirst3Books(bookList) {
    const top3BooksWrapper = document.getElementById("first-3");
    bookList.map(book => {
        top3BooksWrapper.insertAdjacentHTML("beforeend", `
        <div class="book-selection__top-selling">
        <div class="book-selection__top-selling__image">
            <img src="${book.imageUrl}" alt="book">
        </div>
        <div class="book-selection__top-selling__info">
            <h3>${book.title}</h3>
            <div class="book-selection__top-selling__info__book">
                <div>
                    <p>Author</p>
                    <p>${book.author}</p>
                </div>
                <div>
                    <p>Type</p>
                    <p>${book.genre.map(genre => " " + genre)}</p>
                </div>
                <div>
                    <p>Layout</p>
                    <p>${book.bookCover === "hard" ? "Hard" : "Soft"} cover</p>
                </div>
            </div>
            <h4>$${book.price}</h4>
        </div>
    </div>
        `)
    })
};

function renderFirst6Authors(authorList) {
    const authorsWrapper = document.getElementById("authors");
    authorList.map(author => {
        authorsWrapper.insertAdjacentHTML("afterbegin", `
        <div class="authors__wrapper__item">
            <img src="${author.imgUrl}" alt="images">
            <h4>${author.name}</h4>
        </div>
        `) 
    })
}

function fetchAllBooks() {
    isLoaderVisible(true);
    axios.get("http://localhost:3000/api/books")
        .then(response => {
            isLoaderVisible(false);
            renderFirst3Books(response.data.slice(0,3));
            renderTopBooksSold(response.data.sort((book1, book2) => book2.sold - book1.sold).slice(0,5));
        })
        .catch(err => console.log(err))
}

function fetchAllAuthors() {
    const authorsLoader = document.getElementById("authors-loader");
    authorsLoader.style.display = "block"
    axios.get("http://localhost:3000/api/authors")
        .then(response => {
            renderFirst6Authors(response.data.slice(0,6));
            authorsLoader.style.display = "none"
        })
}


function getPrimaryData() {
    fetchAllBooks();
    fetchAllAuthors();
}

getPrimaryData();