// Мобильное меню
class MobileMenu {
    constructor() {
        this.burgerButton = document.querySelector('.burger-button');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.menuLinks = document.querySelectorAll('.menu-link');
        this.init();
    }

    toggle() {
        this.burgerButton.classList.toggle('active');
        this.mobileMenu.classList.toggle('active');
        document.body.style.overflow = this.mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    close() {
        this.burgerButton.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    init() {
        this.burgerButton.addEventListener('click', () => this.toggle());
        this.menuLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
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

// Анимация появления элементов при скролле
class ScrollAnimation {
    constructor() {
        this.elements = document.querySelectorAll('.service-category, .advantages-block');
        this.init();
    }

    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    handleScroll() {
        this.elements.forEach(element => {
            if (this.isElementInViewport(element)) {
                element.classList.add('animated');
            }
        });
    }

    init() {
        this.handleScroll();
        window.addEventListener('scroll', () => this.handleScroll());
    }
}

// Форма обратной связи (оригинальная версия)
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    async handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message')
        };

        const submitButton = e.target.querySelector('button[type="submit"]');
        try {
            submitButton.disabled = true;
            submitButton.textContent = 'Отправка...';

            const response = await fetch('https://telegram-form.creatmanick-850.workers.dev', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Ошибка отправки формы');
            }

            alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
            e.target.reset();
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Отправить заявку';
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
}

// Модальное окно (оригинальная версия)
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
    const scrollAnimation = new ScrollAnimation();
    const contactForm = new ContactForm();
    const modal = new Modal();
});