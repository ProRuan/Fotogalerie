





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


function getTheFirstCategory(i) {
    let firstCategory = images[i]['category'][0];
    return firstCategory;
}


function getTheSecondCategory(i) {
    let secondCategory = images[i]['category'][1];
    return secondCategory;
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