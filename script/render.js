// Rendering
// Variables
let category = 'photos';    // contains the current category (menu link's id)
let indexOfCategory = 0;    // contains the index of the requested category
let lastIndex = 0;    // contains the last index of an image's category
let categoryOfImage = 'photos';    // contains the requested category of an image
let deliveredIndex = 0;    // contains the index of the selected image

let images = [
    {
        'src': './img/agriculture.jpg',
        'alt': 'agricultere',
        'category': ['photos', 'bali']
    },
    {
        'src': './img/beach.jpg',
        'alt': 'beach',
        'category': ['photos', 'bali']
    },
    {
        'src': './img/child.jpg',
        'alt': 'child',
        'category': ['photos', 'bali']
    },
    {
        'src': './img/cliff.jpg',
        'alt': 'cliff',
        'category': ['photos', 'bali']
    },
    {
        'src': './img/culture.jpg',
        'alt': 'culture',
        'category': ['photos', 'bali']
    },
    {
        'src': './img/dance.jpg',
        'alt': 'dance',
        'category': ['photos', 'bali']
    },
    {
        'src': './img/gapura.jpg',
        'alt': 'gapura',
        'category': ['photos', 'bali']
    },
    {
        'src': './img/garuda.jpg',
        'alt': 'garuda',
        'category': ['photos', 'bali']
    },
    {
        'src': './img/mountain.jpg',
        'alt': 'mountain',
        'category': ['photos', 'bali']
    },
    {
        'src': './img/nature.jpg',
        'alt': 'nature',
        'category': ['photos', 'bali']
    },
    {
        'src': './img/night.jpg',
        'alt': 'night',
        'category': ['photos', 'bali']
    },
    {
        'src': './img/orange.jpg',
        'alt': 'orange',
        'category': ['photos', 'bali']
    },
    {
        'src': './img/pagoda.jpg',
        'alt': 'pagoda',
        'category': ['photos', 'bali']
    },
    {
        'src': './img/portrait.jpg',
        'alt': 'portrait',
        'category': ['photos', 'bali', 'favorites']
    },
    {
        'src': './img/sunset.jpg',
        'alt': 'sunset',
        'category': ['photos', 'bali']
    },
    {
        'src': './img/ubud.jpg',
        'alt': 'ubud',
        'category': ['photos', 'bali']
    },
    {
        'src': './img/woman.jpg',
        'alt': 'woman',
        'category': ['photos', 'bali', 'trash']
    },
    {
        'src': './img/alpine.jpg',
        'alt': 'alpine',
        'category': ['photos', 'austria']
    },
    {
        'src': './img/hut.jpg',
        'alt': 'hut',
        'category': ['photos', 'austria']
    },
    {
        'src': './img/alps.jpg',
        'alt': 'alps',
        'category': ['photos', 'austria']
    },
    {
        'src': './img/fog.jpg',
        'alt': 'fog',
        'category': ['photos', 'austria']
    },
    {
        'src': './img/flower.jpg',
        'alt': 'flower',
        'category': ['photos', 'austria', 'trash']
    },
    {
        'src': './img/lake.jpg',
        'alt': 'lake',
        'category': ['photos', 'austria']
    },
    {
        'src': './img/mountains.jpg',
        'alt': 'mountains',
        'category': ['photos', 'austria']
    },
    {
        'src': './img/muehlviertel.jpg',
        'alt': 'muehlviertel',
        'category': ['photos', 'austria']
    },
    {
        'src': './img/rough.jpg',
        'alt': 'rough',
        'category': ['photos', 'austria', 'favorites']
    },
    {
        'src': './img/trees.jpg',
        'alt': 'trees',
        'category': ['photos', 'austria']
    }
];    // contains 'src', 'alt' und 'category' of all loading images


// Fuunctions
load();    // loads all images




// setCategoryViewer();




function loadImages() {    // loads all images up to the 'photo-gallery'
    let photoGallery = document.getElementById('photo-gallery');    // contains the element 'photo-gallery'
    photoGallery.innerHTML = '';    // clears the 'photo-gallery'
    fillPhotoGallery(photoGallery);    // fills the 'photo-gallery'
}


function fillPhotoGallery(photoGallery) {    // fills the 'photo-gallery'
    for (let i = 0; i < images.length; i++) {
        setIndexOfCategory(i);
        setCategoryOfImage(i);
        writeCodeOfImage(photoGallery, i);
    }
}


function setIndexOfCategory(i) {    // sets the index of the requested category of the image i
    getLastIndex(i);
    setIndex(i);
    save();
}


function getLastIndex(i) {    // provides the last index of the category for the image i
    lastIndex = images[i]['category'].length - 1;
}


function setIndex(i) {    // sets a valid index of category for the image i
    if (images[i]['category'][lastIndex] == 'trash') {
        indexOfCategory = lastIndex;
    } else {
        setRequestedIndex();
    }
}


function setRequestedIndex() {    // provides the requested index of category for the image i
    if (category == 'trash' || category == 'favorites') {
        indexOfCategory = lastIndex;
    } else {
        if (category == 'bali' || category == 'austria') {
            indexOfCategory = 1;
        } else {
            indexOfCategory = 0;
        }
    }
}


function setCategoryOfImage(i) {    // sets the requested category of the image i
    categoryOfImage = images[i]['category'][indexOfCategory];
}


function writeCodeOfImage(photoGallery, i) {    // writes the HTML code of the image i
    if (categoryOfImage == category) {
        photoGallery.innerHTML += `
            <img id="img-${i}" src="${images[i]['src']}" alt="${images[i]['alt']}" class="image-box" onclick="viewImage(${i})">
        `;
    }
}


function save() {    // saves the JSON array's content as a String at the local storage
    let imagesAsText = JSON.stringify(images);
    localStorage.setItem('images', imagesAsText);
}


function load() {    // loads the JSON array's content via a String from the local storage 
    let imagesAsText = localStorage.getItem('images');
    if (imagesAsText) {
        images = JSON.parse(imagesAsText);
    }
}


function showCategory(id) {    // shows the images of the requested category
    category = id;
    colorLink(id);
    hideFavoriteButtonIf();
    setImageViewer();
    return loadImages();
}


function hideFavoriteButtonIf() {    // hides the 'favorite-button', if the category is 'trash'
    if (category == 'trash') {
        addDisplayNone('favorite-button');
    } else {
        removeDisplayNone('favorite-button');
    }
}