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
    },
    {
        'src': './img/dance.jpg',
        'alt': 'dance',
        'category': 'photos'
    },
    {
        'src': './img/gapura.jpg',
        'alt': 'gapura',
        'category': 'photos'
    },
    {
        'src': './img/garuda.jpg',
        'alt': 'garuda',
        'category': 'photos'
    },
    {
        'src': './img/mountain.jpg',
        'alt': 'mountain',
        'category': 'photos'
    },
    {
        'src': './img/nature.jpg',
        'alt': 'nature',
        'category': 'photos'
    },
    {
        'src': './img/night.jpg',
        'alt': 'night',
        'category': 'photos'
    },
    {
        'src': './img/orange.jpg',
        'alt': 'orange',
        'category': 'photos'
    },
    {
        'src': './img/pagoda.jpg',
        'alt': 'pagoda',
        'category': 'photos'
    },
    {
        'src': './img/portrait.jpg',
        'alt': 'portrait',
        'category': 'photos'
    },
    {
        'src': './img/sunset.jpg',
        'alt': 'sunset',
        'category': 'photos'
    },
    {
        'src': './img/ubud.jpg',
        'alt': 'ubud',
        'category': 'photos'
    },
    {
        'src': './img/woman.jpg',
        'alt': 'woman',
        'category': 'photos'
    }
];


function loadImages() {
    let photoGallery = document.getElementById('photo-gallery');
    photoGallery.innerHTML = '';

    for (let i = 0; i < images.length; i++) {
        photoGallery.innerHTML += `
            <img src="${images[i]['src']}" alt="${images[i]['alt']}" class="image-box">
        `;
    }
}