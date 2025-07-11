
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");

  // Minimum loader time
  const minLoaderTime = 2000;
  const startTime = performance.now();

  // Fade out loader with scale up animation
  function hideLoader() {
    loader.style.opacity = 0;
    //loader.style.transform = "scale(1.5)";
    setTimeout(() => {
      loader.style.display = "none";
      content.style.visibility = "visible";
      initAnimations();
    }, 800);
  }

  // Wait at least minLoaderTime before hiding loader
  function checkLoaderTime() {
    const elapsed = performance.now() - startTime;
    if (elapsed >= minLoaderTime) {
      hideLoader();
    } else {
      setTimeout(hideLoader, minLoaderTime - elapsed);
    }
  }

  checkLoaderTime();

  function initAnimations() {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Animate hero title typing effect
    const heroTitle = document.getElementById("hero-title");
    const fullText = "<Aarush-Pahuja>";
    heroTitle.style.fontFamily = "'Source Code Pro', monospace";
    heroTitle.style.whiteSpace = "nowrap";
    heroTitle.style.overflow = "hidden";
    heroTitle.style.borderRight = "2px solid var(--accent)";
    let i = 0;

    function typeWriter() {
      if (i <= fullText.length) {
        heroTitle.textContent = fullText.substring(0, i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        heroTitle.style.borderRight = "none";
        // Animate subtitle fade in
        gsap.to("#hero-subtitle", {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
        });
        gsap.to(".scroll-hint", {
          opacity: 0.7,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: "power3.out",
        });
      }
    }
    heroTitle.style.opacity = 1;
    heroTitle.style.transform = "translateY(20px)";
    gsap.to(heroTitle, { opacity: 1, y: 0, duration: 1, delay: 0.3 });
    typeWriter();

    // Animate each section on scroll with fade + slide from bottom
    gsap.utils.toArray(".section").forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Animate project cards with staggered fade and slide up
    gsap.utils.toArray(".project-card:not(.wip)").forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: i * 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    });

    // VANTA.NET background on hero


    const isLight = document.documentElement.classList.contains('light-mode');
    if (window.VANTA) {
      // Delay init slightly to avoid race conditions
      setTimeout(() => {
        VANTA.NET({
          el: "#hero-bg",
          mouseControls: true,
          touchControls: true,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: isLight ? 0x91b3a7 : 0x0e0f11,
          color: isLight ? 0x121237 : 0x1abc9c,
          spacing: 30,
          maxDistance: 20,
        });
      }, 100);
    }

    new ExperienceSlider();



  }


  class ExperienceSlider {
    constructor() {
      this.slides = document.querySelectorAll('.experience-slide');
      this.dotsContainer = document.querySelector('.slider-dots');
      this.prevBtn = document.querySelector('.prev-btn');
      this.nextBtn = document.querySelector('.next-btn');
      this.sliderContainer = document.querySelector('.experience-slider');
      this.currentIndex = 0;
      this.isAnimating = false;
      this.scrollTimeout = null;
      this.isHovering = false;

      this.init();
    }

    init() {
      // Create dots
      this.slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => this.goToSlide(i));
        this.dotsContainer.appendChild(dot);
      });

      // Event listeners
      this.prevBtn.addEventListener('click', () => this.prevSlide());
      this.nextBtn.addEventListener('click', () => this.nextSlide());

      // Hover detection
      this.sliderContainer.addEventListener('mouseenter', () => {
        this.isHovering = true;
        document.body.style.overflow = 'hidden'; // Prevent page scrolling
      });

      this.sliderContainer.addEventListener('mouseleave', () => {
        this.isHovering = false;
        document.body.style.overflow = ''; // Re-enable page scrolling
      });

      // Wheel event - only when hovering
      this.sliderContainer.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (!this.isHovering) return;
        if (e.key === 'ArrowLeft') this.prevSlide();
        if (e.key === 'ArrowRight') this.nextSlide();
      });

      // Initial position
      this.updateSlides();
    }

    handleWheel(e) {
      if (!this.isHovering || this.isAnimating) return;

      // Prevent default to stop page scrolling
      e.preventDefault();

      // Throttle wheel events
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }, 100);
    }

    goToSlide(index) {
      if (this.isAnimating || index === this.currentIndex) return;

      this.isAnimating = true;
      this.currentIndex = index;
      this.updateSlides();

      setTimeout(() => {
        this.isAnimating = false;
      }, 800);
    }

    prevSlide() {
      if (this.isAnimating) return;
      this.currentIndex = Math.max(0, this.currentIndex - 1);
      this.updateSlides();
      this.isAnimating = true;

      setTimeout(() => {
        this.isAnimating = false;
      }, 800);
    }

    nextSlide() {
      if (this.isAnimating) return;
      this.currentIndex = Math.min(this.slides.length - 1, this.currentIndex + 1);
      this.updateSlides();
      this.isAnimating = true;

      setTimeout(() => {
        this.isAnimating = false;
      }, 800);
    }

    updateSlides() {
      // Update slides
      this.slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev', 'next');

        if (index === this.currentIndex) {
          slide.classList.add('active');
        } else if (index < this.currentIndex) {
          slide.classList.add('prev');
        } else {
          slide.classList.add('next');
        }
      });

      // Update dots
      const dots = document.querySelectorAll('.slider-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentIndex);
      });

      // Update buttons
      this.prevBtn.disabled = this.currentIndex === 0;
      this.nextBtn.disabled = this.currentIndex === this.slides.length - 1;
    }
  }

});
