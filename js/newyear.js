/**
 * Новогоднее оформление сайта
 * Для отключения: закомментируйте строку подключения в index.html
 * или удалите этот файл
 */

(function() {
    'use strict';

    // Настройки снежинок
    const snowflakesCount = 50; // Количество снежинок
    const snowflakesContainer = document.createElement('div');
    snowflakesContainer.id = 'snowflakes-container';
    snowflakesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    `;
    document.body.appendChild(snowflakesContainer);

    // Создание снежинок
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = '❄';
        
        // Случайные параметры
        const size = Math.random() * 20 + 10; // 10-30px
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 10 + 10; // 10-20 секунд
        const delay = Math.random() * 5; // задержка до 5 секунд
        const opacity = Math.random() * 0.6 + 0.3; // 0.3-0.9
        
        snowflake.style.cssText = `
            position: absolute;
            top: -50px;
            left: ${startX}px;
            font-size: ${size}px;
            color: #fff;
            opacity: ${opacity};
            animation: fall ${duration}s linear ${delay}s infinite;
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
            user-select: none;
        `;
        
        snowflakesContainer.appendChild(snowflake);
    }

    // Создаём все снежинки
    for (let i = 0; i < snowflakesCount; i++) {
        createSnowflake();
    }

    // Добавляем CSS анимацию
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            0% {
                transform: translateY(0) rotate(0deg);
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
            }
        }

        /* Новогодняя иконка в логотипе */
        .logo::before {
            content: '🎄 ';
            font-size: 0.9em;
        }

        /* Пульсирующий эффект для новогодней иконки */
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
        }

        .logo::before {
            display: inline-block;
            animation: pulse 2s ease-in-out infinite;
        }

        /* Новогодний акцент на кнопках */
        .submit-btn {
            position: relative;
            overflow: hidden;
        }

        .submit-btn::before {
            content: '🎁';
            position: absolute;
            left: -30px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 18px;
            animation: slideGift 3s ease-in-out infinite;
        }

        @keyframes slideGift {
            0%, 100% {
                left: -30px;
                opacity: 0;
            }
            10%, 90% {
                opacity: 1;
            }
            50% {
                left: calc(100% + 30px);
            }
        }

        /* Снежный эффект на hover для карточек услуг */
        .service-category:hover {
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3), 
                        0 0 20px rgba(255, 255, 255, 0.5) !important;
        }
    `;
    document.head.appendChild(style);

    console.log('🎄 Новогоднее оформление загружено! С Новым Годом!');
})();