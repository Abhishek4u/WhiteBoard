let imgInput = document.querySelector("#acceptImg");

function uploadFile() {

    imgInput.click();

    imgInput.addEventListener("change", function () {

        let imgObj = imgInput.files[0];

        // img -> link
        let imgLink = URL.createObjectURL(imgObj);
        let textBox = createBox();
        let img = document.createElement("img");
        img.setAttribute("class", "upload-img");
        img.src = imgLink;

        textBox.appendChild(img);
    })
}

function downloadBoard() {
    // create an anchor

    let a = document.createElement("a");

    // set fileName to its download attribute
    a.download = "file.png";

    // conver board to url
    let url = board.toDataURL("image/png;base64");
    // set as href of anchor
    a.href = url;
    // click the anchor
    a.click();
    // reload behaviour does not ge triggered
    a.remove
}