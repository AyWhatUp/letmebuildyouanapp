document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    body.style.background = '#da17eb';
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
            speedY: Math.random() * 0.5 - 0.25,
            repelX: 0,
            repelY: 0,
            repelDecay: 0
        });
    }

    const mouse = {
        x: null,
        y: null
    };
    canvas.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
            ctx.fill();

            // Apply continuous natural movement with slight refresh
            p.x += p.speedX;
            p.y += p.speedY;
            p.speedX += (Math.random() * 0.02 - 0.01);
            p.speedY += (Math.random() * 0.02 - 0.01);

            // Repulsion effect from mouse
            if (mouse.x !== null && mouse.y !== null) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const repulsionRadius = 100;
                if (distance < repulsionRadius) {
                    const force = (repulsionRadius - distance) / repulsionRadius * 0.4;
                    p.repelX = (dx / distance) * force * 2;
                    p.repelY = (dy / distance) * force * 2;
                    p.repelDecay = 20;
                }
            }

            // Apply and decay repulsion
            if (p.repelDecay > 0) {
                p.speedX += p.repelX;
                p.speedY += p.repelY;
                p.repelDecay -= 1;
                p.repelX *= 0.8;
                p.repelY *= 0.8;
            }

            // Boundary check with minimal energy loss
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -0.95;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -0.95;
        }
        requestAnimationFrame(animate);
    }
    animate();

    const colors = ['#da17eb', '#ff8c00', '#4a90e2', '#2ecc71'];
    let currentSection = 0;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const sectionHeight = window.innerHeight;
        const newSection = Math.floor(scrollPosition / sectionHeight);

        if (newSection !== currentSection && newSection < sections.length) {
            currentSection = newSection;
            body.style.background = colors[currentSection % colors.length];
            body.style.transition = 'background 0.5s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 500);
        }
    });

    console.log('Website loaded!');
});