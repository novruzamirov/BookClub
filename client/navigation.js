const signUp = document.getElementById("signup-btn");
const allBooks = document.getElementById("all-books");
const allAuthors = document.getElementById('all-authors');
const logo = document.getElementById('logo');
const notification = document.getElementById('notification');
const dashBoard = document.getElementById('dashboard');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');

const locationArray = location.href.split("/");
if(!(locationArray[locationArray.length - 1] === "dashboard.html")){
    const signUpModal = document.getElementById("signup-modal");
    const signUpModalClose = document.getElementById("signup-modal-close");
    const signUpSubmit = document.getElementById("sign-up-submit");

    loginBtn.addEventListener('click', () => {
        loginModal.style.display = "block";
        wrapper.style.filter = "blur(2px)";
        signUpModal.style.display = "none";
    });

    signUp.addEventListener('click', () => {
        signUpModal.style.display = "block";
        wrapper.style.filter = "blur(2px)";
        loginModal.style.display = 'none';
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

    const loginModal = document.getElementById('login-modal');
    const loginModalClose = document.getElementById('login-modal-close');
    const loginSubmit = document.getElementById('login-submit');

    loginModalClose.addEventListener('click', () => {
        document.getElementById("login-form").reset();
        loginModal.style.display = "none";
        wrapper.style.filter = "blur(0px)";
    });


loginSubmit.addEventListener('click', (e) =>{
    e.preventDefault();
    const loginData = {
        mail: document.getElementById('login-mail').value,
        password: document.getElementById('login-password').value
    };

    function logUserIn(userMail) {
        localStorage.setItem("USER_LOGGED_IN", `${userMail}`);
        loginBtn.insertAdjacentHTML("beforebegin",`<li id="local-mail" style="color: black">${userMail}</li>`)
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
    
}


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
    setTimeout(() => {
        location.href = "index.html";
        notification.classList = "notification";
    }, 1000);
    
})

if(localStorage.getItem("USER_LOGGED_IN")){
    loginBtn.insertAdjacentHTML("beforebegin",`<li id="local-mail" style="color: black">${localStorage.getItem("USER_LOGGED_IN")}</li>`)
    logoutBtn.style.display = "block";
    loginBtn.style.display = "none";
    signUp.style.display = "none";
    dashBoard.style.display = "block";
}

logo.addEventListener('click', () =>{
    if(locationArray[locationArray.length - 1] != "index.html"){
        location.href = "index.html";
    }
})

allAuthors.addEventListener('click', () =>{
    if(locationArray[locationArray.length - 1] != "authors.html"){
        location.href = "authors.html";
    }
})

dashBoard.addEventListener('click', () =>{
    if(locationArray[locationArray.length - 1] != "dashboard.html"){
        location.href = "dashboard.html";
    }
})

allBooks.addEventListener("click", () => {
    if(locationArray[locationArray.length - 1] != "books.html"){
        location.href = "books.html";
    }
})