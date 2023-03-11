var image = document.getElementById('myimg'),
    parentdiv = document.getElementById('secdiv'),
    overaldesc = document.getElementById('overaldesc')

var images = [];
var left = document.getElementById("left");
var right = document.getElementById("right");

// if (image.width < window.innerWidth) {
//     parentdiv.style.marginLeft = (window.innerWidth - image.width - parentdiv.offsetLeft) / 2 + 'px'
// }
// overaldesc.style.marginLeft = (image.width - 148) / 2 + 'px'

function importData() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.jpeg, .jpg, .png, .webp'
    input.multiple = true
    input.onchange = function(event) {
        // You can use this method to get files and perform respective operations
        let files = Array.from(input.files);
        for (i = 0; i < files.length; i++) {
            images[i] = URL.createObjectURL(files[i]);
        }
        image.src = URL.createObjectURL(files[0]);
        return images;
    };
    input.click();
    var num = 0;
    right.onclick = function() {
        num++;
        if (num >= images.length) {
            num = 0;
        }
        image.src = images[num];
    }

    left.onclick = function() {
        num--
        if (num < 0) {
            num = images.length - 1;
        }
        image.src = images[num];
    }
}