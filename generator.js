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

// ========== ФУНКЦИЯ КОПИРОВАНИЯ ==========
function showCopyToast(text, type) {
    // Удаляем старое уведомление
    const oldToast = document.querySelector('.copy-toast');
    if (oldToast) oldToast.remove();
    
    // Создаём уведомление
    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.textContent = `📋 Скопировано ${type}: ${text}`;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: #1e293b;
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: 500;
        z-index: 9999;
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
        font-family: monospace;
        white-space: nowrap;
        pointer-events: none;
    `;
    document.body.appendChild(toast);
    
    // Показываем
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
        toast.style.opacity = '1';
    }, 10);
    
    // Скрываем через 2 секунды
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

async function copyToClipboard(text, type) {
    try {
        await navigator.clipboard.writeText(text);
        showCopyToast(text, type);
        return true;
    } catch (err) {
        console.error('Ошибка копирования:', err);
        showCopyToast('Ошибка копирования', '❌');
        return false;
    }
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
// Ждем полной загрузки страницы
document.addEventListener("DOMContentLoaded", function() {
    // Находим все нужные элементы
    const button = document.querySelector(".button");
    const colorBox = document.querySelector(".color-box");
    const hexSpan = document.querySelector(".hex-code");
    const rgbSpan = document.querySelector(".rgb-code");
    const hslSpan = document.querySelector(".hsl-code");
    const nameSpan = document.querySelector(".name");
    
    // Переменная для хранения текущего цвета
    let currentColor = null;
    
    // Функция обновления цвета на странице
    function updateColorDisplay(color) {
        if (colorBox) colorBox.style.backgroundColor = color.hex;
        if (hexSpan) hexSpan.textContent = color.hex;
        if (rgbSpan) rgbSpan.textContent = color.rgb;
        if (hslSpan) hslSpan.textContent = color.hsl;
        if (nameSpan) nameSpan.textContent = color.hex;
        currentColor = color;
        console.log("Сгенерирован цвет:", color);
    }
    
    // Проверяем, что все элементы найдены
    if (button && colorBox) {
        // Генерируем первый цвет
        const firstColor = getRandomColor();
        updateColorDisplay(firstColor);
        
        // Добавляем обработчик клика на кнопку
        button.addEventListener("click", function() {
            const color = getRandomColor();
            updateColorDisplay(color);
        });
    } else {
        console.error("Не удалось найти элементы на странице. Проверьте классы в HTML.");
        console.log("Найден button:", button);
        console.log("Найден color-box:", colorBox);
    }
    
    // ========== ДОБАВЛЯЕМ КОПИРОВАНИЕ ==========
    
    // Копирование HEX при клике на прямоугольник
    if (colorBox) {
        colorBox.addEventListener("click", function() {
            if (currentColor && currentColor.hex) {
                copyToClipboard(currentColor.hex, "HEX");
            } else if (hexSpan && hexSpan.textContent) {
                copyToClipboard(hexSpan.textContent, "HEX");
            }
        });
        // Добавляем подсказку
        colorBox.style.cursor = "pointer";
        colorBox.title = "Кликни, чтобы скопировать HEX";
    }
    
    // Копирование при клике на блоки с кодами
    if (hexSpan) {
        const hexItem = hexSpan.closest('.code-item');
        if (hexItem) {
            hexItem.style.cursor = "pointer";
            hexItem.title = "Кликни, чтобы скопировать HEX";
            hexItem.addEventListener("click", function(e) {
                e.stopPropagation();
                copyToClipboard(hexSpan.textContent, "HEX");
            });
        } else {
            hexSpan.style.cursor = "pointer";
            hexSpan.title = "Кликни, чтобы скопировать HEX";
            hexSpan.addEventListener("click", function(e) {
                e.stopPropagation();
                copyToClipboard(hexSpan.textContent, "HEX");
            });
        }
    }
    
    if (rgbSpan) {
        const rgbItem = rgbSpan.closest('.code-item');
        if (rgbItem) {
            rgbItem.style.cursor = "pointer";
            rgbItem.title = "Кликни, чтобы скопировать RGB";
            rgbItem.addEventListener("click", function(e) {
                e.stopPropagation();
                copyToClipboard(rgbSpan.textContent, "RGB");
            });
        } else {
            rgbSpan.style.cursor = "pointer";
            rgbSpan.title = "Кликни, чтобы скопировать RGB";
            rgbSpan.addEventListener("click", function(e) {
                e.stopPropagation();
                copyToClipboard(rgbSpan.textContent, "RGB");
            });
        }
    }
    
    if (hslSpan) {
        const hslItem = hslSpan.closest('.code-item');
        if (hslItem) {
            hslItem.style.cursor = "pointer";
            hslItem.title = "Кликни, чтобы скопировать HSL";
            hslItem.addEventListener("click", function(e) {
                e.stopPropagation();
                copyToClipboard(hslSpan.textContent, "HSL");
            });
        } else {
            hslSpan.style.cursor = "pointer";
            hslSpan.title = "Кликни, чтобы скопировать HSL";
            hslSpan.addEventListener("click", function(e) {
                e.stopPropagation();
                copyToClipboard(hslSpan.textContent, "HSL");
            });
        }
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