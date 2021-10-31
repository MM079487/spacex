
window.addEventListener('load', () => {
    var canvas = document.querySelector('#canvas')
    var ctx = canvas.getContext("2d");
    var line = 10;
    
    
    const clearButton = document.querySelector('#clear')
    const redButton = document.querySelector("#red")
    const blueButton = document.querySelector("#blue")
    const yellowButton = document.querySelector("#yellow")
    const greenButton = document.querySelector("#green")
    const whiteButton = document.querySelector('#white')
    const eraserButton = document.querySelector('#eraser')
    const strokeInput = document.querySelector('#strokeInput')
    
    canvas.height = innerHeight - 120;
    canvas.width = innerWidth ;
    
    
    let painting = false

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    }

    function startPosition(e){
        painting = true;
        draw(e)
    }

    let color = 'white';
    
    function red(){
        color = 'red';
        canvas.style.cursor='cell';
    }

    function blue(){
        color = 'blue';
        canvas.style.cursor='cell';
    }

    function yellow(){
        color = 'yellow';
        canvas.style.cursor='cell';
    }

    function green(){
        color = 'green';
        canvas.style.cursor='cell';
    }

    function white(){
        color = 'white';
        canvas.style.cursor='cell';
    }

    function eraser(){
        color='black';
        canvas.style.cursor="url('data:image/x-icon;base64,AAACAAEAICACAAIADwAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAgAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAA66TnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHgAAAB6AAAAAwAAAD2AAAAewAAAD2AAAAewAAAD0AAAAeAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////////////////////////////////////////////////////////////////////////////8D////Af///wD///8Af///gD///8Af///gD///8Af///gH///8B////gf///8H///////////////////////8='), auto";
    }

    function finishPosition(){
        painting = false;
        ctx.beginPath();
    }

    function draw(e){
        var pos = getMousePos(canvas, e)
        if(!painting) return;
        ctx.lineWidth = line;
        ctx.lineCap = "round";

        ctx.strokeStyle = color;
        ctx.lineTo(pos.x, pos.y, 4, 4);
        ctx.stroke();
    }

    function clear(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.cursor='cell';
    }

    function stroke(){
        line = strokeInput.value
    }

    strokeInput.addEventListener('keypress', event => {
        if (event.keyCode == 13) {
            stroke()
            alert('set stroke to: ' + line)
        }
      })


    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishPosition);
    canvas.addEventListener('mousemove', draw);
    clearButton.addEventListener('mousedown', clear)
    redButton.addEventListener('mousedown', red)
    blueButton.addEventListener('mousedown', blue)
    yellowButton.addEventListener('mousedown', yellow)
    greenButton.addEventListener('mousedown', green)
    whiteButton.addEventListener('mousedown', white)
    eraserButton.addEventListener('mousedown', eraser)
})

window.addEventListener('resize', () => {
    const canvas = document.querySelector('#canvas')
    canvas.height = 950;
    canvas.width = 950;
})