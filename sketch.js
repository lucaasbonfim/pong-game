//váriaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro/2;

//velocidade da bolinha
let velocidadeXBolinha = 4;
let velocidadeYBolinha = 4;

//váriaveis da raquete
let xRaquete = 10;
let yRaquete = 175;
let compRaquete = 10;
let altRaquete = 60;
let colidiu = false;

//variáveis do oponente
let xRaqueteOponente = 580;
let yRaqueteOponente = 175;
let velocidadeYOponente;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha > width-raio || xBolinha < 0+raio) {
    velocidadeXBolinha *= -1;
    ponto.play();
    if (xBolinha < raio) {
      pontosOponente += 1;
    } else {
      meusPontos += 1;
    }
  }
  if(yBolinha > height-raio || yBolinha < 0+raio) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, compRaquete, altRaquete);
}


function movimentaRaquete() {
  if (keyIsDown(87)) {
    if (yRaquete > 5) {
      yRaquete -= 5;
    }
  }

  if (keyIsDown(83)) {
    if (yRaquete < height - altRaquete - 5){
      yRaquete += 5;
    }
  }
}

function movimentaRaqueteOponente() {
  if (keyIsDown(UP_ARROW)) {
    if (yRaqueteOponente > 5) {
      yRaqueteOponente -= 5;
    }
  }

  if (keyIsDown(DOWN_ARROW)) {
    if (yRaqueteOponente < height - altRaquete - 5){
      yRaqueteOponente += 5;
    }
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, compRaquete, altRaquete, xBolinha, yBolinha, raio);
  if (colidiu) {
    raquetada.play();
    velocidadeXBolinha *= -1;
  }
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(130, 10, 40, 20);
  rect(430, 10, 40, 20);
  fill(255);
  text(meusPontos, 150, 26);
  text(pontosOponente, 450, 26);
}
