/*
------------------ Declaração de variaveis -----------------------
*/

const html = document.querySelector('html');
// const btnActions = document.querySelectorAll('.app__card-button');
const btnFoco =  document.querySelector('.app__card-button--foco');
const btnCurto = document.querySelector('.app__card-button--curto');
const btnLongo = document.querySelector('.app__card-button--longo');
const displayTimer = document.getElementById('timer');
const displayTitle = document.querySelector('.app__title');
const displayImagem = document.querySelector('.app__image');
const btnStartPause = document.getElementById('start-pause');
const btnIniciarOuPausar = document.querySelector('#start-pause span');
const imageBtnStartPause = document.querySelector(".app__card-primary-butto-icon");
const timerNaTela = document.querySelector("#timer");
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const musicaStart = new Audio('/sons/play.wav');
const musicaPause = new Audio('/sons/pause.mp3');
const musicaFinish = new Audio('/sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

const tempFoco = 1500;
const tempCurto = 300;
const tempLongo = 900;

/*
------------------ Ações dos botão de Audio  ----------------------------------------------------
*/
musica.loop = true;
musicaFocoInput.addEventListener("change", () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

/*
------------------ Ações dos botões Foco, descanso-curto, descanso-longo  -----------------------
*/

btnFoco.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    btnFoco.classList.add("active");
});

btnCurto.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    btnCurto.classList.add("active");
})

btnLongo.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    btnLongo.classList.add("active");
})

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(contexto => {
        contexto.classList.remove("active");
    })
    html.setAttribute("data-contexto", contexto);
    banner.setAttribute("src", `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;
        default:
            break;
    }
}


/*
------------------ Função para ontrolar o temporizador  -----------------------
*/

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        musicaFinish.play();
        alert('Tempo finalizado');
        const focoAtiva = html.getAttribute('data-contexto') == 'foco';
        if(focoAtiva) {
            const evento = new CustomEvent('FocoFinalizado'); // evento customizado
            document.dispatchEvent(evento);
        }
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    // console.log("temporizador: " + tempoDecorridoEmSegundos);
    mostrarTempo();
}

btnStartPause.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
    
    if(intervaloId) {
        musicaPause.play();
        zerar()
        return;
    }
    musicaStart.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    imageBtnStartPause.src = "/imagens/pause.png";
    btnIniciarOuPausar.textContent = "Pausar";
}

function zerar() {
    clearInterval(intervaloId);
    imageBtnStartPause.src = "/imagens/play_arrow.png";
    btnIniciarOuPausar.textContent = "Começar";
    intervaloId = null;
}

/*
------------------ Mostrar tempo na tela  -----------------------
*/

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    timerNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();









// console.log(btnActions);

// btnActions.forEach(btnContexto => {
//     btnContexto.addEventListener("click", () => {
//         const contexto = btnContexto.getAttribute('data-contexto');
//         // const classeDinamica = `app__card-button--${contexto}`;
//         // console.log(contexto)
//         // console.log(classeDinamica);
//         // if(btnContexto.classList.contains(classeDinamica)) {
//         //     console.log("entrou na condicional");
//         //     html.setAttribute('data-contexto', `${contexto}`);
//         // }
//         // console.log(btnContexto);
//         console.log('Contexto:', contexto);
//         console.log(btnContexto.hasAttribute(contexto));
//         // console.log('Classe Dinâmica:', classeDinamica);
//         // console.log('Classes do Botão:', btnContexto.className);

//         if (contexto === 'foco') {
//             html.setAttribute('data-contexto', contexto);
//         } else {
//             console.log(`Botão não contém a classe dinâmica esperada: ${contexto}`);
//         }
//     }); 
// });