const botaoStart = document.getElementById('start');

const menu = document.getElementById('containerMenu');

const cenario1 = document.getElementById('cenario_1');
const cenario2 = document.getElementById('cenario_2');
const cenario3 = document.getElementById('cenario_3');
const cenario4 = document.getElementById('cenario_4');
const cenario5 = document.getElementById('cenario_5');


const botaoDireito = document.getElementById('fecharDireita');
const botaoEsquerdo = document.getElementById('fecharEsquerda');
const botaoAbrirCamera = document.getElementById('cameraAbrir');
const botaoFecharCamera = document.getElementById('cameraFechar');
const camera = document.getElementById('camera');
const imagemCamera = document.getElementById('cameraImagem');


const portaLeft = document.getElementById('portaLEFT');
const portaRight = document.getElementById('portaRIGHT');
const portasAbertas = document.getElementById('portasABERTAS');
const portasFechadas = document.getElementById('portasFECHADAS');

const batEsquerda = document.getElementById('bateriaEsquerda');
const batDireita = document.getElementById('bateriaDireita');

const nenhumSaiu = document.getElementById("threeOfThem")
const furiaSaiu = document.getElementById("furiaMissing")
const gierSaiu = document.getElementById("gierMissing")
const haishaSaiu = document.getElementById("haishaMissing")
const apenasFuria = document.getElementById("onlyFuria")
const apenasGier = document.getElementById("onlyGier")
const apenasHaisha = document.getElementById("onlyHaisha")
const nenhumFicou = document.getElementById("noneOfThem")

const gameoverHaisha = document.getElementById('gameoverHaisha');
const gameoverFuria = document.getElementById('gameoverFuria');
const gameoverGier = document.getElementById('gameoverGier');

const haishaJumpscare = document.getElementById('haishaJumpscare');
const furiaJumpscare = document.getElementById('furiaJumpscare');
const gierJumpscare = document.getElementById('gierJumpscare');

const furiaAudio = document.getElementById('furiaAudio')
const gierAudio = document.getElementById('gierAudio')
const haishaAudio = document.getElementById('haishaAudio')

console.log(furiaAudio, gierAudio, haishaAudio);



const dialogosCena1 = document.querySelectorAll('.cena1.text');
const dialogosCena2 = document.querySelectorAll('.cena2.text');
const dialogosCena3 = document.querySelectorAll('.cena3.text');
const dialogosCena4 = document.querySelectorAll('.cena4.text');
const dialogosCena5 = document.querySelectorAll('.cena5.text');
const botoes = document.querySelectorAll('.botaoSkipar');

let portaDireitaTempoFechada = 0;
let portaEsquerdaTempoFechada = 0;

let cooldownDireita = 0;
let cooldownEsquerda = 0;
let bateriaEsquerda = 100;
let bateriaDireita = 100;


let indiceCena1 = 0;
let indiceCena2 = 0;
let indiceCena3 = 0;
let indiceCena4 = 0;
let indiceCena5 = 0;

let loopJogo;
let countdownHaisha;
let countdownGier;
let countdownFuria;

let ladoHaisha;
let ladoGier;
let ladoFuria;

let portaDireitaFechada = false;
let portaEsquerdaFechada = false;

let audioQueue = [];

function enfileirarAudio(nome, animatronic) {
    audioQueue.push({ nome, animatronic });
    tocarProximoAudio();
}

function pegarAudio(nome) {

    switch (nome) {

        case 'furia':
            return furiaAudio;

        case 'gier':
            return gierAudio;

        case 'haisha':
            return haishaAudio;
    }
}


function tocarProximoAudio() {
    if (audioQueue.length === 0) return;

    const item = audioQueue.shift();
    if (!item) return;

    tocarAudioAnimatronic(item.animatronic, item.nome);
}

let audioAtual = null;

function tocarAudioAnimatronic(animatronic, nome) {
    const audio = pegarAudio(nome);

    pararAudioAtual(); // sempre interrompe o anterior

    audioAtual = audio;

    audio.pause();
    audio.currentTime = 0;

    iniciarTremor(animatronic.lado);

    audio.onended = () => {
        audioAtual = null;
        tocarProximoAudio(); // continua fila normalmente
    };

    audio.play().catch(() => {
        audioAtual = null;
        tocarProximoAudio();
    });
}


function pararAudioAtual() {
    if (audioAtual) {
        audioAtual.pause();
        audioAtual.currentTime = 0;
        audioAtual.onended = null;
        audioAtual = null;
    }

}



function inicializarAnimatronic() {

    const countdown = 40 + Math.floor(Math.random() * 101);

    const lado =
        Math.random() < 0.5
            ? 'esquerda'
            : 'direita';

    return [countdown, lado];
}

let animatronics = {

    furia: {
        countdown: 0,
        lado: '',
        saiuDaCamera: false
    },

    gier: {
        countdown: 0,
        lado: '',
        saiuDaCamera: false
    },

    haisha: {
        countdown: 0,
        lado: '',
        saiuDaCamera: false
    }
};

