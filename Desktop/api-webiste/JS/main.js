/*API KEY - 6cd068cc*/
export const library = document.querySelector(".library");
export const favoritesCarousel = document.querySelector(".fav-carousel");
import { hoverEffect } from "./hoverRender.js";
import { addToFav } from "./addRemoveFav.js";
import { movieModal } from "./modal.js";
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
  movieModal(li, movie);
  li.classList.add("movie");
  library.appendChild(li);
  console.log(movie);
};

const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

leftArrow.addEventListener("click", () => {
  favoritesCarousel.scrollLeft -= 400;
});

rightArrow.addEventListener("click", () => {
  favoritesCarousel.scrollLeft += 400;
});

getMovies();
