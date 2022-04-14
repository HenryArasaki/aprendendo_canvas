const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
let particulas = []
let hue = 0


canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: undefined,
    y: undefined
}

class Particle {
    constructor() {
        this.x = mouse.x
        this.y = mouse.y
        this.color = `hsl(${hue},100%,50%)`
        this.radius = Math.random() * 5 + 4
        this.speedX = Math.random() * 6 - 3
        this.speedY = Math.random() * 6 - 3
    }
    update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.radius >= 0.2) {
            this.radius -= 0.1
        }
    }
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
    }
}

function handleParticles() {
    for (i = 0; i < particulas.length; i++) {
        particulas[i].update()
        particulas[i].draw()
        for (j = i; j < particulas.length; j++) {
            let dx = particulas[i].x - particulas[j].x
            let dy = particulas[i].y - particulas[j].y
            let dh = Math.sqrt(dx * dx + dy * dy)
            if (dh < 100) {

                c.beginPath()
                c.moveTo(particulas[i].x, particulas[i].y)
                c.lineTo(particulas[j].x, particulas[j].y)
                c.strokeStyle = particulas[i].color
                c.stroke()
            }
        }

        if (particulas[i].radius < 0.5) {
            particulas.splice(i, 1)
        }

    }
}

canvas.addEventListener('mousedown', (e) => {
    mouse.x = e.x
    mouse.y = e.y

    for(let z=0;z<10;z++){
        particulas.push(particula = new Particle())
 
    }
})

canvas.addEventListener('touchmove', (e) => {
    mouse.x = e.x
    mouse.y = e.y
    particulas.push(particula = new Particle())

})

canvas.addEventListener('ontouchstart', (e) => {
    mouse.x = e.x
    mouse.y = e.y
    for(let z=0;z<15;z++){
        particulas.push(particula = new Particle())
    
    }
})

canvas.addEventListener('touchend', (e) => {
    mouse.x = e.x
    mouse.y = e.y
    for(let z=0;z<15;z++){
        particulas.push(particula = new Particle())

    }
})



function animate() {
    c.fillStyle = 'rgba(0,0,0,0.2)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    handleParticles()
    hue += 0.5
    requestAnimationFrame(animate)
}
animate()