cenario1.style.display = 'none';
cenario2.style.display = 'none';
cenario3.style.display = 'none';
cenario4.style.display = 'none';
cenario5.style.display = 'none';
camera.style.display = 'none';

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

dialogosCena5.forEach(p => {
    p.style.display = 'none';
});


// MOSTRA O PRIMEIRO TEXTO DA CENA 1
dialogosCena1[0].style.display = 'block';



// BOTAO START
botaoStart.addEventListener('click', function () {

    menu.style.display = 'none';

    cenario1.style.display = 'block';

    // desbloqueia áudio no navegador
    furiaAudio.play().then(() => furiaAudio.pause());
    gierAudio.play().then(() => gierAudio.pause());
    haishaAudio.play().then(() => haishaAudio.pause());


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

        cenario5.style.display = 'block';

        dialogosCena5[0].style.display = 'block';
    }
});


botoes[4].addEventListener('click', () => {

    dialogosCena5[indiceCena5].style.display = 'none';
    indiceCena5++;

    if (indiceCena5 < dialogosCena5.length) {

        dialogosCena5[indiceCena5].style.display = 'block';

    } else {


        cenario5.style.display = 'none';

        const jogo = document.getElementById('ContainerJogo');

        jogo.style.display = 'block';

        document.querySelectorAll('.jogo').forEach(elemento => {

            elemento.style.display = 'block';

        });

        IniciarJogo();
    }



});



// jogo

function IniciarJogo() {

    portaDireitaFechada = false;
    portaEsquerdaFechada = false;

    animatronics.furia.saiuDaCamera = false;
    animatronics.gier.saiuDaCamera = false;
    animatronics.haisha.saiuDaCamera = false;


    let resultado;

    resultado = inicializarAnimatronic();
    animatronics.furia.countdown = resultado[0];
    animatronics.furia.lado = resultado[1];

    resultado = inicializarAnimatronic();
    animatronics.gier.countdown = resultado[0];
    animatronics.gier.lado = resultado[1];

    resultado = inicializarAnimatronic();
    animatronics.haisha.countdown = resultado[0];
    animatronics.haisha.lado = resultado[1];

    loopJogo = setInterval(atualizarAnimatronics, 1000);
    setInterval(atualizarPortasCooldown, 1000);
    atualizarPortas();
    atualizarCamera();
}


function atualizarPortasCooldown() {

    atualizarBateria();
    atualizarHUDBateria();

    if (portaDireitaFechada) portaDireitaTempoFechada++;
    else portaDireitaTempoFechada = 0;

    if (portaDireitaTempoFechada >= 15) {
        cooldownDireita = 10;
        portaDireitaFechada = false;
        portaDireitaTempoFechada = 0;
        atualizarPortas();
    }

    if (cooldownDireita > 0) cooldownDireita--;

    if (portaEsquerdaFechada) portaEsquerdaTempoFechada++;
    else portaEsquerdaTempoFechada = 0;

    if (portaEsquerdaTempoFechada >= 15) {
        cooldownEsquerda = 10;
        portaEsquerdaFechada = false;
        portaEsquerdaTempoFechada = 0;
        atualizarPortas();
    }

    if (cooldownEsquerda > 0) cooldownEsquerda--;
}

function atualizarBateria() {

    // ESQUERDA
    if (portaEsquerdaFechada) {
        bateriaEsquerda -= 0.8;
    } else if (cooldownEsquerda === 0) {
        bateriaEsquerda += 0.4;
    }

    if (bateriaEsquerda <= 0) {
        bateriaEsquerda = 0;
        cooldownEsquerda = 10;
        portaEsquerdaFechada = false;
    }

    if (bateriaEsquerda > 100) bateriaEsquerda = 100;


    // DIREITA
    if (portaDireitaFechada) {
        bateriaDireita -= 0.8;
    } else if (cooldownDireita === 0) {
        bateriaDireita += 0.4;
    }

    if (bateriaDireita <= 0) {
        bateriaDireita = 0;
        cooldownDireita = 10;
        portaDireitaFechada = false;
    }

    if (bateriaDireita > 100) bateriaDireita = 100;
}

function atualizarHUDBateria() {

    batEsquerda.style.width = bateriaEsquerda + "%";

    if (cooldownEsquerda > 0) {
        batEsquerda.style.background = "red";
    } else if (bateriaEsquerda < 30) {
        batEsquerda.style.background = "orange";
    } else {
        batEsquerda.style.background = "lime";
    }

    batDireita.style.width = bateriaDireita + "%";

    if (cooldownDireita > 0) {
        batDireita.style.background = "red";
    } else if (bateriaDireita < 30) {
        batDireita.style.background = "orange";
    } else {
        batDireita.style.background = "lime";
    }
}


botaoDireito.addEventListener('click', () => {

    portaDireitaFechada = !portaDireitaFechada;
    if (cooldownDireita > 0) return;
    atualizarPortas();

    console.log("Porta direita:", portaDireitaFechada);
});

