export const hoverEffect = (li) => {
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
