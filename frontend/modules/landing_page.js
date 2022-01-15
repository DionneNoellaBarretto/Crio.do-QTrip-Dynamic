import config from "../conf/index.js";

async function init() {

    //Fetches list of all cities along with their images and description
    let cities = await fetchCities();

    //Updates the DOM with the cities
    cities.forEach((key) => {

        addCityToDOM(key.id, key.city, key.description, key.image);



    });
}

//Implementation of fetch call
async function fetchCities() {
    // TODO: MODULE_CITIES
    // 1. Fetch cities using the Backend API and return the data
    try {
        const response = await fetch(config.backendEndpoint + "/cities");
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }


}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
    // TODO: MODULE_CITIES
    // 1. Populate the City details and insert those details into the DOM

    let col = document.createElement("a");
    col.setAttribute("class", "col-sm-4 my-2");
    col.setAttribute("id", id);
    col.setAttribute("href", "pages/adventures/?city=" + id);

    let tile = document.createElement('div');
    tile.setAttribute("class", "tile");

    let img = document.createElement('img');
    img.setAttribute("class", "tile-image");
    img.setAttribute("src", image);

    let text = document.createElement("div");
    text.setAttribute("class", "tile-text");

    text.innerHTML = "<h3>" + city + "</h3>" + description;


    tile.appendChild(img);
    tile.appendChild(text);

    col.appendChild(tile);

    document.getElementById("data").appendChild(col);


}

export { init, fetchCities, addCityToDOM };
