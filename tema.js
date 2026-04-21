
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

document.body.appendChild(cercAlb);
document.body.appendChild(cercNegru);

// Funcție pentru aplicarea temei
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', theme);
}

// Încărcarea temei salvate
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

cercAlb.addEventListener('click', function() {
    applyTheme('light');
});

cercNegru.addEventListener('click', function() {
    applyTheme('dark');
});