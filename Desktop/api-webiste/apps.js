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
  movieModal(li, movie);
  li.classList.add("movie");
  library.appendChild(li);
  console.log(movie);
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

/*CAROUSEL NAVIGATION*/
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

leftArrow.addEventListener("click", () => {
  favoritesCarousel.scrollLeft -= 400;
});

rightArrow.addEventListener("click", () => {
  favoritesCarousel.scrollLeft += 400;
});
/*MOVIE INFO MODAL*/
const movieModal = (li, movie) => {
  const detailsBtn = li.querySelector(".details-btn");

  detailsBtn.addEventListener("click", () => {
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container", "isVisible");
    detailsBtn.classList.add("hidden");
    closeBtnFunction(infoContainer, detailsBtn);

    const infoPoster = document.createElement("img");
    infoPoster.src = movie.Poster;
    infoPoster.classList.add("info-poster");

    const movieInfo = document.createElement("div");
    movieInfo.classList.add("details");
    movieInfo.innerHTML = `
      <h2>${movie.Title}</h2>
      <p>Year: ${movie.Year}</p>
      <p>Type: ${movie.Type}</p>
    `;

    infoContainer.appendChild(infoPoster);
    infoContainer.appendChild(movieInfo);
    document.body.appendChild(infoContainer); // center of page
  });
};
/*CLOSE OPEN-MODAL*/
const closeBtnFunction = (container, detailsBtn) => {
  const closeBtn = document.createElement("div");
  closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  container.appendChild(closeBtn);

  closeBtn.addEventListener("click", () => {
    container.classList.remove("isVisible");
    detailsBtn.classList.remove("hidden");
    document.removeEventListener("click", outsideClickHandler);
  });
  container.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  const outsideClickHandler = (e) => {
    if (!container.contains(e.target)) {
      container.classList.remove("isVisible");
      detailsBtn.classList.remove("hidden");
      document.removeEventListener("click", outsideClickHandler);
    }
  };
  setTimeout(() => {
    document.addEventListener("click", outsideClickHandler);
  }, 0);
};
/*FUNCTION CALLS*/
getMovies();
