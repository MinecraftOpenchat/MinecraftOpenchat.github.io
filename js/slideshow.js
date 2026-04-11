/**
 * ==========================================================================
 * ヒーローセクション スライドショー (GitHub Pages用)
 * ==========================================================================
 */

const HERO_SLIDESHOW_CONFIG = {
    directory: './images/gallery/',
    interval: 8000, // 8秒ごとに切り替え
    // GALLERY_DATA (js/gallery-data.js) を利用します
    get slides() {
        return typeof GALLERY_DATA !== 'undefined' ? GALLERY_DATA : [];
    }
};

function initHeroSlideshow() {
    const container = document.getElementById('hero-slideshow');
    if (!container || !HERO_SLIDESHOW_CONFIG.slides.length) return;

    // 画像のシャッフル（毎回ランダムな順序で開始）
    const shuffledSlides = [...HERO_SLIDESHOW_CONFIG.slides].sort(() => Math.random() - 0.5);

    // Slide要素の生成
    shuffledSlides.forEach((slideData, index) => {
        const slide = document.createElement('div');
        slide.className = 'hero__slide';
        if (index === 0) slide.classList.add('active');

        slide.style.backgroundImage = `url('${HERO_SLIDESHOW_CONFIG.directory}${slideData.file}')`;
        container.appendChild(slide);
    });

    // スライド切り替えロジック
    let currentIndex = 0;
    const slides = container.querySelectorAll('.hero__slide');

    if (slides.length > 1) {
        setInterval(() => {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add('active');
        }, HERO_SLIDESHOW_CONFIG.interval);
    }
}

// DOM読み込み完了時に実行
document.addEventListener('DOMContentLoaded', initHeroSlideshow);
