class ProductCarousel {
    constructor() {
        this.currentSlide = 0;
        this.carousel = document.querySelector('.carousel');
        this.items = document.querySelectorAll('.carousel-item');
        this.totalItems = this.items.length;
        this.dots = document.querySelectorAll('.dot');
        
        this.init();
    }
    
    init() {
        // Configurar controles
        document.querySelector('.prev').addEventListener('click', () => this.prevSlide());
        document.querySelector('.next').addEventListener('click', () => this.nextSlide());
        
        // Configurar dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Configurar autoplay
        this.startAutoplay();
        
        // Pausar autoplay en hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
        
        // Configurar touch events para móviles
        this.setupTouchEvents();
    }
    
    updateCarousel() {
        // Actualizar posición del carousel
        const offset = -this.currentSlide * 100;
        this.carousel.style.transform = `translateX(${offset}%)`;
        
        // Actualizar dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalItems;
        this.updateCarousel();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalItems) % this.totalItems;
        this.updateCarousel();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => this.nextSlide(), 5000);
    }
    
    stopAutoplay() {
        clearInterval(this.autoplayInterval);
    }
    
    setupTouchEvents() {
        let startX = 0;
        let isDragging = false;
        
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        this.carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
                isDragging = false;
            }
        });
        
        this.carousel.addEventListener('touchend', () => {
            isDragging = false;
        });
    }
}

// Inicializar el carrusel cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
    new ProductCarousel();
});