botaoEsquerdo.addEventListener('click', () => {

    portaEsquerdaFechada = !portaEsquerdaFechada;
    if (cooldownEsquerda > 0) return;
    atualizarPortas();
    console.log("Porta esquerda:", portaEsquerdaFechada);
});


function atualizarCamera() {

    const furia = animatronics.furia.saiuDaCamera;
    const gier = animatronics.gier.saiuDaCamera;
    const haisha = animatronics.haisha.saiuDaCamera;

    if (!furia && !gier && !haisha) {

        imagemCamera.src = "threeOfThem.png";
    }

    else if (furia && !gier && !haisha) {

        imagemCamera.src = "furiaMissing.png";
    }

    else if (!furia && gier && !haisha) {

        imagemCamera.src = "gierMissing.png";
    }

    else if (!furia && !gier && haisha) {

        imagemCamera.src = "haishaMissing.png";
    }

    else if (!furia && gier && haisha) {

        imagemCamera.src = "onlyFuria.png";
    }

    else if (furia && !gier && haisha) {

        imagemCamera.src = "onlyGier.png";
    }

    else if (furia && gier && !haisha) {

        imagemCamera.src = "onlyHaisha.png";
    }

    else {

        imagemCamera.src = "noneOfThem.png";
    }
}



function atualizarAnimatronics() {

    verificarAnimatronic('furia', animatronics.furia);

    verificarAnimatronic('gier', animatronics.gier);

    verificarAnimatronic('haisha', animatronics.haisha);

}

function verificarAnimatronic(nome, animatronic) {

    animatronic.countdown--;

    if (animatronic.countdown <= 30 && !animatronic.saiuDaCamera) {
        animatronic.saiuDaCamera = true;
        enfileirarAudio(nome, animatronic);
        iniciarTremor(animatronic.lado);

        atualizarCamera();
    }

    if (animatronic.countdown <= 0) {

        let portaFechada = false;

        if (animatronic.lado === 'direita') {

            portaFechada = portaDireitaFechada;

        }
        else {

            portaFechada = portaEsquerdaFechada;

        }

        if (portaFechada) {

            const novo = inicializarAnimatronic();

            animatronic.countdown = novo[0];

            animatronic.lado = novo[1];

            animatronic.saiuDaCamera = false;

            atualizarCamera();

            pararTremor(animatronic.lado);

        }
        else {

            gameOver(nome);

        }
    }
}

function gameOver(animatronic) {

    clearInterval(loopJogo);
    audioQueue = [];

    if (audioAtual) {
        audioAtual.pause();
        audioAtual.currentTime = 0;
        audioAtual = null;
    }

    pararTremor('esquerda');
    pararTremor('direita');
    document.getElementById('ContainerJogo').style.display = 'none';

    switch (animatronic) {

        case 'furia':

            gameoverFuria.style.display = 'block';

            furiaJumpscare.play();

            furiaJumpscare.onended = () => {

                alert('Você foi morto por Furia!');

                location.reload();

            };

            break;

        case 'gier':

            gameoverGier.style.display = 'block';

            gierJumpscare.play();

            gierJumpscare.onended = () => {

                alert('Você foi morto por Gier!');

                location.reload();

            };

            break;

        case 'haisha':

            gameoverHaisha.style.display = 'block';

            haishaJumpscare.play();

            haishaJumpscare.onended = () => {

                alert('Você foi morto por Haisha!');

                location.reload();

            };

            break;
    }
}


let tremores = {
    esquerda: false,
    direita: false
};

function iniciarTremor(lado) {

    if (tremores[lado]) return; // evita duplicar

    tremores[lado] = true;

    const botao = lado === 'esquerda'
        ? botaoEsquerdo
        : botaoDireito;

    botao.classList.add('tremendo');
}

function pararTremor(lado) {

    tremores[lado] = false;

    const botao = lado === 'esquerda'
        ? botaoEsquerdo
        : botaoDireito;

    botao.classList.remove('tremendo');
}




botaoAbrirCamera.addEventListener('click', () => {

    camera.style.display = 'block';

    atualizarCamera();

});



botaoFecharCamera.addEventListener('click', () => {

    camera.style.display = 'none';

});



function atualizarPortas() {

    const jogo = document.getElementById("ContainerJogo");

    if (!portaEsquerdaFechada && !portaDireitaFechada) {

        jogo.style.backgroundImage =
            "url('portasABERTAS.png')";
    }

    else if (portaEsquerdaFechada && !portaDireitaFechada) {

        jogo.style.backgroundImage =
            "url('portaLEFT.png')";
    }

    else if (!portaEsquerdaFechada && portaDireitaFechada) {

        jogo.style.backgroundImage =
            "url('portaRIGHT.png')";
    }

    else {

        jogo.style.backgroundImage =
            "url('portasFECHADAS.png')";
    }
}


