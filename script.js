// On load, get user coords:                                                            
window.onload = async () => {
    const coords = await getCoords()
    buildMap(coords)
    console.log(coords)
    console.log(map)
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
}