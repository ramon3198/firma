const canvas = document.querySelector("#draw-canvas");
const context = canvas.getContext("2d");
const clear = document.querySelector("#clear")
const firmar = document.querySelector("#firmar")

let initialX;
let initialY;

const dibujar = (cursorX, cursorY)=> {
  context.beginPath();
  context.moveTo(initialX, initialY);
  context.lineWidth = 2;
  context.strokeStyle = "#000";
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineTo(cursorX, cursorY);
  context.stroke();

  initialX = cursorX;
  initialY = cursorY;
};

const mouseDown = (e)=> {
  initialX = e.offsetX;
  initialY = e.offsetY;
  dibujar(initialX, initialY);
  canvas.addEventListener("mousemove", mouseMoving);
};

const mouseMoving = (e)=> {
  dibujar(e.offsetX, e.offsetY);
};

const mouseUp = ()=> {
  canvas.removeEventListener("mousemove", mouseMoving);
};

const clearCanvas = ()=> {
    canvas.width =  canvas.width;
}

const touchMove = (e)=>{
    e.preventDefault(); 
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

const base64 = ()=> {
    const img = document.querySelector("#img")
    const dataUrl = canvas.toDataURL();

    let formData = new FormData();
    formData.append("base64", dataUrl);

    fetch('http://localhost/prueba', {
        method: "POST",
        body: formData
    })

    img.setAttribute("src", dataUrl);
    console.log(dataUrl);
}

canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mouseup", mouseUp);
canvas.addEventListener("touchend", mouseUp);
canvas.addEventListener("touchstart", mouseDown);
canvas.addEventListener("touchmove", touchMove);
firmar.addEventListener("click", base64);
clear.addEventListener("click", clearCanvas);

