// 专业词汇注释交互脚本

document.addEventListener('DOMContentLoaded', function() {
    // 为所有注释链接添加预览内容
    const refLinks = document.querySelectorAll('.footnote-ref');
    
    refLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const targetId = href.substring(1);
            const targetFootnote = document.getElementById(targetId);
            
            if (targetFootnote) {
                // 提取注释内容（去掉返回链接部分）
                const footnoteText = targetFootnote.cloneNode(true);
                const backref = footnoteText.querySelector('.footnote-backref');
                if (backref) backref.remove();
                
                // 创建预览元素
                const preview = document.createElement('span');
                preview.className = 'footnote-preview';
                preview.textContent = footnoteText.textContent.trim();
                
                link.appendChild(preview);
            }
        }
    });
    
    // 平滑滚动到注释位置
    refLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // 高亮显示目标注释
                    target.style.backgroundColor = '#fff3cd';
                    target.style.transition = 'background-color 1s';
                    setTimeout(function() {
                        target.style.backgroundColor = '';
                    }, 2000);
                }
            }
        });
    });
});
