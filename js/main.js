const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Ajusta el canvas al tamaño de la ventana
function resizeCanvas() {
  canvas.width = window.innerWidth/2;
  canvas.height = window.innerHeight/2;
  canvas.style.background = "#ff8";
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Número aleatorio entre min y max
function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.speed = speed;

    // 🔥 Opción PRO: dirección inicial en cualquier ángulo
    const angle = Math.random() * Math.PI * 2;
    this.dx = Math.cos(angle) * this.speed;
    this.dy = Math.sin(angle) * this.speed;
  }

  draw(context) {
    context.beginPath();

    // Texto al centro
    context.fillStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(this.text, this.posX, this.posY);

    // Círculo
    context.lineWidth = 2;
    context.strokeStyle = this.color;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    context.stroke();

    context.closePath();
  }

  update(context) {
    this.draw(context);

    const w = canvas.width;
    const h = canvas.height;

    // Rebote en X
    if (this.posX + this.radius > w) this.dx = -Math.abs(this.dx);
    if (this.posX - this.radius < 0) this.dx = Math.abs(this.dx);

    // Rebote en Y
    if (this.posY + this.radius > h) this.dy = -Math.abs(this.dy);
    if (this.posY - this.radius < 0) this.dy = Math.abs(this.dy);

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// Radio aleatorio (30 a 129)
const randomRadius = Math.floor(Math.random() * 100 + 30);

// Posición inicial segura (no se sale)
const margin = randomRadius + 2;
const startX = randomBetween(margin, canvas.width - margin);
const startY = randomBetween(margin, canvas.height - margin);

// Crear círculos con distintas velocidades
const miCirculo = new Circle(startX, startY, randomRadius, "blue", "Tec1", 5);
const miCirculo2 = new Circle(startX + 80, startY + 80, randomRadius, "red", "Tec2", 2);

// Animación
function updateCircle() {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  miCirculo.update(ctx);
  miCirculo2.update(ctx);
}

updateCircle();

