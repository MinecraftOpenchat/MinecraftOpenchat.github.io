/**
 * ==========================================================================
 * メインJavaScript - マインクラフトコミュニティサイト
 * ==========================================================================
 */

// DOM要素を取得
const elements = {
  header: document.querySelector('.header'),
  menuToggle: document.querySelector('.header__menu-toggle'),
  nav: document.querySelector('.nav'),
  navLinks: document.querySelectorAll('.nav__link'),
  scrollRevealElements: document.querySelectorAll('.scroll-reveal')
};

/**
 * ヘッダーのスクロール効果
 */
function initScrollHeader() {
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      elements.header.classList.add('scrolled');
    } else {
      elements.header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

/**
 * スムーズスクロール
 */
function initSmoothScroll() {
  elements.navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // 内部リンクの場合のみスムーズスクロール
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // モバイルメニューを閉じる
          if (window.innerWidth <= 768) {
            elements.nav.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
          }
          
          // スムーズスクロール
          const headerHeight = elements.header.offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // アクティブリンクを更新
          updateActiveLink(this);
        }
      }
    });
  });
}

/**
 * アクティブなナビゲーションリンクを更新
 */
function updateActiveLink(activeLink) {
  elements.navLinks.forEach(link => {
    link.classList.remove('active');
  });
  activeLink.classList.add('active');
}

/**
 * スクロール位置に基づいてアクティブリンクを更新
 */
function initScrollSpy() {
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        elements.navLinks.forEach(link => {
          link.classList.remove('active');
          
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/**
 * モバイルメニューの切り替え
 */
function initMobileMenu() {
  if (elements.menuToggle) {
    elements.menuToggle.addEventListener('click', () => {
      elements.nav.classList.toggle('active');
      document.body.classList.toggle('mobile-menu-open');
      
      // アイコンの変更（ハンバーガー ⇔ ×）
      const icon = elements.menuToggle.querySelector('i');
      if (icon) {
        if (elements.nav.classList.contains('active')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });
  }
}

/**
 * スクロールアニメーション（Intersection Observer）
 */
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  elements.scrollRevealElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * サーバーアドレスのコピー機能
 */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.card__copy-btn');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', async function() {
      const addressText = this.parentElement.querySelector('.card__address-text');
      
      if (addressText) {
        try {
          await navigator.clipboard.writeText(addressText.textContent);
          
          // ボタンのテキストを一時的に変更
          const originalText = this.textContent;
          this.textContent = 'コピーしました！';
          this.style.background = 'var(--accent-emerald)';
          
          setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
          }, 2000);
        } catch (err) {
          console.error('コピーに失敗しました:', err);
          alert('コピーに失敗しました');
        }
      }
    });
  });
}

/**
 * ページロード時のアニメーション
 */
function initPageLoadAnimation() {
  document.body.style.opacity = '0';
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
    }, 100);
  });
}

/**
 * 初期化
 */
function init() {
  initScrollHeader();
  initSmoothScroll();
  initScrollSpy();
  initMobileMenu();
  initScrollReveal();
  initCopyButtons();
  initPageLoadAnimation();
  
  console.log('🎮 マインクラフトコミュニティサイトが読み込まれました！');
}

// DOMContentLoadedイベントで初期化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
