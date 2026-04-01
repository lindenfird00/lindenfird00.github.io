// 植物卡片幻灯片功能
document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('.slideshow-container');
    
    containers.forEach(container => {
        const track = container.querySelector('.slideshow-track');
        const slides = container.querySelectorAll('.slide-item');
        const prevBtn = container.querySelector('.slideshow-prev');
        const nextBtn = container.querySelector('.slideshow-next');
        const dotsContainer = container.querySelector('.slideshow-dots');
        
        if (!track || slides.length === 0) return;
        
        // 如果只有一张图，隐藏按钮和点
        if (slides.length === 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            if (dotsContainer) dotsContainer.style.display = 'none';
            return;
        }
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        
        // 创建指示点
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('span');
                dot.classList.add('slideshow-dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }
        
        function updateSlide() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.slideshow-dot');
                dots.forEach((dot, i) => {
                    if (i === currentIndex) dot.classList.add('active');
                    else dot.classList.remove('active');
                });
            }
        }
        
        function goToSlide(index) {
            currentIndex = (index + totalSlides) % totalSlides;
            updateSlide();
        }
        
        if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    });
});
