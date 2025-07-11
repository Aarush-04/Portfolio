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
    if (window.VANTA) {
  // Delay init slightly to avoid race conditions
        setTimeout(() => {
            VANTA.NET({
            el: "#hero-bg",
            mouseControls: true,
            touchControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0x0e0f11,
            color: 0x1abc9c,
            spacing: 30,
            maxDistance: 20,
            });
        }, 100);
    }

  }
});
