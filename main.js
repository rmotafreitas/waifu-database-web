import { WAIFUS_PER_PAGE } from "./config";
import "./style.css";
import "./navbar.css";
import { data } from "./waifu_metadata.json";

const currentPage = parseInt(
  new URLSearchParams(window.location.search).get("page") || 1
);

let actualDataSize = 0;

const createWaifuComponent = (waifu) => {
  return `
   <a href="waifu.html?waifu=${waifu.id}" class="waifu">
        <img
          class="waifu-img"
          src="${waifu.display_picture}"
          alt="${waifu.name}"
          onerror="if (this.src != 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/no-waifu-no-laifu-markousi-kocic.jpg') this.src = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/no-waifu-no-laifu-markousi-kocic.jpg';"
        />
        <p class="waifu-name">
            ${waifu.name}
        </p>
    </a>
`;
};

const app = document.getElementById("waifus");

const search = new URLSearchParams(window.location.search).get("search") || "";

let max = WAIFUS_PER_PAGE;
if (search) {
  max++;
}

for (let i = (currentPage - 1) * max; i < currentPage * max; i++) {
  if (!data[i]) break;
  if (
    data[i].name.toLowerCase().includes(search.toLowerCase()) ||
    data[i].description.toLowerCase().includes(search.toLowerCase())
  ) {
    actualDataSize++;
    if (actualDataSize < max) {
      app.innerHTML += createWaifuComponent(data[i]);
    }
  } else {
    max++;
  }
}

if (search) {
  max--;
}

if (currentPage > 1) {
  document.getElementById("btns").innerHTML += `
    <a class="btn" href="?page=${currentPage - 1}">
      <i id="prev" class="ph-bold ph-caret-left"></i>
    </a>
  `;
} else {
  document.getElementById("btns").innerHTML += `
    <div class="btn-stupid" href="?page=${currentPage}"></div>
  `;
}

if (currentPage * WAIFUS_PER_PAGE < data.length && actualDataSize >= max) {
  document.getElementById("btns").innerHTML += `
    <a class="btn" href="?page=${currentPage + 1}">
      <i id="next" class="ph-bold ph-caret-right"></i>
    </a>
  `;
}

document.getElementById("btnSubmit").addEventListener("click", () => {
  const search = document.getElementById("search").value;
  window.location.href = `?search=${search}`;
});

document.getElementById("btnHome").addEventListener("click", () => {
  window.location.href = `/`;
});

window.onload = () => {
  document.getElementById("loading-screen").classList.add("fadeOutAnimation");
};
