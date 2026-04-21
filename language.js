const translations = {
    ru: {
        title: 'Рандомайзер цветов',
        colorName: 'Название цвета',
        hex: 'HEX:',
        rgb: 'RGB:',
        hsl: 'HSL:',
        button: 'тыкни'
    },
    ro: {
        title: 'Generator de culori',
        colorName: 'Denumirea culorii',
        hex: 'HEX:',
        rgb: 'RGB:',
        hsl: 'HSL:',
        button: 'apasă'
    },
    en: {
        title: 'Color Randomizer',
        colorName: 'Color Name',
        hex: 'HEX:',
        rgb: 'RGB:',
        hsl: 'HSL:',
        button: 'click'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('language') || 'ru';
    
    setLanguage(savedLanguage);
    
    updateMainLanguageButton(savedLanguage);
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            localStorage.setItem('language', lang);
            updateMainLanguageButton(lang);
            
            const selector = document.querySelector('.language-selector');
            selector.classList.remove('open');
        });
    });
    
    const mainBtn = document.querySelector('.lang-main-btn');
    if (mainBtn) {
        mainBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            document.querySelector('.language-selector').classList.toggle('open');
        });
    }
    
    document.addEventListener('click', function() {
        const selector = document.querySelector('.language-selector');
        if (selector) {
            selector.classList.remove('open');
        }
    });
});

function setLanguage(lang) {
    if (!translations[lang]) return;
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    document.documentElement.lang = lang;
}

function updateMainLanguageButton(language) {
    const mainBtn = document.querySelector('.lang-main-btn');
    if (mainBtn) {
        mainBtn.textContent = language.toUpperCase();
    }
}
