/************************************************************
 * PROGRAMA: Animación de círculos en Canvas (1 a 10 al recargar)
 * LENGUAJE: JavaScript
 * API: Canvas 2D
 *
 * DESCRIPCIÓN:
 * - El canvas ocupa toda la ventana.
 * - Cada vez que se recarga la página se generan ALEATORIAMENTE
 *   entre 1 y 10 círculos.
 * - Cada círculo tiene radio, color, velocidad y dirección inicial
 *   aleatoria (opción PRO: cualquier ángulo).
 * - Los círculos rebotan en los bordes del canvas.
 ************************************************************/

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

/* ==========================================================
   1) CANVAS A PANTALLA COMPLETA
   ========================================================== */
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.background = "#ff8";
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* ==========================================================
   2) UTILIDADES
   ========================================================== */
function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

/* ==========================================================
   3) CLASE CIRCLE
   ========================================================== */
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

    // Texto centrado
    context.fillStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "16px Arial";
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

    // Avanza posición
    this.posX += this.dx;
    this.posY += this.dy;
  }
}

/* ==========================================================
   4) CREAR ENTRE 1 Y 10 CÍRCULOS ALEATORIOS (AL INICIAR)
   ========================================================== */
const circles = [];

// Cantidad aleatoria entre 1 y 10 cada vez que recargas
const amount = Math.floor(Math.random() * 10) + 1;

for (let i = 0; i < amount; i++) {
  // Radio aleatorio (20 a 49)
  const radius = Math.floor(Math.random() * 30 + 20);

  // Margen para que NO se dibuje fuera del canvas
  const margin = radius + 2;

  // Posición inicial segura (no se sale)
  const x = randomBetween(margin, canvas.width - margin);
  const y = randomBetween(margin, canvas.height - margin);

  // Velocidad aleatoria (1 a 5)
  const speed = randomBetween(1, 5);

  // Color aleatorio con HSL (bonito y variado)
  const color = `hsl(${Math.random() * 360}, 80%, 45%)`;

  // Texto (número del círculo)
  const text = i + 1;

  circles.push(new Circle(x, y, radius, color, text, speed));
}

/* ==========================================================
   5) ANIMACIÓN
   ========================================================== */
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Actualiza todos los círculos
  for (let i = 0; i < circles.length; i++) {
    circles[i].update(ctx);
  }
}

animate();
