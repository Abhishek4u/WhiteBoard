socket.on('rColorChange', function (color) {
    ctx.strokeStyle = color;
})

socket.on("onmd", function (point) {
    let { x, y, color, width } = point;

    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x, y);
})

socket.on("onmm", function (point) {
    let { x, y, color, width } = point;

    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
})

socket.on("addMsg", (data) => {

    addMsg(data);
})

socket.on("showTime", () => {

    let timeDiv = document.getElementById("time");
    let h5 = document.createElement("h5");

    let hours = new Date().getHours() + "";
    let minutes = new Date().getMinutes() + "";

    hours = hours.length == 1 ? 0 + hours : hours;
    minutes = minutes.length == 1 ? 0 + minutes : minutes;
    let time = hours + ":" + minutes;
    h5.innerHTML = `${time}`; timeDiv.appendChild(h5);
})

socket.on("userJoined", (user) => {

    userJoined(user);

})

function addMsg(data) {


    let messageBody = document.getElementById("msg-container");
    let div = document.createElement("div");

    div.classList.add("msg");

    div.innerHTML = `<h5 style="color: red;">${data.person}<span >${data.time}</span></h5>
    <h4>${data.msgPara}</h4></div>`;

    msgContainer.appendChild(div);

    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
}

function userJoined(user) {

    let messageBody = document.getElementById("msg-container");
    let div = document.createElement("div");

    div.innerHTML = `<h4>${user} joined the chat </h4>`;
    div.setAttribute("id", "chatBot");

    messageBody.appendChild(div);

    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
}