let numeroLimite = 100;
let numerosEscolhidos = [];
let numeroRandom = gerarNumeroALeatorio();
let tentativa = 1;
let ganhou = 0;

let vitorias = document.getElementById("vitorias");
vitorias.innerHTML = "Você ja venceu " +"<span style='color: yellow;'>" + ganhou + "</span> vezes";

function mudarTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Voice Portuguese", { rate: 1.2 });
}

function gerarMensagemInicial() {
    mudarTexto("h1", "Jogo do Numero Secreto");
    mudarTexto("p", "Escolha um numero de 1 a " + numeroLimite);
}

function verificarChute() {
    let chute = document.querySelector("input").value;

    if (!numerosEscolhidos.includes(chute)) {
        numerosEscolhidos.push(chute);
    }

    document.getElementById("tentativas").innerText =
        "Números testados: " + numerosEscolhidos.join(", ");

    if (chute == numeroRandom) {
        let palavraTentativa = tentativa > 1 ? "Tentativas" : "Tentativa";
        let mensagemTentativa = "Você ganhou o jogo em " + tentativa + " " + palavraTentativa;
        mudarTexto("h1", "Você acertou!");
        mudarTexto("p", mensagemTentativa);
        ganhou++;
        vitorias.innerHTML = "Você ja venceu " + ganhou + " vezes";
        newGame();
    } else {
        if (chute > numeroRandom) {
            mudarTexto("p", "O numero é menor");
        } else {
            mudarTexto("p", "O numero é maior");
        }
        tentativa++;
        limparInput();
    }
}

function gerarNumeroALeatorio() {
    return parseInt(Math.random() * numeroLimite + 1);
}

function limparInput() {
    document.querySelector("input").value = "";
}

function newGame() {
    document.getElementById("reiniciar").removeAttribute("disabled");
}

function comecarNovo() {
    tentativa = 1;
    numerosEscolhidos = [];
    document.getElementById("tentativas").innerText = "";
    numeroRandom = gerarNumeroALeatorio();
    gerarMensagemInicial();
    limparInput();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

gerarMensagemInicial();
