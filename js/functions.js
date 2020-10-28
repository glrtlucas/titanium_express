const divRouteElement = document.querySelector('#route'); //seleciona a div pai, #route

const waypoints = {
    remove: () => {
        if (waypointsHTMLCollection.length > 1) {
            divRouteElement.lastChild.remove();
            qtyWaypoints--;
        }
    }
}

const options = { method: 'GET', mode: 'cors', cache: 'default' }
var waypoint0Lat, waypoint0Lng, waypoint1Lat, waypoint1Lng;

const searchAddressWaypoint = {
    waypoint0: addressTyped => {
        
        fetch(`https://discover.search.hereapi.com/v1/discover?at=-25.43998,-49.27654&limit=2&lang=pt-BR&q=${addressTyped}&apiKey=Lh0L27NWmSv6Dt9ABoTBokNd0syQRA_nj66PJALselM`, options)
        .then(response => { 
            response.json().then(data => {
                waypoint0Lat = String(data.items[0].position.lat);
                waypoint0Lng = String(data.items[0].position.lng);
                console.log(waypoint0Lat, waypoint0Lng)

            }).catch((err) => {
                console.log('Deu erro no segundo then catch, erro: ' + err);
            });
        }).catch((err) => {
            console.log('Deu erro aqui para requisitar o endereço, erro: ' + err);
        })
    },
    waypoint1: addressTyped => {
        fetch(`https://discover.search.hereapi.com/v1/discover?at=-25.43998,-49.27654&limit=2&lang=pt-BR&q=${addressTyped}&apiKey=Lh0L27NWmSv6Dt9ABoTBokNd0syQRA_nj66PJALselM`, options)
        .then(response => { 
            response.json().then(data => {
                waypoint1Lat = String(data.items[0].position.lat);
                waypoint1Lng = String(data.items[0].position.lng);
                console.log(waypoint1Lat, waypoint1Lng)

            }).catch((err) => {
                console.log('Deu erro no segundo then catch, erro: ' + err);
            });
        }).catch((err) => {
            console.log('Deu erro aqui para requisitar o endereço, erro: ' + err);
        })
    }
}

let returnKey = false;
const checkReturnValidation = (check) => {
    
    if (check == true) {
        returnKey = true;
    } else {
        returnKey = false;
    }
    console.log('gay')
    calculateReturnPrice(returnKey);
}


const inputAddressWaypoint0 = document.querySelector('#inputAddressWaypoint0');
const checkCompWaypoint0 = document.querySelector('#checkCompWaypoint0');
const inputCompWaypoint0 = document.querySelector('#inputCompWaypoint0');

const inputAddressWaypoint1 = document.querySelector('#inputAddressWaypoint1');
const checkCompWaypoint1 = document.querySelector('#checkCompWaypoint1');
const inputCompWaypoint1 = document.querySelector('#inputCompWaypoint1');

const checkReturn = document.querySelector('#checkReturn');

inputAddressWaypoint0.addEventListener('input', () => searchAddressWaypoint.waypoint0(inputAddressWaypoint0.value));
inputAddressWaypoint0.addEventListener('blur', () => setPositions());
inputAddressWaypoint1.addEventListener('input', () => searchAddressWaypoint.waypoint1(inputAddressWaypoint1.value));
inputAddressWaypoint1.addEventListener('blur', () => setPositions());

checkReturn.addEventListener('click', () => checkReturnValidation(checkReturn.checked));

