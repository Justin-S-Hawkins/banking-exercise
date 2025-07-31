/*API KEY - 6cd068cc*/
const library = document.querySelector(".library");
const favoritesCarousel = document.querySelector(".fav-carousel");

/*GRABS AND DISPLAYS POSTERS IN HTML*/
const movieSearchTerms = [
  "anime",
  "fire",
  "woman",
  "man",
  "light",
  "dark",
  "cheat",
  "minecraft",
  "batman",
  "comedy",
  "romance",
  "love",
  "horror",
  "Thriller",
];

const movieDataArray = movieSearchTerms.map((term) => {
  return fetch(`http://www.omdbapi.com/?apikey=6cd068cc&s=${term}`).then(
    (data) => data.json()
  );
});
const getMovies = () => {
  movieDataArray.forEach((item) => {
    item
      .then((data) => {
        data.Search.forEach((movie) => {
          renderLibraryList(movie);
        });
      })
      .catch((err) => console.error("Something went wrong:", err));
  });
};
/*RENDERS LIBRARY*/

const renderLibraryList = (movie) => {
  const testImg = new Image();
  testImg.src = movie.Poster;
  const li = document.createElement("li");
  testImg.onload = () => {
    li.style.backgroundImage = `url(${movie.Poster})`;
  };
  li.id = `${movie.imdbID}`;
  testImg.onerror = () => {
    li.style.backgroundImage =
      "url(https://static.vecteezy.com/system/resources/previews/002/486/569/non_2x/404-error-icon-vector.jpg)";
    li.style.backgroundSize = "100%";
    li.style.backgroundRepeat = "no-repeat";
  };

  hoverEffect(li);
  addToFav(li);
  li.classList.add("movie");
  library.appendChild(li);
};
/*ADDING AND REMOVING MOVIES TO AND FROM LIBRARY TO FAVORITES */
const addToFav = (li) => {
  const hovCon = li.querySelector(".hover-container");
  const btnContainer = li.querySelector(".add-to-favorites-btn");
  const addBtn = li.querySelector(".add-icon");

  const remFav = document.createElement("div");
  remFav.classList.add("remove-from-fav");
  remFav.innerHTML = '<i class="fa-solid fa-minus minus-icon"></i>';

  addBtn.addEventListener("click", () => {
    if (li.parentElement.id === "library-collection") {
      hovCon.removeChild(btnContainer);
      hovCon.appendChild(remFav);
      library.removeChild(li);
      favoritesCarousel.appendChild(li);
    }
    remFav.addEventListener("click", () => {
      if (li.parentElement.id === "favorites") {
        hovCon.removeChild(remFav);
        hovCon.appendChild(btnContainer);
        favoritesCarousel.removeChild(li);
        library.appendChild(li);
      }
    });
  });
};

/*HOVER AFFECT STYLES*/
const hoverEffect = (li) => {
  const hoverContainer = document.createElement("div");
  const detailsBtn = document.createElement("div");
  const addToFavoriteBtn = document.createElement("div");
  hoverContainer.classList.add("hover-container");
  detailsBtn.classList.add("details-btn");
  addToFavoriteBtn.classList.add("add-to-favorites-btn");
  detailsBtn.textContent = "Details";
  addToFavoriteBtn.innerHTML = '<i class="fa-solid fa-plus add-icon"></i>';
  hoverContainer.append(detailsBtn, addToFavoriteBtn);
  li.appendChild(hoverContainer);
};

/*FUNCTION CALLS*/
getMovies();
