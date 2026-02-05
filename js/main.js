const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Sliders
const circlesSlider = document.getElementById("circlesSlider");
const widthSlider = document.getElementById("widthSlider");
const heightSlider = document.getElementById("heightSlider");

// Textos de valores
const circlesValue = document.getElementById("circlesValue");
const widthValue = document.getElementById("widthValue");
const heightValue = document.getElementById("heightValue");

// Utilidad random
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

    // Dirección inicial aleatoria (opción PRO)
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

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// Arreglo de círculos
let circles = [];

/**
 * Ajusta tamaño del canvas según sliders
 */
function applyCanvasSize() {
  canvas.width = Number(widthSlider.value);
  canvas.height = Number(heightSlider.value);

  widthValue.textContent = canvas.width;
  heightValue.textContent = canvas.height;
}

/**
 * Genera EXACTAMENTE N círculos (reemplaza los actuales)
 */
function generateCircles(n) {
  circles = [];

  for (let i = 0; i < n; i++) {
    const radius = Math.floor(Math.random() * 30 + 15); // 15 a 44
    const margin = radius + 2;

    const x = randomBetween(margin, canvas.width - margin);
    const y = randomBetween(margin, canvas.height - margin);

    const speed = randomBetween(1, 5);
    const color = `hsl(${Math.random() * 360}, 80%, 45%)`;
    const text = i + 1;

    circles.push(new Circle(x, y, radius, color, text, speed));
  }

  circlesValue.textContent = n;
}

/**
 * (Opcional) Genera MÁS círculos sin borrar los existentes.
 * Útil si quieres que al mover hacia arriba "se agreguen" y no regenere todo.
 */
function addCirclesUntil(n) {
  const current = circles.length;
  if (n <= current) {
    // si bajas el slider, recortamos
    circles = circles.slice(0, n);
    circlesValue.textContent = n;
    return;
  }

  for (let i = current; i < n; i++) {
    const radius = Math.floor(Math.random() * 30 + 15);
    const margin = radius + 2;

    const x = randomBetween(margin, canvas.width - margin);
    const y = randomBetween(margin, canvas.height - margin);

    const speed = randomBetween(1, 5);
    const color = `hsl(${Math.random() * 360}, 80%, 45%)`;
    const text = i + 1;

    circles.push(new Circle(x, y, radius, color, text, speed));
  }

  circlesValue.textContent = n;
}

// ====== Inicialización ======
applyCanvasSize();
generateCircles(Number(circlesSlider.value));

// ====== Eventos de sliders ======

// Al mover ancho/alto: cambia tamaño y reajusta círculos para no "quedarse fuera"
widthSlider.addEventListener("input", () => {
  applyCanvasSize();
});

heightSlider.addEventListener("input", () => {
  applyCanvasSize();
});

// Al mover cantidad: opción 1 (regenere todo):
// circlesSlider.addEventListener("input", () => generateCircles(Number(circlesSlider.value)));

// Al mover cantidad: opción 2 (más natural): agrega/recorta sin resetear todo
circlesSlider.addEventListener("input", () => addCirclesUntil(Number(circlesSlider.value)));

// ====== Animación ======
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < circles.length; i++) {
    circles[i].update(ctx);
  }
}

animate();
