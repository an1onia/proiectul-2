function generateHexNumber() {
    return Math.floor(Math.random() * 16).toString(16).toUpperCase();
}

function generateHexColor() {
    return "#" + Array.from({ length: 6 }, generateHexNumber).join("");
}

function randomNumber(max, min) {
    return Math.round(Math.random() * (max - min)) + min;
}

function randomLightness(type = "any") {
    switch (type) {
        case "dark": return randomNumber(80, 50);
        case "light": return randomNumber(100, 90);
        default: return randomNumber(100, 50);
    }
}

function hueData(key) {
    const hues = {
        red: 0, pink: 320, purple: 280, navy: 240,
        blue: 210, aqua: 190, green: 140, lime: 80,
        yellow: 60, orange: 30
    };
    if (hues[key]) return hues[key];
    const num = Number(key);
    return (num >= 0 && num < 360) ? num : randomNumber(359, 0);
}

function convertHexToRgb(hex) {
    const h = hex.slice(1);
    if (!/^[0-9A-F]{6}$/i.test(h)) return null;
    
    const rgb = [];
    for (let i = 0; i < 6; i += 2) {
        rgb.push(parseInt(h.slice(i, i + 2), 16));
    }
    return `rgb(${rgb.join(", ")})`;
}

function convertRgbToHsl(rgb) {
    const match = rgb.match(/\d+/g);
    if (!match || match.length < 3) return null;
    
    let r = match[0] / 255;
    let g = match[1] / 255;
    let b = match[2] / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }
    
    return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function convertHslToRgb(hsl) {
    const match = hsl.match(/\d+/g);
    if (!match || match.length < 3) return null;
    
    let h = match[0];
    let s = match[1] / 100;
    let l = match[2] / 100;
    
    const a = s * Math.min(l, 1 - l);
    const convert = (n, k = (n + h / 30) % 12) => {
        return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    };
    
    const r = Math.round(convert(0) * 255);
    const g = Math.round(convert(8) * 255);
    const b = Math.round(convert(4) * 255);
    
    return `rgb(${r}, ${g}, ${b})`;
}

function convertRgbToHex(rgb) {
    const match = rgb.match(/\d+/g);
    if (!match || match.length < 3) return null;
    
    const r = parseInt(match[0]);
    const g = parseInt(match[1]);
    const b = parseInt(match[2]);
    
    return "#" + ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0").toUpperCase();
}

function getRandomColor() {
    const hex = generateHexColor();
    const rgb = convertHexToRgb(hex);
    const hsl = convertRgbToHsl(rgb);
    return { hex, rgb, hsl };
}

function getRandomShade(hue, type = "any") {
    const saturation = randomNumber(100, 50);
    const hsl = `hsl(${hueData(hue)}, ${saturation}%, ${randomLightness(type)}%)`;
    const rgb = convertHslToRgb(hsl);
    const hex = convertRgbToHex(rgb);
    return { hex, rgb, hsl };
}

// Ждем полной загрузки страницы
document.addEventListener("DOMContentLoaded", function() {
    // Находим все нужные элементы
    const button = document.querySelector(".button");
    const colorBox = document.querySelector(".color-box");
    const hexSpan = document.querySelector(".hex-code");
    const rgbSpan = document.querySelector(".rgb-code");
    const hslSpan = document.querySelector(".hsl-code");
    
    // Проверяем, что все элементы найдены
    if (button && colorBox) {
        // Добавляем обработчик клика на кнопку
        button.addEventListener("click", function() {
            // Генерируем случайный цвет
            const color = getRandomColor();
            
            // Меняем цвет прямоугольника (НЕ весь экран)
            colorBox.style.backgroundColor = color.hex;
            
            // Обновляем коды цветов внизу
            if (hexSpan) hexSpan.textContent = color.hex;
            if (rgbSpan) rgbSpan.textContent = color.rgb;
            if (hslSpan) hslSpan.textContent = color.hsl;
            
            // Выводим в консоль для отладки
            console.log("Сгенерирован цвет:", color);
        });
    } else {
        console.error("Не удалось найти элементы на странице. Проверьте классы в HTML.");
        console.log("Найден button:", button);
        console.log("Найден color-box:", colorBox);
    }
});

function showColorInfo(color) {
    let infoDiv = document.querySelector(".color-info");
    
    if (!infoDiv) {
        infoDiv = document.createElement("div");
        infoDiv.className = "color-info";
        document.body.appendChild(infoDiv);
    }
    
    infoDiv.innerHTML = `
        <div style="position: fixed; bottom: 20px; left: 20px; background: white; padding: 10px; border-radius: 5px; font-family: monospace;">
            <strong>HEX:</strong> ${color.hex}<br>
            <strong>RGB:</strong> ${color.rgb}<br>
            <strong>HSL:</strong> ${color.hsl}
        </div>
    `;
}