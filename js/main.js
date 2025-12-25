// Мобильное меню
class MobileMenu {
    constructor() {
        this.burgerButton = document.querySelector('.burger-button');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.closeButton = document.querySelector('.close-menu');
        this.menuLinks = document.querySelectorAll('.menu-link');
        this.isOpen = false;
        this.init();
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.burgerButton.classList.toggle('active');
        this.mobileMenu.classList.toggle('active');
        document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }

    close() {
        this.isOpen = false;
        this.burgerButton.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    init() {
        this.burgerButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        this.closeButton.addEventListener('click', () => {
            this.close();
        });

        this.menuLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });

        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.mobileMenu.contains(e.target) && !this.burgerButton.contains(e.target)) {
                this.close();
            }
        });

        this.mobileMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

// Плавная прокрутка к секциям
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    scrollToElement(element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    this.scrollToElement(targetElement);
                }
            });
        });
    }
}

// Промо-баннер
class PromoBanner {
    constructor() {
        this.banner = document.getElementById('promoBanner');
        this.closeBtn = document.querySelector('.promo-close');
        this.init();
    }

    close() {
        this.banner.style.display = 'none';
        localStorage.setItem('promoBannerClosed', 'true');
        document.body.style.paddingTop = '0';
    }

    init() {
        const isClosed = localStorage.getItem('promoBannerClosed');
        
        if (!isClosed) {
            this.banner.style.display = 'block';
            document.body.style.paddingTop = this.banner.offsetHeight + 'px';
        }

        this.closeBtn.addEventListener('click', () => this.close());
    }
}

// Промо Pop-up
class PromoPopup {
    constructor() {
        this.popup = document.getElementById('promoPopup');
        this.closeBtn = document.querySelector('.popup-close');
        this.overlay = document.querySelector('.popup-overlay');
        this.ctaButton = document.querySelector('.popup-cta');
        this.init();
    }

    show() {
        this.popup.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.popup.style.display = 'none';
        document.body.style.overflow = '';
        localStorage.setItem('promoPopupShown', 'true');
    }

    init() {
        const wasShown = localStorage.getItem('promoPopupShown');
        
        if (!wasShown) {
            setTimeout(() => this.show(), 3000);
        }

        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', () => this.close());
        
        // Закрываем попап при клике на CTA
        this.ctaButton.addEventListener('click', () => this.close());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.popup.style.display === 'block') {
                this.close();
            }
        });
    }
}

// Форма обратной связи
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.botToken = '8157141771:AAHxRzh3_kCS1amiPTaXw3FTYnN-GrBdt-g';
        this.chatId = '338930874';
        this.init();
    }

    async sendToTelegram(data) {
        const message = `
🆕 Новая заявка с сайта!

👤 Имя: ${data.name}
📱 Телефон: ${data.phone}
💬 Сообщение: ${data.message || 'Не указано'}

⏰ Время: ${new Date().toLocaleString('ru-RU')}
        `.trim();

        const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: this.chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Telegram API error: ${errorData.description || 'Unknown error'}`);
        }

        return response.json();
    }

    async handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            message: formData.get('message')
        };

        const submitButton = e.target.querySelector('button[type="submit"]');
        try {
            submitButton.disabled = true;
            submitButton.textContent = 'Отправка...';

            await this.sendToTelegram(data);

            alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
            e.target.reset();
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Получить консультацию';
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        const phoneInput = this.form.querySelector('input[name="phone"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    value = '+7' + value.substring(1);
                    if (value.length > 2) {
                        value = value.slice(0, 2) + ' (' + value.slice(2);
                    }
                    if (value.length > 7) {
                        value = value.slice(0, 7) + ') ' + value.slice(7);
                    }
                    if (value.length > 12) {
                        value = value.slice(0, 12) + '-' + value.slice(12);
                    }
                    if (value.length > 15) {
                        value = value.slice(0, 15) + '-' + value.slice(15);
                    }
                }
                e.target.value = value.slice(0, 18);
            });
        }
    }
}

// Модальное окно
class Modal {
    constructor() {
        this.modal = document.getElementById('fullscreenModal');
        this.modalImg = document.getElementById('modalImage');
        this.closeBtn = document.getElementsByClassName('close-modal')[0];
        this.init();
    }

    open(imgSrc) {
        this.modal.style.display = "block";
        this.modalImg.src = imgSrc;
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.style.display = "none";
        document.body.style.overflow = '';
    }

    init() {
        this.closeBtn.onclick = () => this.close();
        this.modal.onclick = (e) => {
            if (e.target === this.modal) this.close();
        };
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });

        let touchStartY = 0;
        this.modal.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        }, false);

        this.modal.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].screenY;
            const swipeDistance = Math.abs(touchEndY - touchStartY);
            if (swipeDistance > 100) this.close();
        }, false);
    }
}

// Инициализация всех компонентов
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = new MobileMenu();
    const smoothScroll = new SmoothScroll();
    const contactForm = new ContactForm();
    const modal = new Modal();
    const promoBanner = new PromoBanner();
    const promoPopup = new PromoPopup();
});