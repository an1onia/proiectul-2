const translations = {
    ru: {
        title: 'Рандомайзер цветов',
        colorName: 'Название цвета',
        hex: 'HEX:',
        rgb: 'RGB:',
        hsl: 'HSL:',
        button: 'тыкни',
        galleryTitle: 'Галерея цветов',
        achromatic: 'ахромные',
        muted: 'приглушённые',
        dark: 'тёмные',
        pastel: 'пастельные',
        bright: 'яркие',
        neon: 'неоновые',
        close: 'закрыть'
    },
    ro: {
        title: 'Generator de culori',
        colorName: 'Denumirea culorii',
        hex: 'HEX:',
        rgb: 'RGB:',
        hsl: 'HSL:',
        button: 'apasă',
        galleryTitle: 'Galerie de culori',
        achromatic: 'acromatice',
        muted: 'estompate',
        dark: 'întunecate',
        pastel: 'pastel',
        bright: 'strălucitoare',
        neon: 'neon',
        close: 'închide'
    },
    en: {
        title: 'Color Randomizer',
        colorName: 'Color Name',
        hex: 'HEX:',
        rgb: 'RGB:',
        hsl: 'HSL:',
        button: 'click',
        galleryTitle: 'Color Gallery',
        achromatic: 'achromatic',
        muted: 'muted',
        dark: 'dark',
        pastel: 'pastel',
        bright: 'bright',
        neon: 'neon',
        close: 'close'
    }
};

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
        });
    });
});
