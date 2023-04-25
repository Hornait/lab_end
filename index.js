async function fetchQ(countPage) {
  const users = await fetch(
    `https://api.unsplash.com/photos/?client_id=ab3411e4ac868c2646c0ed488dfd919ef612b04c264f3374c97fff98ed253dc9&page=${
      countPage == undefined ? "1" : countPage
    }`
  );
  const json = await users.json();
  return json;
}

async function main(page) {
  const app = document.getElementById("app");
  const gUsers = await fetchQ(page);
  clearAll();

  const Div = document.createElement("div");
  Div.textContent = "User list =)";
  Div.classList.add("beginning");
  app.appendChild(Div);

  const namesArr = gUsers.map((user) => user.user.name);
  const fotoArr = gUsers.map((user) => user.user.profile_image.small);

  namesArr.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("form");

    const name = document.createElement("div");
    name.classList.add("text");
    name.textContent = item;
    div.appendChild(name);

    const img = document.createElement("img");
    img.classList.add("photo_profile");
    img.src = fotoArr[index];
    div.appendChild(img);

    app.appendChild(div);
    div.addEventListener("click", () => {
      const fullScreenDiv = document.createElement("div");
      fullScreenDiv.classList.add("full_screen");
      const Close = document.createElement("div");
      Close.textContent = "←   User Image";
      Close.classList.add("beginning");
      Close.addEventListener("click", () => {
        app.removeChild(fullScreenDiv);
      });
      fullScreenDiv.appendChild(Close);
      const fullScreenImg = document.createElement("img");
      fullScreenImg.src = gUsers[index].urls.regular;
      fullScreenDiv.appendChild(fullScreenImg);
      app.appendChild(fullScreenDiv);
    });
  });
  paginationHtml(page);
}

function paginationHtml(pageNumber = 1) {
  const app = document.getElementById("app");
  const divPaginate = document.createElement("div");
  divPaginate.classList.add("pagination");

  const prevPageButton = document.createElement("button");
  prevPageButton.textContent = "Back";
  prevPageButton.disabled = pageNumber <= 1;
  prevPageButton.addEventListener("click", () => {
    main(pageNumber - 1);
  });
  divPaginate.appendChild(prevPageButton);

  const pagesNums = Array.from(Array(10), (_, i) => i + 1);
  pagesNums.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item;
    div.classList.add("page-number");
    if (item === pageNumber) {
      div.classList.add("active");
    }
    div.addEventListener("click", () => {
      main(item);
    });
    divPaginate.appendChild(div);
  });

  const nextPageButton = document.createElement("button");
  nextPageButton.textContent = "Next";
  nextPageButton.disabled = pageNumber >= 10;
  nextPageButton.addEventListener("click", () => {
    main(pageNumber + 1);
  });
  divPaginate.appendChild(nextPageButton);
  app.appendChild(divPaginate);
}

function clearAll() {
  const app = document.getElementById("app");
  app.innerHTML = "";
}
main();
