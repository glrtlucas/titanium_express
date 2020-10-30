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

let routeType = document.querySelector('#routeType');
let empresa = document.querySelector('#selectCompany');

empresa.addEventListener('change', () => setAddrCompany());

function setAddrCompany() {
    if (routeType.value == 'Entrega') {
        switch (empresa.value) {
            case 'Agência Kobe':
                inputAddressWaypoint1.value = '';
                inputCompWaypoint1.value = '';
                checkCompWaypoint1.checked = false;
                inputAddressWaypoint0.value = 'R. Visconde do Rio Branco, 1189';
                inputCompWaypoint0.value = 'Conj. C';
                checkCompWaypoint0.checked = false;
            break;
            case 'Âmbar Bastardo':
                inputAddressWaypoint1.value = '';
                inputCompWaypoint1.value = '';
                checkCompWaypoint1.checked = false;
                inputAddressWaypoint0.value = 'R. Comendador Araújo, 845';
                inputCompWaypoint0.value = 'Lj 2';
                checkCompWaypoint0.checked = false;
            break;
            case 'Combat Informática':
                inputAddressWaypoint1.value = '';
                inputCompWaypoint1.value = '';
                checkCompWaypoint1.checked = false;
                inputAddressWaypoint0.value = 'R. Holanda, 1226';
                inputCompWaypoint0.value = 'Lj 2';
                checkCompWaypoint0.checked = false;
            break;
            case 'Dona Glam':
                inputAddressWaypoint1.value = '';
                inputCompWaypoint1.value = '';
                checkCompWaypoint1.checked = false;
                inputAddressWaypoint0.value = 'R. Padre Anchieta, 2454';
                inputCompWaypoint0.value = 'Lj 18';
                checkCompWaypoint0.checked = false;
            break;
            case 'Novideia':
                inputAddressWaypoint1.value = '';
                inputCompWaypoint1.value = '';
                checkCompWaypoint1.checked = false;
                inputAddressWaypoint0.value = 'R. Pref. Erasto Gaertner, 97';
                inputCompWaypoint0.value = '';
                checkCompWaypoint0.checked = true;
            break;
            case 'Particular':
                inputAddressWaypoint1.value = '';
                inputCompWaypoint1.value = '';
                checkCompWaypoint1.checked = false;
                inputAddressWaypoint0.value = '';
                inputCompWaypoint0.value = '';
                checkCompWaypoint0.checked = false;
            break;
            case 'Souhait':
                inputAddressWaypoint1.value = '';
                inputCompWaypoint1.value = '';
                checkCompWaypoint1.checked = false;
                inputAddressWaypoint0.value = 'R. Mal. José Bernardino Bormann, 1492';
                inputCompWaypoint0.value = 'Ap 802';
                checkCompWaypoint0.checked = false;
            break;
        }
    } else if (routeType.value == 'Coleta') {
            switch (empresa.value) {
                case 'Agência Kobe':
                    inputAddressWaypoint0.value = '';
                    inputCompWaypoint0.value = '';
                    checkCompWaypoint0.checked = false;
                    inputAddressWaypoint1.value = 'R. Visconde do Rio Branco, 1189';
                    inputCompWaypoint1.value = 'Conj. C';
                    checkCompWaypoint1.checked = false;
                break;
                case 'Âmbar Bastardo':
                    inputAddressWaypoint0.value = '';
                    inputCompWaypoint0.value = '';
                    checkCompWaypoint0.checked = false;;
                    inputAddressWaypoint1.value = 'R. Comendador Araújo, 845';
                    inputCompWaypoint1.value = 'Lj 2';
                    checkCompWaypoint1.checked = false;
                break;
                case 'Combat Informática':
                    inputAddressWaypoint0.value = '';
                    inputCompWaypoint0.value = '';
                    checkCompWaypoint0.checked = false;
                    inputAddressWaypoint1.value = 'R. Holanda, 1226';
                    inputCompWaypoint1.value = 'Lj 2';
                    checkCompWaypoint1.checked = false;
                break;
                case 'Dona Glam':
                    inputAddressWaypoint0.value = '';
                    inputCompWaypoint0.value = '';
                    checkCompWaypoint0.checked = false;
                    inputAddressWaypoint1.value = 'R. Padre Anchieta, 2454';
                    inputCompWaypoint1.value = 'Lj 18';
                    checkCompWaypoint1.checked = false;
                break;
                case 'Novideia':
                    inputAddressWaypoint0.value = '';
                    inputCompWaypoint0.value = '';
                    checkCompWaypoint0.checked = false;
                    inputAddressWaypoint1.value = 'R. Pref. Erasto Gaertner, 97';
                    inputCompWaypoint1.value = '';
                    checkCompWaypoint1.checked = true;
                break;
                case 'Particular':
                    inputAddressWaypoint0.value = '';
                    inputCompWaypoint0.value = '';
                    checkCompWaypoint0.checked = false;
                    inputAddressWaypoint1.value = '';
                    inputCompWaypoint1.value = '';
                    checkCompWaypoint1.checked = false;
                break;
                case 'Souhait':
                    inputAddressWaypoint0.value = '';
                    inputCompWaypoint0.value = '';
                    checkCompWaypoint0.checked = false;
                    inputAddressWaypoint1.value = 'R. Mal. José Bernardino Bormann, 1492';
                    inputCompWaypoint1.value = 'Ap 802';
                    checkCompWaypoint1.checked = false;
                break;
            }
    }
}

routeType.addEventListener('change', () => {
    setAddrCompany();
});





