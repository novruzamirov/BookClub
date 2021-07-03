const wrapper = document.getElementById("wrapper");
const loader = document.getElementById("loader");

function renderAllAuthors(authorList){
    const authorContainer = document.getElementById('authors-container');

    authorList.map(author => {
        
        authorContainer.insertAdjacentHTML("beforeend", ` <div
        class="all-authors__container__item"
        id="all-authors__container__item"
      >
        <img src="${author.imgUrl}" alt="author" />
        <div class="all-authors__container__item__content">
          <h2>${author.name}</h2>
          <h5>${author.biography}</h5>
        </div>
      </div>`) 
    })
}

(function fetchAllAuthors(){
    loader.style.display = "block";
    wrapper.style.display = 'none';
    axios.get("http://localhost:3000/api/authors")
        .then(response => {
            loader.style.display = "none";
            wrapper.style.display = 'block';
            console.log(response.data);
            renderAllAuthors(response.data)
        });
})();