import { calculateRatios } from "./utils";
import "./waifu.css";
import "./navbar.css";

import { data } from "./waifu_metadata.json";

const id = new URLSearchParams(window.location.search).get("waifu") || "";
const waifu = data.find((waifu) => waifu.id == id);

const app = document.getElementById("waifu");

app.innerHTML = `
    <div class="waifu-wrapper">
        <img
            class="waifu-img"
            onerror="if (this.src != 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/no-waifu-no-laifu-markousi-kocic.jpg') this.src = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/no-waifu-no-laifu-markousi-kocic.jpg';"
            src="${waifu.display_picture}" alt="${waifu.name}" 
        >
        <div class="waifu-score">
                <p>${calculateRatios(waifu)} / 10</p>
        </div>
        <div class="waifu-details">
            <div>
                <p class="waifu-name">
                    ${waifu.name}
                </p>
                <p class="waifu-og-name">${waifu.original_name}</p>
            </div>
            <div>
                <p class="waifu-desc">
                    <strong>Description:</strong> ${waifu.description}
                </p>
                <p class="waifu-show">
                    <strong>Show:</strong> ${waifu.appearances[0].name}
                </p>
            </div>
        </div>
    <div>
`;

document.getElementById("bg-img").src = waifu.display_picture;

document.getElementById("btnHome").addEventListener("click", () => {
  window.location.href = `/`;
});

document.title = document.title.replace("{name}", waifu.name);

window.onload = () => {
  document.getElementById("loading-screen").classList.add("fadeOutAnimation");
};
