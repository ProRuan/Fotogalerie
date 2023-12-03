// image-viewer
// Functions
function removeDisplayNone(id) {    // removes display:none from an element
    document.getElementById(id).classList.remove('display-none');
}


function addDisplayNone(id) {    // adds display:none to an elements
    document.getElementById(id).classList.add('display-none');
}


function addOverflowYHidden(id) {    // adds overflow-y:hidden to an element
    document.getElementById(id).classList.add('overflowY-hidden');
}


function removeOverflowYhidden(id) {    // removes overflow-y:hidden from an element
    document.getElementById(id).classList.remove('overflowY-hidden');
}


function showImage(i) {    // provides the image's code for the 'image-viewer'
    let element = document.getElementById('image-viewer-content');
    element.innerHTML = `
        <img id="img-${i}" src="${images[i]['src']}" alt="${images[i]['alt']}" class="image-viewer-content" onclick="viewImage(${i})">
    `;
}


function setButtonDisabledIf(i) {    // sets a navigation button disabled, if the index is at the limit
    if (i == firstViewerIndex) {
        setButtonDisabled('previous-button');
    }
    if (i == lastViewerIndex) {
        setButtonDisabled('next-button');
    }
}


function getTheLastCategory(i) {    // provides the last category of the image i
    let lastCategory = images[i]['category'][images[i]['category'].length - 1];
    return lastCategory;
}


function isThisAFavorite() {    // returns true, if the image's last category is 'favorites'
    if (getTheLastCategory(deliveredIndex) == 'favorites') {
        return true;
    } else {
        return false;
    }
}


function setFavoriteButton() {    // provides the appropriate text for the image's favorite state
    if (isThisAFavorite()) {
        document.getElementById('favorite-button').innerHTML = 'von Favoriten entfernen';
    } else {
        document.getElementById('favorite-button').innerHTML = 'zu Favoriten hinzufügen';
    }
}


function isThisTrash() {    // returns true, if the image's last category is 'trash'
    if (getTheLastCategory(deliveredIndex) == 'trash') {
        return true;
    } else {
        return false;
    }
}


function setDeleteButton() {    // provides the appropriate text for the image's trash state
    if (isThisTrash()) {
        document.getElementById('delete-button').innerHTML = 'Wiederherstellen';
    } else {
        document.getElementById('delete-button').innerHTML = 'Löschen';
    }
}


function viewImage(i) {    // shows the selected image i
    addOverflowYHidden('body');
    removeDisplayNone('image-viewer');
    showImage(i);
    deliveredIndex = i;
    setButtonDisabledIf(i);
    setFavoriteButton();
    setDeleteButton();
}


function setButtonDisabled(id) {    // disables a button
    document.getElementById(id).disabled = true;
}


function setButtonenabled(id) {    // enables a button
    document.getElementById(id).disabled = false;
}


function isButtonDisabled(id) {    // provides the disabled state of a button
    return document.getElementById(id).disabled;
}


function enableButton(id) {    // enables a button, if it is disabled
    if (isButtonDisabled(id)) {
        setButtonenabled(id);
    }
}


function closeImage() {    // closes the 'image-viewer'
    addDisplayNone('image-viewer');
    removeOverflowYhidden('body');
    enableButton('previous-button');
    enableButton('next-button');
}


function setFavorite() {    // sets favorite state depending on the current category
    if (isNotAFavorite() && isNotTrash()) {
        pushAFavorite();    // adds the image to 'favorites'
        processChanges();    // processes changes
    } else {
        if (isThisAFavorite()) {
            spliceAFavorite();    // removes the images from 'favorites'
            processChangesShowNextFavorite();    // processes changes and shows next favorite
        }
    }
}


function isNotAFavorite() {    // returns true, if this image is not part of 'favorites'
    if (getTheLastCategory(deliveredIndex) != 'favorites') {
        return true;
    } else {
        return false;
    }
}


function isNotTrash() {    // returns true, if this image is not 'trash'
    if (getTheLastCategory(deliveredIndex) != 'trash') {
        return true;
    } else {
        return false;
    }
}


function pushAFavorite() {    // adds a new favorite and adjusts the 'favorite-button'
    images[deliveredIndex]['category'].push('favorites');
    document.getElementById('favorite-button').innerHTML = 'Von Favoriten entfernen';
}


function spliceAFavorite() {    // removes a favorite and adjusts the 'favorite-button'
    images[deliveredIndex]['category'].splice(images[deliveredIndex]['category'].length - 1, 1);
    document.getElementById('favorite-button').innerHTML = 'Zu Favoriten hinzufügen';
}


function processChanges() {    // saves changes, reloads images and sets the 'image-viewer'
    save();
    loadImages();
    setImageViewer();
}


function processChangesShowNextFavorite() {    // saves changes, reloads images, shows the next favorite iamge and sets the 'image-viewer'
    save();
    loadImages();
    showNextFavorite();
    setImageViewer();
}


function showNextFavorite() {    // shows the next favorite image
    if (category == 'favorites') {
        if (deliveredIndex != lastViewerIndex) {
            viewNextImage();
        } else {
            if (deliveredIndex != firstViewerIndex) {
                viewPreviousImage();
            } else {
                closeImage();
            }
        }
    }
}


function deleteImage() {    // deletes the image
    images[deliveredIndex]['category'].push('trash');
}


function restoreImage(i) {    // restore the image
    images[deliveredIndex]['category'].splice(images[deliveredIndex]['category'].length - 1, 1);
}


function moveImage() {    // moves the image
    if (category == 'trash') {
        restoreImage();    
    } else {
        deleteImage();    
    }
    processesMovingOfImage();
}


function processesMovingOfImage() {
    save();
    loadImages();
    showNext();
    setImageViewer();
}


function showNext() {
    if (deliveredIndex != lastViewerIndex) {
        viewNextImage();
    } else {
        if (deliveredIndex != firstViewerIndex) {
            viewPreviousImage();
        } else {
            closeImage();
        }
    }
}