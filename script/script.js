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
        save();
        loadImages();
    } else {
        if (getTheLastCategory(deliveredIndex) == 'favorites') {
            images[deliveredIndex]['category'].splice(images[deliveredIndex]['category'].length - 1, 1);
            document.getElementById('favorite-button').innerHTML = 'Zu Favoriten hinzufügen';
            save();
            loadImages();
            setCategoryViewer();
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
    }
}


function deleteImage() {
    images[deliveredIndex]['category'].push('trash');
}


function restoreImage(i) {
    images[deliveredIndex]['category'].splice(images[deliveredIndex]['category'].length - 1, 1);
}


function moveImage() {
    if (category == 'trash') {
        restoreImage();
    } else {
        deleteImage();
    }

    save();
    loadImages();
    setCategoryViewer();
    if (deliveredIndex != lastViewerIndex) {
        viewNextImage();
    } else {
        if (deliveredIndex != firstViewerIndex) {
            viewPreviousImage();
        } else {
            closeImage();
        }
    }
    // closeImage();
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

    setButtonDisabledIf(i);    // neu

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


function setButtonDisabledIf(i) {
    if (i == firstViewerIndex) {
        setButtonDisabled('previous-button');
    }
    if (i == lastViewerIndex) {
        setButtonDisabled('next-button');
    }
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
    setImageViewer();
    viewLeftImage(--deliveredIndex);
    if (deliveredIndex == lastViewerIndex) {
        setButtonDisabled('next-button');
    }
}


function viewNextImage() {
    // isThatNextImageTrash();
    // viewImage(++deliveredIndex);
    // enableButton('previous-button');
    setImageViewer();
    viewRightImage(++deliveredIndex);
    if (deliveredIndex == firstViewerIndex) {
        setButtonDisabled('previous-button');
    }
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


function setImageViewer() {
    setCategoryViewer();
    getFirstViewerIndex();
    getLastViewerIndex();
}