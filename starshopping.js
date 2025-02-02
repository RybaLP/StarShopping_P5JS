let gwiazdy = [];
let resetuj = false;

function setup() {
  createCanvas(890, 800);
  background(0); // Ustawienie czarnego tła
  textAlign(CENTER, CENTER);
  textSize(50);
  fill(255);
  noStroke();

  // Tworzenie gwiazd w tle
  for (let i = 0; i < 260; i++) {
    gwiazdy.push(new Gwiazda());
  }

  // Inicjalizacja zmiennej resetuj na początku
  resetuj = false;
}

function draw() {
  background(0); // Odświeżenie czarnego tła w każdej klatce

  // Rysowanie gwiazd
  for (let gwiazda of gwiazdy) {
    gwiazda.rysuj();
    gwiazda.aktualizuj();
  }

  // Rysowanie napisu "Star Shopping" w pionie
  textFont('sans-serif');
  fill(255);
  textSize(40);
  text("S\nT\nA\nR\nS\nH\nO\nP\nP\nI\nN\nG", width / 2, height / 2);

  if (resetuj) {
    // Resetowanie pozycji gwiazd
    for (let gwiazda of gwiazdy) {
      gwiazda.x = random(width);
      gwiazda.y = random(height);
      gwiazda.predkoscX = random(-0.5, 0.5);
      gwiazda.predkoscY = random(-0.5, 0.5);
    }
    resetuj = false;
  }
}

function mouseMoved() {
  // Reakcja na ruch myszy - dodawanie ruchu gwiazdom
  for (let gwiazda of gwiazdy) {
    gwiazda.przyspiesz(mouseX, mouseY);
  }
}


function keyPressed() {
  if (key === 'c' || key === 'C') {
    resetuj = true;
  }
}

class Gwiazda {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.predkoscX = random(-0.5, 0.5);
    this.predkoscY = random(-0.5, 0.5);
    this.rozmiar = random(2, 6); // Zwiększony zakres rozmiarów gwiazd
  }
 
  aktualizuj() {

    this.x += this.predkoscX;
    this.y += this.predkoscY;

    // Zapobieganie wychodzeniu gwiazd poza ekran
    if (this.x < 0 || this.x > width) {
      this.predkoscX *= -1.3; 
      this.x = constrain(this.x, 0, width);
    }
    if (this.y < 0 || this.y > height) {
      this.predkoscY *= -1.3; 
      this.y = constrain(this.y, 0, height);
    }

    // Powolne zmniejszanie prędkości
    this.predkoscX *= 0.98;
    this.predkoscY *= 0.98;
  }

  rysuj() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.rozmiar);
  }

  przyspiesz(mx, my) {
    let dx = this.x - mx;
    let dy = this.y - my;
    let dystans = sqrt(dx * dx + dy * dy);
    let sila = constrain(200 / dystans, 0, 5);
    this.predkoscX += (dx / dystans) * sila * 0.1;
    this.predkoscY += (dy / dystans) * sila * 0.1;
  }

}