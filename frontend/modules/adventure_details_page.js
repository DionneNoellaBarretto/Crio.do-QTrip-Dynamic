import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
    // TODO: MODULE_ADVENTURE_DETAILS
    // 1. Get the Adventure Id from the URL
    const urlParams = new URLSearchParams(search);
    const adventureId = urlParams.get('adventure');

    // Place holder for functionality to work in the Stubs
    return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
    // TODO: MODULE_ADVENTURE_DETAILS
    // 1. Fetch the details of the adventure by making an API call
    try {
        const result = await fetch(config.backendEndpoint + '/adventures/detail?adventure=' + adventureId);
        const data = await result.json();
        return data;
    } catch (err) {
        return null;
    }
    // Place holder for functionality to work in the Stubs

    // return null
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
    // TODO: MODULE_ADVENTURE_DETAILS
    // 1. Add the details of the adventure to the HTML DOM
    document.querySelector("#adventure-name").innerHTML = adventure.name;
    document.querySelector("#adventure-subtitle").innerHTML = adventure.subtitle;

    adventure.images.forEach(key => {

        let image = document.createElement("img");
        image.setAttribute("class", "activity-card-image");
        image.setAttribute("src", key);
        document.querySelector("#photo-gallery").appendChild(image)
    });

    document.querySelector("#adventure-content").innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
    // TODO: MODULE_ADVENTURE_DETAILS
    // 1. Add the bootstrap carousel to show the Adventure images
    let image = document.createElement("div");
    image.setAttribute("id", "carouselExampleIndicators");
    image.setAttribute("class", "carousel slide");
    image.setAttribute("data-ride", "carousel");

    let ol = document.createElement("ol");
    ol.setAttribute("class", "carousel-indicators");




    for (let index = 0; index < images.length; index++) {
        if (index == 0) {
            let li = document.createElement("li")
            li.setAttribute("class", "active");
            li.setAttribute("data-target", "#carouselExampleIndicators");
            li.setAttribute("data-slide-to", index);
            ol.appendChild(li);
            // document.getElementsByClassName("").appendChild(li);

        } else {
            let li = document.createElement("li")
            li.setAttribute("data-target", "#carouselExampleIndicators");
            li.setAttribute("data-slide-to", index);
            ol.appendChild(li);
        }

    }


    image.appendChild(ol);


    let div = document.createElement("div")
    div.setAttribute("class", "carousel-inner")


    for (let index = 0; index < images.length; index++) {
        if (index == 0) {
            let div1 = document.createElement("div");
            div1.setAttribute("class", "carousel-item active");
            let img = document.createElement("img")
            img.setAttribute("class", "d-block w-100");
            img.setAttribute("src", images[index]);
            div1.appendChild(img);
            div.appendChild(div1);

        } else {
            let div1 = document.createElement("div");
            div1.setAttribute("class", "carousel-item");
            let img = document.createElement("img")
            img.setAttribute("class", "d-block w-100");
            img.setAttribute("src", images[index]);
            div1.appendChild(img);
            div.appendChild(div1);
        }

    }

    image.appendChild(div);



    let a1 = document.createElement("a");
    a1.setAttribute("class", "carousel-control-prev");
    a1.setAttribute("href", "#carouselExampleIndicators");
    a1.setAttribute("role", "button");
    a1.setAttribute("data-slide", "prev");

    a1.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="sr-only">Previous</span>`;

    image.appendChild(a1)


    let a2 = document.createElement("a");
    a2.setAttribute("class", "carousel-control-next");
    a2.setAttribute("href", "#carouselExampleIndicators");
    a2.setAttribute("role", "button");
    a2.setAttribute("data-slide", "next");

    a2.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="sr-only">Next</span>`;

    image.appendChild(a2)



    // <div class="carousel-item active">
    //   <img class="d-block w-100" src="" alt="First slide">
    // </div>
    // <div class="carousel-item">
    //   <img class="d-block w-100" src="" alt="Second slide">
    // </div>
    // <div class="carousel-item">
    //   <img class="d-block w-100" src="" alt="Third slide">
    // </div>
    document.querySelector("#photo-gallery").innerHTML = "";


    document.querySelector("#photo-gallery").appendChild(image);


}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
    // TODO: MODULE_RESERVATIONS
    // 1. If the adventure is already reserved, display the sold-out message.
    if (adventure.available) {

        document.querySelector("#reservation-panel-sold-out").style.display = "none";
        document.querySelector("#reservation-panel-available").style.display = "block";
        document.querySelector("#reservation-person-cost").innerHTML = adventure.costPerHead.toString();

    } else {
        document.querySelector("#reservation-panel-available").style.display = "none";
        document.querySelector("#reservation-panel-sold-out").style.display = "block";
    }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
    // TODO: MODULE_RESERVATIONS
    // 1. Calculate the cost based on number of persons and update the reservation-cost field


    let cost = parseInt(adventure.costPerHead) * parseInt(persons);




    document.querySelector("#reservation-cost").innerHTML = cost;




}

//Implementation of reservation form submission using JQuery
function captureFormSubmit(adventure) {
    // TODO: MODULE_RESERVATIONS
    // 1. Capture the query details and make a POST API call using JQuery to make the reservation
    // 
    let form = document.getElementById("myForm");
    form.addEventListener('submit', function(e) {

        e.preventDefault();

        const data = {
            name: document.querySelector("#myForm > input:nth-child(2)").value,
            date: document.querySelector("#myForm > input:nth-child(5)").value,
            person: document.querySelector("#myForm > div:nth-child(7) > div:nth-child(2) > input").value,
            adventure: adventure.id
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        // var data = new FormData(form);
        // data.append('adventure',adventure.id);
        console.log(data);


        fetch(`https://qtrip-dynamic0.herokuapp.com/reservations/new`, options)
            .then(function(response) {
                return response.text();

            })

        .then(function(data) {
                alert("Success!");

            })
            .catch(function(err) {
                //alert("Failed!");
                console.log(err);

            })

        // window.location.reload();

    });




    // $(function () {
    //   //hang on event of form with id=myform
    //   $("#myForm").submit(function (e) {
    //     //prevent Default functionality
    //     e.preventDefault();
    //     console.log(adventure.id);

    //     //get the action-url of the form
    //     let actionurl = `http://3.109.195.199:8082/reservations/new`;
    //     let adventurData = $(this).serialize() + "&adventure=" + adventure.id;

    //     // do your own request an handle the results

    //     $.ajax({
    //       url: actionurl,
    //       type: "POST",
    //       data: adventurData,
    //       success: function (data) {

    //         alert("Success!");
    //         window.location.reload();
    //       },
    //       error: function (data) {
    //         alert("Failed!")

    //         window.location.reload();
    //       },
    //     });
    //   });
    // });



    // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
    // TODO: MODULE_RESERVATIONS
    // 1. If user has already reserved this adventure, show the reserved-banner, else don't
    if (adventure.reserved) {
        document.getElementById("reserved-banner").style.display = "block";
    } else
        document.getElementById("reserved-banner").style.display = "none";
}

export {
    getAdventureIdFromURL,
    fetchAdventureDetails,
    addAdventureDetailsToDOM,
    addBootstrapPhotoGallery,
    conditionalRenderingOfReservationPanel,
    captureFormSubmit,
    calculateReservationCostAndUpdateDOM,
    showBannerIfAlreadyReserved,
};
