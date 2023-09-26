import { calculateRatios } from "./utils";
import "./waifu.css";
import "./navbar.css";

import { data } from "./waifu_metadata.json";

const id = new URLSearchParams(window.location.search).get("waifu") || "";
const waifu = data.find((waifu) => waifu.id == id);

const app = document.getElementById("waifu");

app.innerHTML = `
        <img
        onerror="if (this.src != 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/no-waifu-no-laifu-markousi-kocic.jpg') this.src = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/no-waifu-no-laifu-markousi-kocic.jpg';"
        src="${waifu.display_picture}" alt="${waifu.name}" />
        <div>
            <p class="waifu-name">
            Name: ${waifu.name}
            </p>
            <p class="waifu-desc">
                Description: ${waifu.description}
            </p>
            <p class="waifu-score">
                Score: ${calculateRatios(waifu)} / 10
            </p>
            <p class="waifu-show">
                Show: ${waifu.appearances[0].name}
            </p>
        </div>
    `;

document.getElementById("bg-img").src = waifu.display_picture;

document.getElementById("btnHome").addEventListener("click", () => {
  window.location.href = `/`;
});
