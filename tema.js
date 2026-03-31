// Crearea celor două cerculețe
const cercAlb = document.createElement('div');
const cercNegru = document.createElement('div');

// Setări cerculețe
cercAlb.style.width = '20px';
cercAlb.style.height = '20px';
cercAlb.style.borderRadius = '50%';
cercAlb.style.backgroundColor = 'white';
cercAlb.style.border = '1px solid gray';
cercAlb.style.cursor = 'pointer';

cercNegru.style.width = '20px';
cercNegru.style.height = '20px';
cercNegru.style.borderRadius = '50%';
cercNegru.style.backgroundColor = 'black';
cercNegru.style.border = '1px solid white';
cercNegru.style.cursor = 'pointer';

// Poziționare în partea stângă la mijlocul paginii
cercAlb.style.position = 'fixed';
cercAlb.style.left = '10px';
cercAlb.style.top = '50%';
cercAlb.style.transform = 'translateY(-50%)';
cercAlb.style.zIndex = '9999';

cercNegru.style.position = 'fixed';
cercNegru.style.left = '10px';
cercNegru.style.top = 'calc(50% + 30px)';
cercNegru.style.transform = 'translateY(-50%)';
cercNegru.style.zIndex = '9999';

// Adăugare în pagină
document.body.appendChild(cercAlb);
document.body.appendChild(cercNegru);

// Funcția pentru tema zi
cercAlb.addEventListener('click', function() {
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#000000';
});

// Funcția pentru tema noapte
cercNegru.addEventListener('click', function() {
    document.body.style.backgroundColor = '#000000';
    document.body.style.color = '#ffffff';
});