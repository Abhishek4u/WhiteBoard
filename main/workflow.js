let person = "";

let sandwich = document.getElementsByClassName("sandwich")[0];
let socketRoom = document.getElementById("socketRoom");
let isClicked = false;
sandwich.addEventListener("click", () => {
    if (!isClicked) {
        socketRoom.style.display = "block";
        isClicked = true;
    } else {
        socketRoom.style.display = "none";
        isClicked = false;
    }

})


let chatSwitch = document.getElementsByClassName("chat")[0];
let chatArea = document.getElementById("chat-room");
let isClicked2 = false;

chatSwitch.addEventListener("click", () => {
    if(!isClicked2) {
        chatArea.style.display = "block";
        isClicked2 = true;
    } else {
        chatArea.style.display = "none";
        isClicked2 = false;
    }
})


let btn = document.getElementById("sckt");
let id = document.getElementById("id");
let name = document.getElementById("name");

btn.addEventListener("click", () => {

    idNRoomGeneration();

})

id.addEventListener("keypress", (e) => {
    if (e.key == 'Enter') {
        idNRoomGeneration();
    }
})

// Disconnect
let disconnect = document.getElementById("disconnect");

disconnect.addEventListener("click", () => {

    disconnectMe();

})

// Send message
let msgContainer = document.getElementById("msg-container");
let sendBtn = document.getElementById("send");
let msg = document.getElementById("msgToSend");

msg.addEventListener("keypress", (e) => {
    if (e.key == 'Enter') {
        sendTheMessage();
    }
})


sendBtn.addEventListener("click", () => {

    sendTheMessage();
})


function idNRoomGeneration() {

    person = name.value;
    console.log(person);
    name.value = "";

    socketRoom.style.display = "none";
    isClicked = false;

    let sId = id.value;
    socket.emit('switchRoom', {sId,person});

    id.value = "";
    let idChild = document.getElementById("socketId");
    idChild.innerText = " Your current id is : " + sId;
    idChild.style.color = "green";


    // <div id="chat-title">
    //         <h4>Chat Room</h4>
    //         <h4>ID : None</h4>

    let chatTitle = document.getElementById("chat-title");
    chatTitle.innerHTML = `<h4>Chat Room</h4><h4>ID : ${sId}</h4>`;
    chatTitle.style.color = "green";
}


function disconnectMe() {

    socketRoom.style.display = "none";
    isClicked = false;

    let idChild = document.getElementById("socketId");
    idChild.innerText = " Hey! Now You are connected to unique room ";
    idChild.style.color = "orange";

    let uniqueId = randomId();
    // console.log(uniqueId);
    socket.emit('switchRoom', uniqueId);

    let chatTitle = document.getElementById("chat-title");
    chatTitle.innerHTML = `<h4>Chat Room</h4><h4>ID : Unique ID</h4>`;
    chatTitle.style.color = "orange";
}

function sendTheMessage() {

    if (msg.value != "") {

        let messageBody = document.getElementById("msg-container");
        let div = document.createElement("div");
        div.classList.add("msg");
        let msgPara = msg.value;

        let hours = new Date().getHours() + "";
        let minutes = new Date().getMinutes() + "";

        hours = hours.length == 1 ? 0 + hours : hours;
        minutes = minutes.length == 1 ? 0 + minutes : minutes;
        let time = hours + ":" + minutes;

        div.innerHTML = `<h5  style="color: blue;">${person}<span>${time}</span></h5><h4>${msgPara}</h4></div>`;
        socket.emit('distributeMsg', { person, time, msgPara });
        msg.value = "";

        msgContainer.appendChild(div);

        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }
}

let randomId = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}