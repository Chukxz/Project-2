var image = document.getElementById('myimg'),
    parentdiv = document.getElementById('secdiv'),
    overaldesc = document.getElementById('overaldesc')

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
        //You can use this method to get files and perform respective operations
        // let files = Array.from(input.files);
        // console.log(files)
        image.src = URL.createObjectURL(event.target.files[0]);
    };
    input.click();
}

console.log(image.offsetLeft, image.offsetTop)