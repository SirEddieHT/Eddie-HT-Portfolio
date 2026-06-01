const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let droplets = [];
const dropletCount = 60; 
const colors = ['#bc13fe', '#00d4ff', '#ff007f']; 

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    droplets = [];
    for (let i = 0; i < dropletCount; i++) {
        droplets.push(new Droplet());
    }
}
// The following section is AI-assisted for optimization
class Droplet {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.speed = Math.random() * 1.5 + 0.5; // AI. SLOWER SPEED: Makes it feel more "floaty"
        this.radius = Math.random() * 4 + 2;    // AI. LARGER RADIUS: Easier to see behind the blur
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.6 + 0.3;
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.save(); // AI. Save state to apply glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        // AI. BOOSTED GLOW: This makes them visible through the glass blur
        ctx.shadowBlur = 15; 
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        
        ctx.fill();
        ctx.restore(); // Restore state so glow doesn't bleed into other drawings
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    droplets.forEach(d => {
        d.update();
        d.draw();
    });
    
    requestAnimationFrame(animate);
}
// remember event listener for future audio insertion from personal Audio Library
// recheck how python may be required for a bigger project
window.addEventListener('resize', init);
init();
animate();