const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const clearCanvas = document.getElementById('clearCanvas');
const saveImage = document.getElementById('saveImage');

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.7;
ctx.lineCap = 'round';
ctx.strokeStyle = colorPicker.value;
ctx.lineWidth = brushSize.value;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!isDrawing) return;
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = brushSize.value;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function clearCanvasContent() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadImage() {
    const link = document.createElement('a');
    link.download = 'rysunek.png';
    link.href = canvas.toDataURL();
    link.click();
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
clearCanvas.addEventListener('click', clearCanvasContent);
saveImage.addEventListener('click', downloadImage);
