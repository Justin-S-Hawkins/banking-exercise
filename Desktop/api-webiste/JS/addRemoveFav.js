import { library, favoritesCarousel } from "./main.js";
export const addToFav = (li) => {
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
