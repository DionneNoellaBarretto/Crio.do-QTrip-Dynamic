import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
    // TODO: MODULE_RESERVATIONS
    // 1. Fetch Reservations by invoking the REST API and return them
    try {
        const response = await fetch(`https://qtrip-dynamic0.herokuapp.com/reservations`);
        const data = await response.json();

        return data;
    }
    // Place holder for functionality to work in the Stubs
    catch (error) {
        console.log(error);
        return null;
    }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
    // TODO: MODULE_RESERVATIONS
    // 1. Add the Reservations to the HTML DOM so that they show up in the table

    //Conditionally render the no-reservation-banner and reservation-table-parent
    console.log(reservations[0]);
    /*
      Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
      The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
      
      Note:
      1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
      2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
    */
    if (reservations.length == 0) {
        document.getElementById("no-reservation-banner").style.display = "block";
        document.getElementById("reservation-table-parent").style.display = "none";

    } else {
        document.getElementById("no-reservation-banner").style.display = "none";
        document.getElementById("reservation-table-parent").style.display = "block";

        reservations.forEach(key => {
            let tr = document.createElement("tr");
            let td_0 = document.createElement("td");
            td_0.innerHTML = key.id;

            tr.appendChild(td_0);
            let td_1 = document.createElement("td");
            td_1.innerHTML = key.name;
            tr.appendChild(td_1);
            let td_2 = document.createElement("td");
            td_2.innerHTML = key.adventureName;
            tr.appendChild(td_2);
            let td_3 = document.createElement("td");
            td_3.innerHTML = key.person;
            tr.appendChild(td_3);
            let td_4 = document.createElement("td");
            let date = new Date(key.date);
            //let opt={dateStyle:"short"};
            td_4.innerHTML = date.toLocaleDateString("es-ES");
            tr.appendChild(td_4);
            let td_5 = document.createElement("td");
            td_5.innerHTML = key.price;
            tr.appendChild(td_5);
            let td_6 = document.createElement("td");
            let b_date = new Date(key.time);
            let option = { dateStyle: "long" };
            let opt = { timeStyle: "short" }
            td_6.innerHTML = b_date.toLocaleString("en-GB", option) + ", " + b_date.toLocaleTimeString(opt).toLowerCase();
            tr.appendChild(td_6);

            let td_7 = document.createElement("td");
            let a = document.createElement("a");
            //a.setAttribute("href","http://3.109.195.199:8081/frontend/pages/adventures/detail/?adventure="+key.adventure);
            td_7.setAttribute("class", "reservation-visit-button");
            td_7.setAttribute("id", key.id);

            td_7.appendChild(a);

            td_7.innerHTML = `<a  href="http://127.0.0.1:5500/me_qtripdynamic_module_adventure_details_stub-master/frontend/pages/adventures/detail/?adventure=` + key.adventure + `">Visit Adventure</a>`;
            tr.appendChild(td_7);


            document.getElementById("reservation-table").append(tr);
        });
    }

}

export { fetchReservations, addReservationToTable };
