// 幻灯片功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有幻灯片
    const sliders = ['photo', 'painting'];
    
    sliders.forEach(sliderId => {
        const track = document.getElementById(`${sliderId}-track`);
        if (!track) return;
        
        const slides = track.querySelectorAll('.slide');
        const prevBtn = document.querySelector(`.prev[data-slider="${sliderId}"]`);
        const nextBtn = document.querySelector(`.next[data-slider="${sliderId}"]`);
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        
        function updateSlide() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateSlide();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateSlide();
            });
        }
    });
    
    // 可选：键盘左右键控制当前可见的幻灯片
    let currentSection = 0;
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            // 找到当前视口中的板块
            const viewportCenter = window.scrollY + window.innerHeight / 2;
            let activeIndex = 0;
            sections.forEach((section, i) => {
                const rect = section.getBoundingClientRect();
                const sectionCenter = rect.top + window.scrollY + rect.height / 2;
                if (Math.abs(sectionCenter - viewportCenter) < 100) {
                    activeIndex = i;
                }
            });
            
            const activeSection = sections[activeIndex];
            const activeId = activeSection ? activeSection.id : '';
            
            // 如果是摄影或画作板块，左右键控制幻灯片
            if (activeId === 'section-photo') {
                const track = document.getElementById('photo-track');
                const prevBtn = document.querySelector(`.prev[data-slider="photo"]`);
                const nextBtn = document.querySelector(`.next[data-slider="photo"]`);
                if (e.key === 'ArrowLeft') prevBtn?.click();
                if (e.key === 'ArrowRight') nextBtn?.click();
            } else if (activeId === 'section-painting') {
                const track = document.getElementById('painting-track');
                const prevBtn = document.querySelector(`.prev[data-slider="painting"]`);
                const nextBtn = document.querySelector(`.next[data-slider="painting"]`);
                if (e.key === 'ArrowLeft') prevBtn?.click();
                if (e.key === 'ArrowRight') nextBtn?.click();
            }
        }
    });
});
