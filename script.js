let activeLink = 'photos';
let menuLinks = ['photos', 'favorites', 'bali', 'austria', 'trash'];


function decolorLink() {    // decolor current menu link
    for (let i = 0; i < menuLinks.length; i++) {
        document.getElementById(menuLinks[i]).classList.remove('menu-link-active');
    }
}


function colorLink(id) {    // color current menu link
    activeLink = id;
    decolorLink();
    document.getElementById(activeLink).classList.add('menu-link-active');
}






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
        'category': ['photos', 'austria']
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
];

let category = 'photos';
let indexOfCategory = 0;
let deliveredIndex = 0;


load();

function loadImages() {
    let photoGallery = document.getElementById('photo-gallery');
    photoGallery.innerHTML = '';

    for (let i = 0; i < images.length; i++) {
        setIndexOfCategory(i);
        if (images[i]['category'][indexOfCategory] == category) {
            photoGallery.innerHTML += `
                <img id="img-${i}" src="${images[i]['src']}" alt="${images[i]['alt']}" class="image-box" onclick="viewImage(${i})">
            `;
        }
    }
}


function showCategory(id) {
    category = id;
    colorLink(id);
    return loadImages();
}


function setIndexOfCategory(i) {
    let lastIndex = images[i]['category'].length - 1;
    if (images[i]['category'][lastIndex] == 'trash') {
        indexOfCategory = lastIndex;
    } else {
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
    return save();
}


function save() {
    let imagesAsText = JSON.stringify(images);
    localStorage.setItem('images', imagesAsText);
}


function load() {
    let imagesAsText = localStorage.getItem('images');
    if (imagesAsText) {
        images = JSON.parse(imagesAsText);
    }
}


function addToFavorites() {
    if (images[deliveredIndex]['category'][2] == 'favorites') {
        document.getElementById('favorite-button').innerHTML = 'Schon als Favorit festgelegt';
    } else {
        images[deliveredIndex]['category'].push('favorites');

        save();
        loadImages();
        closeImage();
    }
}


function removeFromFavorites() {
    images[deliveredIndex]['category'].splice(images[deliveredIndex]['category'].length - 1, 1);

    save();
    loadImages();
    closeImage();
}


function setFavorites() {
    if (category == 'photos' || category == 'bali' || category == 'austria') {
        addToFavorites();
    } else {
        removeFromFavorites();
    }
}


function deleteImage() {
    images[deliveredIndex]['category'].push('trash');

    save();
    loadImages();
    closeImage();
}


function restoreImage(i) {
    images[deliveredIndex]['category'].splice(images[deliveredIndex]['category'].length - 1, 1);

    save();
    loadImages();
    closeImage();
}


function moveImage() {
    if (category == 'trash') {
        restoreImage();
    } else {
        deleteImage();
    }

    closeImage();
    save();
    loadImages();
}


// function ifCategoryIsTrash() {
//     if (category == 'trash') {
//         return true;
//     } else {
//         return false;
//     }
// }


function removeDisplayNone(id) {
    document.getElementById(id).classList.remove('display-none');
}


function addDisplayNone(id) {
    document.getElementById(id).classList.add('display-none');
}


function addOverflowYHidden(id) {
    document.getElementById(id).classList.add('overflowY-hidden');
}


function removeOverflowYhidden(id) {
    document.getElementById(id).classList.remove('overflowY-hidden');
}


function showImage(i) {
    let element = document.getElementById('image-viewer-content');
    element.innerHTML = `
        <img id="img-${i}" src="${images[i]['src']}" alt="${images[i]['alt']}" class="image-viewer-content" onclick="viewImage(${i})">
    `;
}


function viewImage(i) {
    addOverflowYHidden('body');
    removeDisplayNone('image-viewer');
    showImage(i);
    deliveredIndex = i;
}


function closeImage() {
    addDisplayNone('image-viewer');
    removeOverflowYhidden('body');
}


function getTheFirstCategory(i) {
    let firstCategory = images[i]['category'][0];
    return firstCategory;
}


function getTheSecondCategory(i) {
    let secondCategory = images[i]['category'][1];
    return secondCategory;
}


function getTheLastCategory(i) {
    let lastCategory = images[i]['category'][images[i]['category'].length - 1];
    return lastCategory;
}


function isThisAFavorite() {
    if (getTheLastCategory(deliveredIndex) == 'favorites') {
        return true;
    } else {
        return false;
    }
}


function setFavoriteButton() {
    if (isThisAFavorite()) {
        document.getElementById('favorite-button').innerHTML = 'zu Favoriten hinzugefügt';
    }
}


function setButtonDisabled(id) {
    document.getElementById(id).disabled = true;
}


function setButtonenabled(id) {
    document.getElementById(id).disabled = false;
}


function isButtonDisabled(id) {
    return document.getElementById(id).disabled;
}


function enableButton(id) {
    if (isButtonDisabled(id)) {
        setButtonenabled(id);
    }
}


function isThatPreviousImageTrash() {
    if (deliveredIndex - 1 > 0) {
        if (getTheLastCategory(deliveredIndex - 1) == 'trash') {
            deliveredIndex--;
            isThatPreviousImageTrash();
        }
    } else {
        setButtonDisabled('previous-button');
    }
}


function isThatNextImageTrash() {
    if (deliveredIndex + 1 < images.length - 1) {
        if (getTheLastCategory(deliveredIndex + 1) == 'trash') {
            deliveredIndex++;
            isThatNextImageTrash();
        }
    } else {
        setButtonDisabled('next-button');
    }
}


function viewPreviousImage() {
    isThatPreviousImageTrash();
    viewImage(--deliveredIndex);
    enableButton('next-button');
}


function viewNextImage() {
    isThatNextImageTrash();
    viewImage(++deliveredIndex);
    enableButton('previous-button');
}


// render image-viewer