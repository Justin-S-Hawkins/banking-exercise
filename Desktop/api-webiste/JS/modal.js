export const movieModal = (li, movie) => {
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
    document.body.appendChild(infoContainer);
  });
};

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
