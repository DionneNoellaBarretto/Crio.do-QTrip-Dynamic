import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  console.log(search);
  const city = search.split("=")[1];
  console.log(city);
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const adventures = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    ).then((res) => res.json());
    return adventures;
  } catch {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((adventure) => {
    let ele = document.createElement("div");
    ele.className = "col-6 col-lg-3 mb-4";
    ele.innerHTML = ` <a href ="detail/?adventure=${adventure.id}" id = "${adventure.id}">
    <div class="activity-card"> 
    <img class="img-responsive" src="${adventure.image}"/>
    <div class="category-banner"> 
    <h5> ${adventure.category} </h5>
    </div>
    <div class="activity-card-text d-flex flex-wrap w-100 mt-2 align-items-center justify-content-between"> 
    <h6>${adventure.name}</h6>
    <h6> &#x20B9 ${adventure.costPerHead}</h6>
    </div>
    <div class="activity-card-text d-flex flex-wrap w-100 align-items-center justify-content-between"> 
    <h6>Duration :</h6>
    <h6>${adventure.duration} Hours</h6>
    </div>
    </div>
    </a> `;
    document.querySelector("#data").appendChild(ele);
  });
}

// OPTIONAL : Button to add new adventures

// To run the onclick function after DOM is loaded window.onload is used .
window.onload = function () {
  document.getElementById("button").onclick = async function () {
    randomAdventure();
  };
};
// randonAdventure function executes onclick which in turn send post request with input {city: name of city} and in response it add new adventure to city
async function randomAdventure() {
  const id = getCityFromURL(window.location.search);
  const dataToSend = JSON.stringify({ city: `${id}` });
  const dataReceived = await fetch(`${config.backendEndpoint}/adventures/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: dataToSend,
  });
  window.location.reload();
  return dataReceived.json(); // parse JSON response in native javascript object.
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = list.filter(
    (adventure) => adventure.duration > low && adventure.duration <= high
  );
  console.log(filteredList);
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = list.filter(
    (adventure) => categoryList.indexOf(adventure.category) > -1
  );
  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filter_By_Category;
  let filter_By_Duration;
  if (filters.duration.length > 0 && filters.category.length > 0) {
    let category = filters.category;
    filter_By_Category = filterByCategory(list, category);
    let duration = filters.duration;
    let arr = duration.split("-");
    let low = parseInt(arr[0]);
    let high = parseInt(arr[1]);
    return (filter_By_Duration = filterByDuration(
      filter_By_Category,
      low,
      high
    ));
  } else if (filters.category.length > 0) {
    let category = filters.category;
    filter_By_Category = filterByCategory(list, category);
    return filter_By_Category;
  } else if (filters.duration.length > 0) {
    let duration = filters.duration;
    let arr = duration.split("-");
    let low = parseInt(arr[0]);
    let high = parseInt(arr[1]);
    filter_By_Duration = filterByDuration(list, low, high);
    return filter_By_Duration;
  } else {
    return list;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()

  window.localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
  return JSON.parse(window.localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  //return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
  document.getElementById("duration-select").value = `${filters.duration}`;
  filters.category.forEach((category) => {
    console.log(category);
    let div = document.createElement("div");
    div.className = "category-filter";
    div.innerHTML = `${category}`;
    document.getElementById("category-list").appendChild(div);
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  randomAdventure,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
