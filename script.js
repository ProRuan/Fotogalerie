let images = [
    {
        'src': './img/agriculture.jpg',
        'alt': 'agricultere',
        'category': 'photos'
    },
    {
        'src': './img/beach.jpg',
        'alt': 'beach',
        'category': 'photos'
    },
    {
        'src': './img/child.jpg',
        'alt': 'child',
        'category': 'photos'
    },
    {
        'src': './img/cliff.jpg',
        'alt': 'cliff',
        'category': 'photos'
    },
    {
        'src': './img/culture.jpg',
        'alt': 'culture',
        'category': 'photos'
    }
];


function loadImages() {
    let photoGallery = document.getElementById('photo-gallery');
    photoGallery.innerHTML = '';

    for (let i = 0; i < images.length; i++) {
        photoGallery.innerHTML += `
            <img src="${images[i]['src']}" alt="${images[i]['alt']}" class="images">
        `;
    }
}