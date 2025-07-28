/*API KEY - 6cd068cc*/
const library = document.querySelector(".library");

/*GRABS AND DISPLAYS POSTERS IN HTML*/
const movieSearchTerms = [
  "anime",
  "hero",
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
  "action",
  "Thriller",
];

const movieDataArray = movieSearchTerms.map((term) => {
  return fetch(`http://www.omdbapi.com/?apikey=6cd068cc&s=${term}`);
});

movieDataArray.forEach((item) => {
  item
    .then((data) => data.json())
    .then((data) => {
      data.Search.forEach((movie) => {
        const imgElement = document.createElement("img");
        imgElement.src = `${movie.Poster}`;
        //onload of poster display poster
        imgElement.onload = () => {
          const li = document.createElement("li");
          li.style.backgroundImage = `url(${movie.Poster})`;
          li.classList.add("movie");
          library.appendChild(li);
          console.log(movie.Poster); // just to log the movies to show its fetching correctly
        };
        //on error retrieving poster display error img
        imgElement.onerror = () => {
          li.style.backgroundImage =
            "url(https://static.vecteezy.com/system/resources/previews/002/486/569/non_2x/404-error-icon-vector.jpg)";
          li.style.backgroundSize = "100%";
          li.style.backgroundRepeat = "no-repeat";
        };
      });
    })
    .catch((err) => console.error("Something went wrong:", err));
});

/*HOVER AFFECT STYLES*/
