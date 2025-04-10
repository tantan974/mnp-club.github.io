document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".mobile-menu-btn");
    const menu = document.getElementById("menu");
    menuButton.addEventListener("click", function () {
        menu.classList.toggle("show");
    });
    const typewriterTexts = document.querySelectorAll('.typewriter-text');
    typewriterTexts.forEach(element => {
        const text = element.textContent.trim();
        element.textContent = '';
        const batchSize = 5;
        for (let i = 0; i < text.length; i += batchSize) {
            const span = document.createElement('span');
            span.textContent = text.substring(i, Math.min(i + batchSize, text.length));
            element.appendChild(span);
        }
    });
    const animateTypewriter = (element, speed = 8) => {
        element.classList.add('active');
        const chars = element.querySelectorAll('span');
        
        chars.forEach((char, index) => {
            setTimeout(() => {
                char.classList.add('visible');
                if (index === chars.length - 1) {
                    setTimeout(() => {
                        element.classList.remove('active');
                        const paragraphs = Array.from(typewriterTexts);
                        const currentIndex = paragraphs.indexOf(element);
                        if (currentIndex < paragraphs.length - 1) {
                            setTimeout(() => {
                                animateTypewriter(paragraphs[currentIndex + 1], speed);
                            }, 100);
                        }
                    }, 100);
                }
            }, index * speed);
        });
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target === typewriterTexts[0]) {
                animateTypewriter(typewriterTexts[0]);
                observer.disconnect();
            }
        });
    }, {
        root: null,
        threshold: 0.2,
        rootMargin: "-50px 0px"
    });
    if (typewriterTexts.length > 0) {
        observer.observe(typewriterTexts[0]);
    }
     const invertButton = document.getElementById("invert-button");
    const body = document.body;
    function toggleInvert() {
        body.classList.toggle("inverted");
        if (body.classList.contains("inverted")) {
            body.style.backgroundColor = "#ffffff";
            body.style.color = "#000000";
        } else {
            body.style.backgroundColor = "#000000";
            body.style.color = "#ffffff";
        }
        
    }
    toggleInvert(); //toggling the inverter by default because for some reason when the default dark mode page loads first it doesn't work but when I invert twice it works, so I decided to switch to light mode on startup by default so that both dark and light modes work.
    invertButton.addEventListener("click", function () {
        toggleInvert();
    });

    const slider = document.querySelector('.gallery-slider');
                const slides = document.querySelectorAll('.gallery-slide');
                const dotsContainer = document.querySelector('.slider-dots');
                const dots = document.querySelectorAll('.slider-dot');
                const prevBtn = document.querySelector('.slider-control.prev');
                const nextBtn = document.querySelector('.slider-control.next');
                
                let currentIndex = 0;
                const slideCount = slides.length;
                
                function goToSlide(index) {
                    if (index < 0) {                            
                        index = slideCount - 1;
                    } else if (index >= slideCount) {
                        index = 0;
                    }
                    
                    currentIndex = index;
                    const translateValue = -currentIndex * 100 + '%';
                    slider.style.transform = 'translateX(' + translateValue + ')';
                    
                    dots.forEach(dot => dot.classList.remove('active'));
                    dots[currentIndex].classList.add('active');
                }
                
                prevBtn.addEventListener('click', () => {
                    goToSlide(currentIndex - 1);
                });
                
                nextBtn.addEventListener('click', () => {
                    goToSlide(currentIndex + 1);
                });
                
                dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        goToSlide(index);
                    });
                });
                
                let slideInterval = setInterval(() => {
                    goToSlide(currentIndex + 1);
                }, 5000);
                
                const galleryContainer = document.querySelector('.gallery-container');
                galleryContainer.addEventListener('mouseenter', () => {
                    clearInterval(slideInterval);
                });
                
                galleryContainer.addEventListener('mouseleave', () => {
                    slideInterval = setInterval(() => {
                        goToSlide(currentIndex + 1);
                    }, 5000);
                });
});
