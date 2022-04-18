// On load, get user coords:                                                            
window.onload = async () => {
    const coords = await getCoords()
    const map = await buildMap(coords)
    document.querySelector('#business-type').addEventListener('change', async ()=>{
        let business = document.querySelector('#business-type').value
        const results = await foursquare(business)
        const markers = addMarkers(results)
        L.layerGroup(markers).addTo(map)
    })
}

// Get the user's coordinates:                                                              
async function getCoords(){
    pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    let coords = [pos.coords.latitude, pos.coords.longitude]
    return coords
}  

// Create map:
function buildMap(coords){
    const map = L.map('map', {
        center: coords,
        zoom: 12,
    });

    // Add OpenStreetMap tiles:
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: '15',
    }).addTo(map)
    const marker = L.marker(coords).addTo(map);
    return map
}

//Get Foursquare Data:
async function foursquare(business){
    const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'fsq3e324GVrcut+lL7pU2QuRwd7w57fp9eQqSHhpURFFItM='
        }
      };
    let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${business}`, options)
    let data = await response.json()
    let markers = data.results.map((x)=>{
       return {geocode: [x.geocodes.main.latitude, x.geocodes.main.longitude], name: x.name}
    })
    return markers
}

//Add FourSquare Markers:
function addMarkers(results){
    return results.map(x => L.marker(x.geocode).bindPopup(x.name))
}