
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
    requestAnimationFrame(checkLoaderTime);
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
    
// Contact Section Reveal Animation
const contactSection = document.querySelector('.contact');
const backToTopBtn = document.getElementById('backToTop');

// Create intersection observer for scroll-triggered animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2 // Trigger when 20% of the element is visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add reveal class to trigger animations
      entry.target.classList.add('reveal');
      
      // Optional: Stop observing once revealed (animation only plays once)
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Start observing the contact section
if (contactSection) {
  observer.observe(contactSection);
}

// Back to Top Button functionality
function toggleBackToTop() {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
}

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Event listeners for back to top
window.addEventListener('scroll', toggleBackToTop);
backToTopBtn.addEventListener('click', scrollToTop);

// Enhanced contact icon interactions
const contactIcons = document.querySelectorAll('.contact-icon');

contactIcons.forEach(icon => {
  // Add click ripple effect
  icon.addEventListener('click', function(e) {
    // Create ripple element
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    // Position ripple at click location
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    this.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
  
  // Add hover sound effect (optional - can be commented out)
  icon.addEventListener('mouseenter', function() {
    // You can add a subtle hover sound here if desired
    // For now, we'll just add a subtle vibration effect on supported devices
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  });
  
  // Add focus handling for keyboard accessibility
  icon.addEventListener('focus', function() {
    this.style.transform = 'scale(1.05)';
  });
  
  icon.addEventListener('blur', function() {
    this.style.transform = 'scale(1)';
  });
});

// Smooth scroll enhancement for contact links
const contactLinks = document.querySelectorAll('.contact-info a[href^="mailto"]');
contactLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    // Add a subtle animation feedback
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 100);
  });
});

// Fallback for older browsers that don't support IntersectionObserver
if (!window.IntersectionObserver) {
  console.log('IntersectionObserver not supported, using scroll fallback');
  
  window.addEventListener('scroll', () => {
    if (contactSection && !contactSection.classList.contains('reveal')) {
      const sectionTop = contactSection.offsetTop;
      const sectionHeight = contactSection.offsetHeight;
      const scrollPosition = window.pageYOffset + window.innerHeight;
      
      // Trigger when section is 20% visible
      if (scrollPosition > sectionTop + (sectionHeight * 0.2)) {
        contactSection.classList.add('reveal');
      }
    }
  });
}


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
