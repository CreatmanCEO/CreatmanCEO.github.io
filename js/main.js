// Конфигурация проектов
const projects = [
    {
        title: "Мобильное приложение Сахалин-Маркет",
        description: "Кроссплатформенное мобильное приложение для заказа еды и товаров в г. Южно-Сахалинск.",
        image: "/images/sakh-mob.webp"
    },
    {
        title: "Web-приложение Сахалин-Маркет",
        description: "Создание масштабируемой платформы для агрегатора доставки еды и товаров, включающее в себя веб-сайт и админ панели для сервиса и заведений.",
        image: "/images/sakh-web.webp"
    },
    {
        title: "Web-Приложение СпортХаб",
        description: "Полноценная платформа для создания любительских футбольных команд и проведения соревнований и тренировок.",
        image: "/images/sporthub.webp"
    }
];

// Слайдер
class Slider {
    constructor() {
        this.currentSlide = 0;
        this.slider = document.getElementById('projectSlider');
        this.slideTitle = document.querySelector('.slide-title');
        this.slideDescription = document.querySelector('.slide-description');
        this.interval = null;
        this.init();
    }

    createSlide(project) {
        return `
            <div class="slide">
                <img src="${project.image}" alt="${project.title}" onclick="modal.open('${project.image}')">
                <div class="slide-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                </div>
            </div>
        `;
    }

    updateSlideInfo(index) {
        this.slideTitle.textContent = projects[index].title;
        this.slideDescription.textContent = projects[index].description;
    }

    showSlide(index) {
        const slides = this.slider.querySelectorAll('.slide');
        slides.forEach(slide => slide.classList.remove('active'));
        
        this.slider.insertAdjacentHTML('beforeend', this.createSlide(projects[index]));

        setTimeout(() => {
            const newSlide = this.slider.querySelector('.slide:last-child');
            newSlide.classList.add('active');
            
            setTimeout(() => {
                const oldSlides = this.slider.querySelectorAll('.slide:not(.active)');
                oldSlides.forEach(slide => slide.remove());
            }, 1000);
        }, 50);

        this.updateSlideInfo(index);
        this.currentSlide = index;
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + projects.length) % projects.length;
        this.showSlide(this.currentSlide);
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % projects.length;
        this.showSlide(this.currentSlide);
    }

    startAutoSlide() {
        this.interval = setInterval(() => {
            this.nextSlide();
        }, 8000);
    }

    stopAutoSlide() {
        clearInterval(this.interval);
    }

    init() {
        this.showSlide(0);
        this.startAutoSlide();

        this.slider.addEventListener('mouseover', () => this.stopAutoSlide());
        this.slider.addEventListener('mouseout', () => this.startAutoSlide());
    }
}

const slider = new Slider();


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

        // Обработка свайпов на мобильных
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

// Форма обратной связи
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

// Инициализация всех компонентов
const slider = new Slider();
const modal = new Modal();
const mobileMenu = new MobileMenu();
const contactForm = new ContactForm();