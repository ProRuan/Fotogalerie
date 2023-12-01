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
    setCategoryViewer();
    getFirstViewerIndex();
    getLastViewerIndex();
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
        document.getElementById('favorite-button').innerHTML = 'zu Favoriten hinzugefügt';

        save();
        loadImages();
        // closeImage();
    }
}


function removeFromFavorites() {
    images[deliveredIndex]['category'].splice(images[deliveredIndex]['category'].length - 1, 1);

    save();
    loadImages();
    // closeImage();
}


function setFavorites() {
    if (category == 'photos' || category == 'bali' || category == 'austria') {
        addToFavorites();
    } else {
        removeFromFavorites();
    }
}


function setFavorite() {
    if (getTheLastCategory(deliveredIndex) != 'favorites' && getTheLastCategory(deliveredIndex) != 'trash') {
        images[deliveredIndex]['category'].push('favorites');
        document.getElementById('favorite-button').innerHTML = 'Von Favoriten entfernen';
    } else {
        if (getTheLastCategory(deliveredIndex) == 'favorites') {
            images[deliveredIndex]['category'].splice(images[deliveredIndex]['category'].length - 1, 1);
            document.getElementById('favorite-button').innerHTML = 'Zu Favoriten hinzufügen';
        }
    }

    save();
    loadImages();
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


function setPreviousButton() {
    if (deliveredIndex == 0) {
        setButtonDisabled('previous-button');
    }
}


function setNextButton() {
    if (deliveredIndex == images.length - 1) {
        setButtonDisabled('next-button');
    }
}


function viewImage(i) {
    addOverflowYHidden('body');
    removeDisplayNone('image-viewer');
    showImage(i);
    deliveredIndex = i;

    setFavoriteButton();    // funktioniert nicht!!!
    setDeleteButton();    // funktioniert nicht!!!
}


function closeImage() {
    addDisplayNone('image-viewer');
    removeOverflowYhidden('body');
    enableButton('previous-button');
    enableButton('next-button');
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
        document.getElementById('favorite-button').innerHTML = 'von Favoriten entfernen';
    } else {
        document.getElementById('favorite-button').innerHTML = 'zu Favoriten hinzufügen';
    }
}


function isThisTrash() {
    if (getTheLastCategory(deliveredIndex) == 'trash') {
        return true;
    } else {
        return false;
    }
}


function setDeleteButton() {
    if (isThisTrash()) {
        document.getElementById('delete-button').innerHTML = 'Wiederherstellen';
    } else {
        document.getElementById('delete-button').innerHTML = 'Löschen';
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
    // isThatPreviousImageTrash();
    // viewImage(--deliveredIndex);
    // enableButton('next-button');
    viewLeftImage(--deliveredIndex);
}


function viewNextImage() {
    // isThatNextImageTrash();
    // viewImage(++deliveredIndex);
    // enableButton('previous-button');
    viewRightImage(++deliveredIndex);
}


function setCategoryViewer() {
    for (let i = 0; i < images.length; i++) {
        setIndexOfCategory(i);
    if (images[i]['category'][indexOfCategory] == category) {
        images[i]['viewer'] = 'enabled';
    } else {
        images[i]['viewer'] = 'disabled';
    }
    }
}


function isViewerEnabled(i) {
    if (images[i]['viewer'] == 'enabled') {
        return true;
    } else {
        return false;
    }
}


function viewLeftImage(i) {
    if (isViewerEnabled(i)) {
        viewImage(i);
        enableButton('next-button');
        if (i == firstViewerIndex) {
            setButtonDisabled('previous-button');
        }
    } else {
        viewPreviousImage(--i);
    }
}


function viewRightImage(i) {
    if (isViewerEnabled(i)) {
        viewImage(i);
        enableButton('previous-button');
        if (i == lastViewerIndex) {
            setButtonDisabled('next-button');
        }
    } else {
        viewNextImage(++i);
    }
}


let firstViewerIndex = -1;

function getFirstViewerIndex() {
    for (let i = images.length - 1; i > -1; i--) {
        if (images[i]['viewer'] == 'enabled') {
            firstViewerIndex = i;
        }
    }
}


let lastViewerIndex = -1;

function getLastViewerIndex() {
    for (let i = 0; i < images.length; i++) {
        if (images[i]['viewer'] == 'enabled') {
            lastViewerIndex = i;
        }
    }
}