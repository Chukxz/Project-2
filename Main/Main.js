import { converts } from "../Supporting/Conversion.js";
import { drawlines } from "../Boxes/Lines.js";
import { Drawcanvas } from "../Boxes/Canvas.js";
import { DragResize } from "./Drag.js";

window.onload = function() {
    sessionStorage.clear()
    var body = document.getElementById('body'), //0
        canvas = document.getElementById('maindivcanvas'), //1
        ctx = canvas.getContext('2d'), //2
        para = document.getElementById("para"), //3
        para2 = document.getElementById('para2'), //4
        para3 = document.getElementById('para3'), //5
        pass = document.getElementById('pass'), //6
        Root = document.querySelector(':root'), //7
        time = 3000, //8
        CanvWidth = 1;
    const canvWidth = `${CanvWidth}px`; // 
    var CanvWidth = CanvWidth * 2,
        lineWidth = 1, //11
        maindiv = document.getElementById('maindiv'),
        Radius = 4,
        R = 128,
        G = 128,
        B = 128,
        cols = [Math.abs(R - 128), Math.abs(G), Math.abs(B)],
        prgb = `rgba(${cols[0]},${cols[1]},${cols[2]})`,
        color = prgb,
        opacity = 100,
        List,
        colorsliders = document.getElementById("colorsliders"),
        range1 = document.getElementById('range1'),
        label1 = document.getElementById('label1'),
        width = converts.convert(200),
        height = converts.convert(200),
        flexs = document.getElementById('flex2'),
        td = document.getElementById('thisdiv'),
        spec = document.getElementById('spec'),
        range2 = document.getElementById('range2'),
        inputs = document.getElementById('inputs'),
        ranges = document.querySelectorAll('.ranges'),
        imgwidth = document.querySelector('#imgwidth'),
        imgheight = document.querySelector('#imgheight'),
        canvwt = document.querySelector('#canvaswidth'),
        canvht = document.querySelector('#canvasheight'),
        num = 10;

    Root.style.backgroundColor = `rgb(${R},${G},${B})`;
    ranges[0].style.backgroundColor = prgb;
    ranges[1].style.backgroundColor = prgb;
    console.log(Root.style.backgroundColor)

    var image = {
        overaldesc: document.getElementById('overaldesc'),
        secdiv: document.getElementById('secdiv'),
        img: document.getElementById('myimg')
    }

    image.img.width = 400
    image.img.height = 400
        //content, divcolor, divcolor2, divcolor3, top, left, width, height, padTopp, padBott, padTop, padBot



    List = [body, canvas, ctx, para, para2, para3, pass, //0 - 6
        Root, time, color, canvWidth, lineWidth, Radius //7 - 12
    ];


    function ArrangeCanvas(canvas, ctx, color, canvWidth, lineWidth, num, width, height, opacity) {
        Drawcanvas.drawCanvas(canvas, canvWidth, color, width, height, opacity);
        drawlines.drawLines(num, ctx, canvas, color, lineWidth, Radius);
        canvwt.value = canvas.width;
        canvht.value = canvas.height
    }

    let dragResize = new DragResize;
    dragResize.dragElement(maindiv, canvas, Radius, image, CanvWidth);
    ArrangeCanvas(List[1], List[2], List[9], List[10], List[11], num, width, height);


    label1.innerHTML = opacity / 100;
    spec.innerHTML = num;
    range1.value = opacity;
    range2.value = num;

    range1.oninput = function() {
        label1.innerHTML = range1.value / 100;
        opacity = range1.value / 100;
    }
    inputs.oninput = function() {
        color = inputs.value
    }

    colorsliders.oninput = function() {
        ArrangeCanvas(List[1], List[2], color, List[10], List[11], num, canvas.width, canvas.height, opacity)
    }

    range2.oninput = function() {
            num = range2.value;
            spec.innerHTML = range2.value;
        }
        // fl.style.left = (fl.offsetLeft + 100) + 'px';
    td.style.left = (window.innerWidth - (window.innerWidth / 3.5)) + 'px';
    td.style.top = ((window.innerHeight / 3)) + 'px';
    flexs.style.top = (flexs.offsetTop + 80) + 'px';
    flexs.style.left = (window.innerWidth - (window.innerWidth / 3)) + 'px';
    colorsliders.style.marginTop = `${(window.innerHeight - (window.innerHeight / 5))}` + 'px';

    console.log(colorsliders.style.marginTop);
    console.log(colorsliders.style);

    window.onmouseup = function() { ArrangeCanvas(List[1], List[2], color, List[10], List[11], num, canvas.width, canvas.height); }


    window.onresize = function() {
        console.log(window.innerWidth, window.innerHeight, window.outerWidth, window.outerHeight);
        td.style.left = (window.innerWidth - (window.innerWidth / 3.5)) + 'px';
        flexs.style.left = (window.innerWidth - (window.innerWidth / 3)) + 'px';
        colorsliders.style.marginTop = `${(window.innerHeight - (window.innerHeight / 5))}` + 'px';

    }

    window.onclick = function(e) {
        // let x = e.clientX;
        // let y = e.clientY;
        // console.log(x,y)
        // console.log(document.elementFromPoint(x, y))
        // console.log(document.elementsFromPoint(x, y))
        // }
    }

    imgwidth.value = image.img.width;
    imgheight.value = image.img.height;
    imgwidth.oninput = function() {
        image.img.width = imgwidth.value;
        if (canvas.width >= imgwidth.value - CanvWidth) {
            ArrangeCanvas(List[1], List[2], List[9], List[10], List[11], num, image.img.width, image.img.height);
        }

    };
    imgheight.oninput = function() {
        image.img.height = imgheight.value;
        if (canvas.height >= imgheight.value - CanvWidth) {
            ArrangeCanvas(List[1], List[2], List[9], List[10], List[11], num, image.img.width, image.img.height);
        }
    };

    canvwt.oninput = function() {
        if (canvwt.value <= image.img.width - CanvWidth) {
            canvas.width = canvwt.value;
            ArrangeCanvas(List[1], List[2], List[9], List[10], List[11], num, canvas.width, canvas.height);
            if (canvas.width + maindiv.offsetLeft + 8 > image.img.width) {
                maindiv.style.left = ((canvas.width + maindiv.offsetLeft + 8) - (image.img.width)) + 'px';
            }
        }
    }
    canvht.oninput = function() {
            if (canvht.value <= image.img.height - CanvWidth) {
                canvas.height = canvht.value;
                ArrangeCanvas(List[1], List[2], List[9], List[10], List[11], num, canvas.width, canvas.height);
                if (canvas.height + maindiv.offsetTop + 8 > image.img.height) {
                    maindiv.style.top = ((canvas.width + maindiv.offsetTop + 8) - (image.img.height)) + 'px';
                }
            }
        }
        // window.addEventListener('keydown', (e) => { if (e.shiftKey == false && e.ctrlKey == false && e.altKey == false && e.code == "Enter") { console.log(e.key) } })
}