const botaoStart = document.getElementById('start');

const menu = document.getElementById('containerMenu');

const cenario1 = document.getElementById('cenario_1');
const cenario2 = document.getElementById('cenario_2');
const cenario3 = document.getElementById('cenario_3');
const cenario4 = document.getElementById('cenario_4')
const portaLeft = document.getElementById('portaLEFT')
const portaRight = document.getElementById('portaRIGHT')
const portasAbertas = document.getElementById('portasABERTAS')
const portasFechadas = document.getElementById('portasFECHADAS')

const dialogosCena1 = document.querySelectorAll('.cena1.text');
const dialogosCena2 = document.querySelectorAll('.cena2.text');
const dialogosCena3 = document.querySelectorAll('.cena3.text');
const dialogosCena4 = document.querySelectorAll('.cena4.text')
const botoes = document.querySelectorAll('.botaoSkipar');

let indiceCena1 = 0;
let indiceCena2 = 0;
let indiceCena3 = 0;
let indiceCena4 = 0;

// ESCONDE TODOS OS TEXTOS
dialogosCena1.forEach(p => {
    p.style.display = 'none';
});

dialogosCena2.forEach(p => {
    p.style.display = 'none';
});

dialogosCena3.forEach(p => {
    p.style.display = 'none';
});

dialogosCena4.forEach(p => {
    p.style.display = 'none';
});


// MOSTRA O PRIMEIRO TEXTO DA CENA 1
dialogosCena1[0].style.display = 'block';



// BOTAO START
botaoStart.addEventListener('click', function () {

    menu.style.display = 'none';

    cenario1.style.display = 'block';

});



// BOTAO DA CENA 1
botoes[0].addEventListener('click', function () {

    dialogosCena1[indiceCena1].style.display = 'none';

    indiceCena1++;

    if (indiceCena1 < dialogosCena1.length) {

        dialogosCena1[indiceCena1].style.display = 'block';

    } else {

        // TERMINOU A CENA 1
        cenario1.style.display = 'none';

        // COMEÇA CENA 2
        cenario2.style.display = 'block';

        dialogosCena2[0].style.display = 'block';
    }
});



// BOTAO DA CENA 2
botoes[1].addEventListener('click', function () {

    dialogosCena2[indiceCena2].style.display = 'none';

    indiceCena2++;

    if (indiceCena2 < dialogosCena2.length) {

        dialogosCena2[indiceCena2].style.display = 'block';

    } else {
         // TERMINOU A CENA 1
         cenario2.style.display = 'none';

         // COMEÇA CENA 2
         cenario3.style.display = 'block';
 
         dialogosCena3[0].style.display = 'block';

    }
});

botoes[2].addEventListener('click', function () {

    dialogosCena3[indiceCena3].style.display = 'none';

    indiceCena3++;

    if (indiceCena3 < dialogosCena3.length) {

        dialogosCena3[indiceCena3].style.display = 'block';

    } else {
        cenario3.style.display = 'none';

        cenario4.style.display = 'block';

        dialogosCena4[0].style.display = 'block';
    }
});



botoes[3].addEventListener('click', function () {

    dialogosCena4[indiceCena4].style.display = 'none';

    indiceCena4++;

    if (indiceCena4 < dialogosCena4.length) {

        dialogosCena4[indiceCena4].style.display = 'block';

    } else {

        cenario4.style.display = 'none';
    }
});
