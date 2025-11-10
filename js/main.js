// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initLoading();
    initCustomCursor();
    init3DBackground();
    initScrollAnimations();
    initCounters();
    initPhotoGallery();
    initEnvelope();
    initHeartCanvas();
    initMusicPlayer();
});

// ========================================
// LOADING SCREEN
// ========================================

function initLoading() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loadingScreen = document.querySelector('.loading-screen');
            loadingScreen.classList.add('hidden');

            // Start entrance animations
            animateHeroSection();
        }, 2000);
    });
}

function animateHeroSection() {
    gsap.from('.main-title .title-line', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power4.out'
    });

    gsap.from('.date-badge', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'back.out(1.7)'
    });

    gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.9
    });
}

// ========================================
// CUSTOM CURSOR
// ========================================

function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (!cursor || !cursorFollower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth follow effect
    function animateFollower() {
        const distX = mouseX - followerX;
        const distY = mouseY - followerY;

        followerX += distX * 0.1;
        followerY += distY * 0.1;

        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .photo-card, .envelope, .reason-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// ========================================
// 3D BACKGROUND WITH THREE.JS
// ========================================

function init3DBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;

    // Create heart-shaped particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    function animate() {
        requestAnimationFrame(animate);

        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x = mouseY * 0.1;
        particlesMesh.rotation.y += mouseX * 0.01;

        renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ========================================
// SCROLL ANIMATIONS WITH GSAP
// ========================================

function initScrollAnimations() {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Counter Section
    gsap.from('.counter-section', {
        scrollTrigger: {
            trigger: '.counter-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Gallery Cards
    gsap.from('.photo-card', {
        scrollTrigger: {
            trigger: '.gallery-section',
            start: 'top 70%',
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Reason Cards
    gsap.from('.reason-card', {
        scrollTrigger: {
            trigger: '.reasons-section',
            start: 'top 70%',
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    });

    // Letter Section
    gsap.from('.envelope', {
        scrollTrigger: {
            trigger: '.letter-section',
            start: 'top 70%',
        },
        rotateY: 180,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Final Section
    gsap.from('.final-content', {
        scrollTrigger: {
            trigger: '.final-section',
            start: 'top 70%',
        },
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
}

// ========================================
// ANIMATED COUNTERS
// ========================================

function initCounters() {
    const counterNumbers = document.querySelectorAll('.counter-number');
    let hasAnimated = false;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                counterNumbers.forEach(counter => {
                    animateCounter(counter);
                });
            }
        });
    }, observerOptions);

    const counterSection = document.querySelector('.counter-section');
    if (counterSection) {
        observer.observe(counterSection);
    }
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };

    updateCounter();
}

// ========================================
// PHOTO GALLERY WITH TILT EFFECT
// ========================================

function initPhotoGallery() {
    const photoCards = document.querySelectorAll('.photo-card[data-tilt]');

    photoCards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);

        // Touch support for mobile
        card.addEventListener('touchmove', handleTiltTouch);
        card.addEventListener('touchend', resetTilt);
    });
}

function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
}

function handleTiltTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
}

function resetTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
}

// ========================================
// ENVELOPE ANIMATION
// ========================================

function initEnvelope() {
    const envelope = document.getElementById('envelope');
    if (!envelope) return;

    let isOpened = false;

    envelope.addEventListener('click', () => {
        if (!isOpened) {
            envelope.classList.add('opened');
            isOpened = true;

            // Play sound effect (optional)
            playSound('open');

            // Hide hint
            const hint = document.querySelector('.envelope-hint');
            if (hint) {
                hint.style.opacity = '0';
            }
        } else {
            envelope.classList.remove('opened');
            isOpened = false;

            // Show hint again
            const hint = document.querySelector('.envelope-hint');
            if (hint) {
                hint.style.opacity = '1';
            }
        }
    });
}

// ========================================
// INTERACTIVE HEART CANVAS
// ========================================

function initHeartCanvas() {
    const canvas = document.getElementById('heart-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const hearts = [];

    class Heart {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 20 + 10;
            this.speedY = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 2;
            this.opacity = 1;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.font = `${this.size}px serif`;
            ctx.fillText('❤️', this.x, this.y);
            ctx.restore();
        }

        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            this.opacity -= 0.01;
        }
    }

    function addHeart(x, y) {
        hearts.push(new Heart(x, y));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        hearts.forEach((heart, index) => {
            heart.update();
            heart.draw();

            if (heart.opacity <= 0) {
                hearts.splice(index, 1);
            }
        });

        requestAnimationFrame(animate);
    }
    animate();

    // Mouse/Touch events
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        addHeart(x, y);
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        addHeart(x, y);
    });

    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Create burst of hearts
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                addHeart(x, y);
            }, i * 50);
        }
    });

    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
}

// ========================================
// MUSIC PLAYER (OPTIONAL)
// ========================================

function initMusicPlayer() {
    const musicToggle = document.getElementById('musicToggle');
    if (!musicToggle) return;

    let isPlaying = false;

    musicToggle.addEventListener('click', () => {
        if (!isPlaying) {
            // Start music (you can add actual audio file here)
            musicToggle.classList.add('playing');
            isPlaying = true;

            // Example: const audio = new Audio('music.mp3');
            // audio.play();
        } else {
            // Stop music
            musicToggle.classList.remove('playing');
            isPlaying = false;

            // audio.pause();
        }
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function playSound(type) {
    // Optional: Add sound effects
    // const audio = new Audio(`sounds/${type}.mp3`);
    // audio.play();
}

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');

    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Create random floating hearts in background
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.textContent = Math.random() > 0.5 ? '❤️' : '💕';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '100vh';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    heart.style.opacity = '0.3';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '0';
    heart.style.transition = 'all 10s linear';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.style.top = '-100px';
        heart.style.transform = `rotate(${Math.random() * 360}deg)`;
    }, 100);

    setTimeout(() => {
        heart.remove();
    }, 10000);
}

// Create floating hearts periodically
setInterval(createFloatingHeart, 3000);

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-8);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        triggerSpecialEffect();
    }
});

function triggerSpecialEffect() {
    // Create heart explosion
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 100);
    }

    // Add special message
    const message = document.createElement('div');
    message.textContent = '사랑해 💖💖💖';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.fontSize = '64px';
    message.style.color = 'white';
    message.style.textShadow = '0 0 20px rgba(255, 182, 193, 0.8)';
    message.style.zIndex = '10000';
    message.style.animation = 'heartbeat 1s ease-in-out 3';

    document.body.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('%c💖 Made with love 💖', 'font-size: 20px; color: #FFB6C1; font-weight: bold;');
console.log('%c빼빼로데이 축하해! 🎉', 'font-size: 16px; color: #FF69B4;');
