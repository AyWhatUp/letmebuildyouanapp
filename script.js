document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const sections = document.querySelectorAll('.header, .steps, .story, .footer');
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const particles = [];
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 2,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25
        });
    }

    const mouse = { x: null, y: null };
    canvas.addEventListener('mousemove', (event) => { mouse.x = event.x; mouse.y = event.y; });
    canvas.addEventListener('touchmove', (event) => { const touch = event.touches[0]; mouse.x = touch.clientX; mouse.y = touch.clientY; }, { passive: true });

    let gradientOffset = 0;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Enhanced gradient overlay with faster, more visible animation
        gradientOffset = (gradientOffset + 2) % canvas.width; // Faster shift
        const gradient = ctx.createLinearGradient(gradientOffset, 0, gradientOffset + canvas.width / 2, 0);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.5, 'rgba(74, 144, 226, 0.5)'); // More vibrant
        gradient.addColorStop(0.7, 'rgba(147, 112, 219, 0.3)'); // Subtle purple
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.7; // More visible
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1.0;

        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
            ctx.fill();
            p.x += p.speedX;
            p.y += p.speedY;
            p.speedX += (Math.random() * 0.02 - 0.01);
            p.speedY += (Math.random() * 0.02 - 0.01);
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -0.95;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -0.95;
        }
        requestAnimationFrame(animate);
    }
    animate();

    const colors = ['#da17eb', '#ff8c00', '#4a90e2', '#2ecc71'];
    let currentSection = 0;

    function updateBackground() {
        const scrollPosition = window.scrollY + (window.innerHeight / 2);
        const sectionHeight = window.innerHeight;
        const newSection = Math.min(Math.floor(scrollPosition / sectionHeight), sections.length - 1);

        if (newSection !== currentSection) {
            currentSection = newSection;
            if (window.innerWidth > 600) {
                body.style.background = colors[currentSection % colors.length];
                body.style.transition = 'background 0.5s ease';
                setTimeout(() => { body.style.transition = ''; }, 500);
            }
        }
    }

    window.addEventListener('scroll', updateBackground, { passive: true });
    window.addEventListener('touchmove', updateBackground, { passive: true });
    requestAnimationFrame(updateBackground);

    console.log('Website loaded!');
});