class DrawCanvas {

    drawCanvas(canvas, canvWidth, color, width, height, opacity) {
        canvas.style.borderStyle = 'solid';
        canvas.style.borderWidth = canvWidth;
        canvas.style.borderColor = color;
        canvas.style.opacity = opacity;
        canvas.width = width
        canvas.height = height
    }
}

let Drawcanvas = new DrawCanvas;

export { Drawcanvas };