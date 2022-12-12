const btnSend = document.querySelector('.btn-send');
const btnGeoloc = document.querySelector('.btn-geoloc');
const wsUri = 'wss://echo-ws-service.herokuapp.com/';
let chatDisplay = document.querySelector('.chat-display');
let inputNode = document.getElementById('input');
let userText;
let websocket;

inputNode.addEventListener('input', () => {
    userText = inputNode.value;
})

function validateForm()    {
    if (inputNode.value.length === 0) { 
        alert("Your message must be filled");  	
        return false; 
     }  	
     else return true; 
   } 

btnSend.addEventListener('click', (event) => {
    if (validateForm() == true) {
        displayMessage(userText);
        websocket = new WebSocket(wsUri)
        websocket.onopen = function () {
        websocket.send(userText);
        };
        websocket.onmessage = function(event) {
            displayMessage('<span style="color: blue;">' + event.data+'</span>');
        };
        websocket.onerror = function (event) {
            displayMessage('<span style="color: red;">ERROR:</span> ' + event.data)};
    }

});

btnGeoloc.addEventListener('click', () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            displayMessage(`<a href="https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}" target="_blank"">Link to map</a>`);
        })
    }
})

function displayMessage(message) {
    let chatItem = document.createElement('p');
    chatItem.innerHTML = message;
    chatItem.classList.add("message");
    chatDisplay.appendChild(chatItem);
}



