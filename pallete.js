// pallete.js
document.addEventListener("DOMContentLoaded", function() {

    // Категории с ДИАПАЗОНАМИ для getRandomShade
    const categoryParams = {
        'ахромные': { 
            hues: ['gray', 'black', 'white'],  // можно оставить как есть
            type: 'any',
            // Для ахромных можно добавить диапазон насыщенности
            saturationRange: [0, 10]  // почти нет насыщенности
        },
        'приглушённые': {
            hueRange: [30, 210],      // оттенки от 30 до 210 градусов
            saturationRange: [20, 50], // низкая насыщенность (приглушённые)
            lightnessRange: [40, 70]   // средняя яркость
        },
        'тёмные': {
            hueRange: [0, 360],        // любые оттенки
            saturationRange: [50, 100], // насыщенные
            lightnessRange: [15, 40]    // ТЁМНЫЕ (низкая яркость)
        },
        'пастельные': {
            hueRange: [0, 360],         // любые оттенки
            saturationRange: [20, 50],  // низкая насыщенность
            lightnessRange: [70, 95]    // СВЕТЛЫЕ (высокая яркость)
        },
        'яркие': {
            hueRange: [0, 360],         // любые оттенки
            saturationRange: [80, 100], // высокая насыщенность
            lightnessRange: [50, 70]    // средняя яркость
        },
        'неоновые': {
            hueRange: [80, 320],        // зелёные, голубые, розовые
            saturationRange: [90, 100], // максимальная насыщенность
            lightnessRange: [50, 65]    // яркие, но не белые
        }
    };

    // Новая функция генерации цвета с ДИАПАЗОНАМИ
    function getColorWithRange(params) {
        // Если есть hueRange - генерируем число в диапазоне
        let hue;
        if (params.hueRange) {
            hue = Math.floor(Math.random() * (params.hueRange[1] - params.hueRange[0] + 1)) + params.hueRange[0];
        } else if (params.hues) {
            // Если указаны конкретные hues (как для ахромных)
            const huesList = {
                'gray': 0, 'black': 0, 'white': 0,
                'red': 0, 'pink': 320, 'purple': 280, 'navy': 240,
                'blue': 210, 'aqua': 190, 'green': 140, 'lime': 80,
                'yellow': 60, 'orange': 30
            };
            const selectedHue = params.hues[Math.floor(Math.random() * params.hues.length)];
            hue = huesList[selectedHue] || 0;
        } else {
            hue = Math.floor(Math.random() * 360);
        }
        
        // Насыщенность
        let saturation;
        if (params.saturationRange) {
            saturation = Math.floor(Math.random() * (params.saturationRange[1] - params.saturationRange[0] + 1)) + params.saturationRange[0];
        } else {
            saturation = Math.floor(Math.random() * 61) + 20; // 20-80% по умолчанию
        }
        
        // Яркость
        let lightness;
        if (params.lightnessRange) {
            lightness = Math.floor(Math.random() * (params.lightnessRange[1] - params.lightnessRange[0] + 1)) + params.lightnessRange[0];
        } else {
            lightness = Math.floor(Math.random() * 51) + 25; // 25-75% по умолчанию
        }
        
        // Создаём HSL цвет
        const hsl = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        
        // Конвертируем в RGB и HEX
        const rgb = convertHslToRgb(hsl);
        const hex = convertRgbToHex(rgb);
        
        return { hex, rgb, hsl };
    }

    // Все hues для генерации всех цветов (если нужно)
    const allHues = ['red', 'pink', 'purple', 'navy', 'blue', 'aqua', 'green', 'lime', 'yellow', 'orange', 'gray', 'black', 'white'];

    // Функция генерации цветов через ваш API
    function generateColorsForCategory(categoryName, count = 75) {
        const colors = [];
        
        for (let i = 0; i < count; i++) {
            let color;
            
            if (!categoryName) {
                // Все цвета (случайные оттенки)
                const randomHue = allHues[Math.floor(Math.random() * allHues.length)];
                color = getRandomShade(randomHue, 'any');
            } else {
                const params = categoryParams[categoryName];
                if (params && (params.hueRange || params.hues)) {
                    // Используем новую функцию с диапазонами
                    color = getColorWithRange(params);
                } else {
                    // Fallback на старую логику
                    const defaultParams = categoryParams[categoryName] || { hues: ['red', 'blue', 'green'], type: 'any' };
                    const randomHue = defaultParams.hues[Math.floor(Math.random() * defaultParams.hues.length)];
                    color = getRandomShade(randomHue, defaultParams.type);
                }
            }
            colors.push(color);
        }
        return colors;
    }

    // Функция отображения цветов в палитре
function renderPalette(colors) {
    const container = document.querySelector('.paleta-culori');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Убираем все inline-стили, чтобы работал CSS
    container.style.display = '';
    container.style.flexWrap = '';
    container.style.gap = '';
    container.style.maxWidth = '';
    container.style.listStyle = '';
    container.style.padding = '';
    
    // Добавляем класс для сетки 5 колонок
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(5, 1fr)';
    container.style.gap = '12px';
    container.style.listStyle = 'none';
    container.style.padding = '0';
    container.style.margin = '0';
    
    colors.forEach(color => {
        const colorItem = document.createElement('li');
        colorItem.className = 'palette-item';
        colorItem.style.backgroundColor = color.hex;
        colorItem.style.width = '100%';
        colorItem.style.aspectRatio = '1 / 1';
        colorItem.style.borderRadius = '12px';
        colorItem.style.cursor = 'pointer';
        colorItem.style.transition = 'all 0.2s ease';
        colorItem.style.border = '2px solid rgba(255, 255, 255, 0.6)';
        colorItem.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        
        // Добавляем подсказку с HEX кодом
        colorItem.setAttribute('data-hex', color.hex);
        
        colorItem.addEventListener('click', () => {
            // Находим элементы на главной странице
            const colorBox = document.querySelector('.color-box');
            const hexSpan = document.querySelector('.hex-code');
            const rgbSpan = document.querySelector('.rgb-code');
            const hslSpan = document.querySelector('.hsl-code');
            const nameSpan = document.querySelector('.name');
            
            // Обновляем цвета и коды в прямоугольнике
            if (colorBox) {
                colorBox.style.backgroundColor = color.hex;
                // Добавляем плавную анимацию
                colorBox.style.transition = 'background-color 0.3s ease';
            }
            if (hexSpan) hexSpan.textContent = color.hex;
            if (rgbSpan) rgbSpan.textContent = color.rgb;
            if (hslSpan) hslSpan.textContent = color.hsl;
            if (nameSpan) nameSpan.textContent = color.hex;
            
            // Визуальная обратная связь при клике
            colorItem.style.transform = 'scale(0.95)';
            setTimeout(() => {
                colorItem.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Эффект при наведении
        colorItem.addEventListener('mouseenter', () => {
            colorItem.style.transform = 'translateY(-4px)';
            colorItem.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.2)';
        });
        
        colorItem.addEventListener('mouseleave', () => {
            colorItem.style.transform = 'translateY(0)';
            colorItem.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        });
        
        container.appendChild(colorItem);
    });
}

    // Скрыть все ссылки "закрыть" изначально
    const allCloseLinks = document.querySelectorAll('.categoria-link');
    allCloseLinks.forEach(link => {
        link.style.display = 'none';
    });

    // Клик по категории
    const categoryItems = document.querySelectorAll('.categoria-item');
    
    // Показываем ВСЕ цвета изначально
    const allColors = generateColorsForCategory(null, 75);
    renderPalette(allColors);
    
    categoryItems.forEach(item => {
        const closeLink = item.querySelector('.categoria-link');
        
        item.addEventListener('click', function(event) {
            if (event.target.classList && event.target.classList.contains('categoria-link')) {
                return;
            }
            
            categoryItems.forEach(cat => {
                cat.classList.remove('active');
                const link = cat.querySelector('.categoria-link');
                if (link) link.style.display = 'none';
            });
            
            this.classList.add('active');
            
            if (closeLink) {
                closeLink.style.display = 'inline-block';
                
                closeLink.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.classList.toggle('active');
                    
                    if (this.classList.contains('active')) {
                        const allColorsAgain = generateColorsForCategory(null, 75);
                        renderPalette(allColorsAgain);
                        item.classList.remove('active');
                    } else {
                        const categoryName = item.querySelector('.categoria-nume').textContent;
                        const categoryColors = generateColorsForCategory(categoryName, 75);
                        renderPalette(categoryColors);
                    }
                };
            }
            
            const categoryName = this.querySelector('.categoria-nume').textContent;
            const categoryColors = generateColorsForCategory(categoryName, 75);
            renderPalette(categoryColors);
        });
    });
});