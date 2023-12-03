// Menu Bar
// Variables
let menuActive = false;    // true - if the flip menu is opened
let activeLink = 'photos';    // contains the current link's id
let menuLinks = ['photos', 'favorites', 'bali', 'austria', 'trash'];    // contains the available menu links (categories)
let elements = [];    // auxiliary variable


// Functions
function highlightMenuLink() {    // adds the color to the current menu link on fliping out the menu
    document.getElementById(activeLink).classList.add('highlighted');
}


function unhighlightMenuLink() {    // remove the color of the current menu link on fliping in the menu
    for (let i = 0; i < menuLinks.length; i++) {
        document.getElementById(menuLinks[i]).classList.remove('highlighted');
    }
}


function activateMenuBar() {    // provides the current link with the class for the same-named hover
    document.getElementById('menu-bar').classList.add('menu-bar-active');
}


function deactivateMenuBar() {    // removes the class for the same-named hover of the current link
    document.getElementById('menu-bar').classList.remove('menu-bar-active');
}


function flipOutMenu() {    // flips out the menu
    activateMenuBar();
    menuActive = true;
}


function flipInMenu() {    // flips in the menu
    deactivateMenuBar();
    menuActive = false;
}


function colorMenuButton() {    // colors the menu button
    document.getElementById('menu-container').classList.add('menu-container-active');
}


function decolorMenuButton() {    // decolors the menu button
    document.getElementById('menu-container').classList.remove('menu-container-active');
}


function flipInMenuIf() {    // switches the state of the flip menu provided that the flip menu is still active
    if (menuActive == true) {    // no effect as long as the flip menu is opened
        return;
    } else {    // provides the settings for fliping in the menu
        decolorMenuButton();
        return flipInMenu();
    }
}


function flipMenu() {    // switches the state of the flip menu
    if (menuActive == false) {    // opens the flip menu
        colorMenuButton();
        flipOutMenu();
    } else {    // closes the flip menu
        decolorMenuButton();
        flipInMenu();
    }
}


function decolorLink() {    // decolors current menu link
    for (let i = 0; i < menuLinks.length; i++) {
        document.getElementById(menuLinks[i]).classList.remove('menu-link-active');
    }
}


function colorLink(id) {    // colors current menu link
    activeLink = id;
    decolorLink();
    document.getElementById(activeLink).classList.add('menu-link-active');
}


function decolorIMG() {    // decolors image of current menu link
    for (let i = 0; i < menuLinks.length; i++) {
        document.getElementById(`${menuLinks[i]}-img`).classList.remove('img-active');
    }
}


function colorIMG(id) {    // colors image of current menu link
    decolorIMG();
    document.getElementById(`${id}-img`).classList.add('img-active');
}


function activateLink(id) {    // function package for activating a selected menu link
    colorLink(id);
    colorIMG(id);
    unhighlightMenuLink();
    highlightMenuLink(id);
    flipInMenuIf();
}