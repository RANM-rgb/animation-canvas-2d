# 🎯 Animación de Círculos en Canvas con JavaScript

Este proyecto demuestra el uso de la **API Canvas 2D de JavaScript** junto con **Programación Orientada a Objetos (POO)** para crear y animar círculos que se mueven dentro de la pantalla y **rebotan en los bordes**.

## 📌 Características

- Uso de `<canvas>` a pantalla completa.
- Implementación de una clase `Circle`.
- Animación con `requestAnimationFrame`.
- Detección de colisiones con los bordes de la pantalla.
- Dos círculos con diferentes velocidades y colores.
- Limpieza y redibujado del canvas en cada frame.

---

## 🛠️ Tecnologías utilizadas

- HTML5
- JavaScript
- API Canvas 2D

---

## ▶️ Cómo ejecutar el proyecto

1. Clona o descarga este repositorio.
2. Abre el archivo `index.html` en tu navegador.
3. Verás dos círculos moviéndose y rebotando dentro de la ventana.

También puedes verlo publicado en GitHub Pages (si aplica).

---

## 🧠 Descripción general del funcionamiento

1. Se obtiene el elemento `canvas` del HTML y su contexto 2D.
2. El canvas se ajusta al tamaño de la ventana del navegador.
3. Se define la clase `Circle`, que contiene:
   - Posición (`posX`, `posY`)
   - Radio (`radius`)
   - Color (`color`)
   - Texto (`text`)
   - Velocidad (`speed`)
   - Dirección de movimiento (`dx`, `dy`)
4. Cada círculo:
   - Se dibuja con el método `draw()`.
   - Se actualiza con el método `update()`, que:
     - Cambia su posición.
     - Verifica colisiones con los bordes.
     - Invierte la dirección cuando toca un límite.
5. Se usa `requestAnimationFrame` para crear la animación continua.

---

## 📄 Código principal

```js
const canvas = document.getElementById("canvas"); 
let ctx = canvas.getContext("2d");

// Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

// El canvas tiene las mismas dimensiones que la pantalla
canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.speed = speed;

    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
  }

  draw(context) {
    context.beginPath();
    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(this.text, this.posX, this.posY);
    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }

  update(context) {
    this.draw(context);

    // Rebote en los bordes
    if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// Creación de círculos
let randomX = Math.random() * window_width;
let randomY = Math.random() * window_height;
let randomRadius = Math.floor(Math.random() * 100 + 30);

let miCirculo = new Circle(randomX, randomY, randomRadius, "blue", "Tec1", 5);
let miCirculo2 = new Circle(randomX, randomY, randomRadius, "red", "Tec2", 2);

// Función de animación
let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);
  miCirculo.update(ctx);
  miCirculo2.update(ctx);
};

updateCircle();
