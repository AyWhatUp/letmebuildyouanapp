document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
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

    const glimmerParticles = [];
    for (let i = 0; i < 20; i++) {
        glimmerParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speed: 1.5 + Math.random() * 0.5,
            radius: Math.random() * 2 + 1,
            opacity: Math.random() * 0.4 + 0.2
        });
    }

    const mouse = { x: null, y: null };
    canvas.addEventListener('mousemove', (event) => { mouse.x = event.x; mouse.y = event.y; });
    canvas.addEventListener('touchmove', (event) => { const touch = event.touches[0]; mouse.x = touch.clientX; mouse.y = touch.clientY; }, { passive: true });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Glimmer wave effect
        glimmerParticles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.fill();
            p.x += p.speed;
            if (p.x > canvas.width) p.x = 0;
            p.y += (Math.random() - 0.5) * 0.5;
            if (p.y < 0 || p.y > canvas.height) p.y = Math.random() * canvas.height;
        });

        // Particle animation
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
    let currentColorIndex = 0;

    // Detect Safari (simplified check)
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
        body.style.background = colors[0]; // Stick to first color for Safari
    } else {
        function changeBackgroundColor() {
            body.style.background = colors[currentColorIndex];
            body.style.transition = 'background 1s ease';
            setTimeout(() => { body.style.transition = ''; }, 1000);
            currentColorIndex = (currentColorIndex + 1) % colors.length;
        }

        // Initial color
        changeBackgroundColor();
        // Change every 10 seconds for non-Safari browsers
        setInterval(changeBackgroundColor, 10000);
    }

    console.log('Website loaded!');
});