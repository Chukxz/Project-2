import { converts } from "../Supporting/Conversion.js";

class DragResize {
    dragElement(element, elmnt, Radius, image, CanvWidth) {
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0,
            value = undefined,
            signX = 1,
            signY = 1,
            existX = 1,
            existY = 1,
            setposx,
            setposy;
        sessionStorage.setItem('boundaries', 'applicable');
        sessionStorage.setItem('curFunc', 'noFunc');
        sessionStorage.setItem('value', converts.convert(value))
        console.log(sessionStorage, Radius);
        if (document.getElementById(element.id + 'canvas')) {
            /* if present, the header is where you move the DIV from:*/
            document.getElementById(element.id + 'canvas').onmousedown = dragMouseDown;
        } else {
            /* otherwise, move the DIV from anywhere inside the DIV:*/
            element.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            sessionStorage.setItem('sx', converts.convert(pos3));
            sessionStorage.setItem('sy', converts.convert(pos4));
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            setposx = converts.toNum(sessionStorage.getItem('sx'));
            setposy = converts.toNum(sessionStorage.getItem('sy'));
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            //supporting variables:
            var canv = window.getComputedStyle(elmnt),
                wd = converts.toNumfromCSSSizes(canv.width),
                hg = converts.toNumfromCSSSizes(canv.height),
                X1plus = (element.offsetLeft + Radius),
                X1minus = (element.offsetLeft),
                Y1plus = (element.offsetTop + Radius),
                Y1minus = (element.offsetTop),
                X2plus = (element.offsetLeft + converts.toNum(elmnt.width)),
                X2minus = (element.offsetLeft + converts.toNum(elmnt.width) - Radius),
                Y2plus = (element.offsetTop + converts.toNum(elmnt.height)),
                Y2minus = (element.offsetTop + converts.toNum(elmnt.height) - Radius);


            //some conditions:
            if (sessionStorage.getItem('boundaries') == 'applicable') {
                if ((setposx >= X1minus) && (setposx <= X1plus)) {
                    if ((setposy >= Y1minus) && (setposy <= Y1plus)) {
                        value = 'A';

                    } else if ((setposy >= Y2minus) && (setposy <= Y2plus)) {
                        value = 'B';
                    } else {
                        value = 'i';
                    }
                }
                if ((setposx >= X2minus) && (setposx <= X2plus)) {
                    if ((setposy >= Y1minus) && (setposy <= Y1plus)) {
                        value = 'C';
                    } else if ((setposy >= Y2minus) && (setposy <= Y2plus)) {
                        value = 'D';
                    } else {
                        value = 'k';
                    }
                }
                if ((setposy >= Y1minus) && (setposy <= Y1plus)) {
                    if (!(((setposx >= X1minus) && (setposx <= X1plus)) || ((setposx >= X2minus) && (setposx <= X2plus)))) {
                        value = 'j';
                    }
                }
                if ((setposy >= Y2minus) && (setposy <= Y2plus)) {
                    if (!(((setposx >= X1minus) && (setposx <= X1plus)) || ((setposx >= X2minus) && (setposx <= X2plus)))) {
                        value = 'l';
                    }
                }
                sessionStorage.setItem('value', converts.convert(value))
            }

            if (pos3 > 0 && pos4 > 0) {
                if (value != undefined) {
                    sessionStorage.setItem('boundaries', 'non-applicable');
                    sessionStorage.setItem('curFunc', 'execResize');
                    execResize(elmnt, element, value);
                } else {
                    sessionStorage.setItem('curFunc', 'execDrag')
                    execDrag(element, elmnt)
                }
            }


            window.onclick = function() {
                // console.log(setposx, setposy, X1minus, X1plus, X2minus, X2plus, Y1minus, Y1plus, Y2minus, Y2plus)
            }

            function execDrag(element, elmnt) {
                // set the element's new position:
                element.style.top = (element.offsetTop - pos2) + "px";
                element.style.left = (element.offsetLeft - pos1) + "px";
                sessionStorage.setItem('boundaries', 'non-applicable');
                if (element.offsetLeft - 8 < 0) {
                    element.style.left = (element.offsetLeft + 8) + 'px';
                }
                if (element.offsetTop - 8 < 0) {
                    element.style.top = (element.offsetTop + 8) + 'px';
                }
                if (element.offsetLeft - 8 + elmnt.width > image.img.width) {
                    element.style.left = (image.img.width - 8 - elmnt.width + CanvWidth) + 'px';
                }
                if (element.offsetTop - 8 + elmnt.height > image.img.height) {
                    element.style.top = (image.img.height - 8 - elmnt.width + CanvWidth) + 'px';
                }
            }

            function execResize(elmnt, element, value) {
                if (value == 'B') {
                    signY = -1, existY = 0;
                }
                if (value == 'C') {
                    signX = -1, existX = 0;
                }
                if (value == 'D') {
                    signX = -1, existX = 0;
                    signY = -1, existY = 0;
                }
                if (value == 'i') {
                    existY = 0, signY = existY;
                }
                if (value == 'j') {
                    existX = 0, signX = existX;
                }
                if (value == 'k') {
                    signX = -1, existX = 0;
                    existY = 0, signY = existY;
                }
                if (value == 'l') {
                    existX = 0, signX = existX;
                    signY = -1, existY = 0;
                }
                elmnt.width = wd + (pos1 * signX);
                element.style.left = (element.offsetLeft - (pos1 * existX)) + 'px';
                elmnt.height = hg + (pos2 * signY);
                element.style.top = (element.offsetTop - (pos2 * existY)) + 'px';
                if (element.offsetLeft - 8 < 0) {
                    elmnt.width = wd;
                    element.style.left = (element.offsetLeft + 8) + 'px';
                }
                if (element.offsetTop - 8 < 0) {
                    elmnt.height = hg;
                    element.style.top = (element.offsetTop + 8) + 'px';
                }
                if (elmnt.width > image.img.width - CanvWidth - (element.offsetLeft - 8)) {
                    elmnt.width = wd;
                    element.style.left = (element.offsetLeft) + 'px';
                }
                if (elmnt.height > image.img.height - CanvWidth - (element.offsetTop - 8)) {
                    elmnt.height = hg;
                    element.style.top = (element.offsetTop) + 'px';
                }
            }
        }




        function closeDragElement() {
            sessionStorage.removeItem('sx');
            sessionStorage.removeItem('sy');
            /* stop moving when mouse button is Released:*/
            document.onmouseup = null;
            document.onmousemove = null;
            value = undefined;
            sessionStorage.setItem('boundaries', 'applicable');
            sessionStorage.setItem('curFunc', 'noFunc');
            signX = 1;
            signY = 1;
            existX = 1;
            existY = 1;
        }
    }


}

export { DragResize }