function createBox() {
    let stickyPad = document.createElement("div");
    let navBar = document.createElement("div");
    let close = document.createElement("div");
    let minimize = document.createElement("div");
    let textbox = document.createElement("div");

    let closeImg = document.createElement("img");
    closeImg.setAttribute("src","./Images/close.svg");
    close.appendChild(closeImg);

    let minimizeImg = document.createElement("img");
    minimizeImg.setAttribute("src","./Images/minimize.svg");
    minimize.appendChild(minimizeImg);
    // add the classse

    stickyPad.setAttribute("class", "stickyPad");
    navBar.setAttribute("class", "nav-bar");
    close.setAttribute("class", "close");
    minimize.setAttribute("class", "minimize");
    textbox.setAttribute("class", "textbox");

    // create subtree
    stickyPad.appendChild(navBar);
    stickyPad.appendChild(textbox);
    navBar.appendChild(minimize);
    navBar.appendChild(close);

    // add subtree to page
    document.body.appendChild(stickyPad);

    // close -> remove the stickypad
    close.addEventListener("click", function () {
        stickyPad.remove();
    })

    let isOpen = true;

    minimize.addEventListener("click", function () {
        let height ;
        if (isOpen) {
            height = stickyPad.style.height;

            textbox.style.display = "none";
            stickyPad.style.boxShadow = "none";
            stickyPad.style.minHeight = "0px";
            stickyPad.style.height = "20px";

        } else {
            textbox.style.display = "block";
            stickyPad.style.height = "calc(stickyPad.style.height - 20rem)";
            stickyPad.style.minHeight  = "10rem";
            stickyPad.style.boxShadow =  "-2px 3px 25px -7px rgba(0,0,0,0.75)";
            stickyPad.style.height = height;
        }

        isOpen = !isOpen;
    })


    navBar.addEventListener("mousedown", function () {
        $(this.parentNode).draggable();
        $(this.parentNode).droppable();


    })

    $(".stickyPad").click(function (event) {
        let clicked = $(this);
        
        $(this).resizable({
            animate: true
        });
    });

    return textbox;
}