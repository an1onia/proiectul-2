// Initialize color display and button functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Generate initial color on page load
    generateNewColor();
    
    // Add click event to button
    const button = document.querySelector('.button');
    if (button) {
        button.addEventListener('click', generateNewColor);
    }
});

// Function to generate and display a new color
function generateNewColor() {
    // Generate a random HEX color
    const hexColor = generateHexColor();
    
    // Convert to RGB
    const rgbColor = convertHexToRgb(hexColor);
    
    // Convert to HSL
    const hslColor = convertRgbToHsl(rgbColor);
    
    // Update the display
    updateColorDisplay(hexColor, rgbColor, hslColor);
}

// Function to update the color display on the page
function updateColorDisplay(hex, rgb, hsl) {
    const colorBox = document.querySelector('.color-box');
    const hexSpan = document.querySelector('.hex-code');
    const rgbSpan = document.querySelector('.rgb-code');
    const hslSpan = document.querySelector('.hsl-code');
    const nameSpan = document.querySelector('.name');
    
    if (colorBox) {
        colorBox.style.backgroundColor = hex;
        colorBox.style.transition = 'background-color 0.3s ease';
    }
    
    if (hexSpan) {
        hexSpan.textContent = hex;
    }
    
    if (rgbSpan) {
        rgbSpan.textContent = rgb;
    }
    
    if (hslSpan) {
        hslSpan.textContent = hsl;
    }
    
    if (nameSpan) {
        nameSpan.textContent = hex;
    }
}

// Language system
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
