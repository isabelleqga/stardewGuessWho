const personagens = ["abigail", "alex", "caroline", "clint", "demetrius", "dwarf", "elliott", "emily", "evelyn", "george", "gunther", "gus", "haley", "harvey", "henchman", "jas", "jodi", "kent", "krobus", "leah", "leo", "lewis", "linus", "marnie", "maru", "morris", "pam", "penny", "pierre", "robin", "sam", "sebastian", "shane", "vincent", "willy", "wizard"];

document.addEventListener('DOMContentLoaded', function () {
    var lista = document.getElementById('characterlist');
    personagens.forEach(function (nome) {
        var opcao = document.createElement('option');
        opcao.value = nome.charAt(0).toUpperCase() + nome.slice(1);
        lista.appendChild(opcao);
    });

    var picktexto = document.getElementById('picktexto');
    function limparParaMostrarLista() {
        if (this.value !== '') {
            this.dataset.valorAnterior = this.value;
            this.value = '';
        }
    }
    // 'focus' clears it the first time the field is entered; 'click' also
    // clears it when the field is clicked again while already focused
    // (e.g. right after picking an option), since no new 'focus' event
    // fires in that case.
    picktexto.addEventListener('focus', limparParaMostrarLista);
    picktexto.addEventListener('click', limparParaMostrarLista);
    picktexto.addEventListener('blur', function () {
        if (this.value === '' && this.dataset.valorAnterior) {
            this.value = this.dataset.valorAnterior;
        }
    });
});

var personagemEscolhido = false;
var jogoComecado = false;

function newGame(){
    personagemEscolhido = false;
    jogoComecado = false;
    document.getElementById('picktexto').value = '';
    document.getElementById('pickando').src = 'img/features/yourpick.png';
    personagens.forEach(function (nome) {
        var img = document.getElementById(nome + 'photo');
        if (img) {
            img.src = 'img/colored/' + nome + '.png';
        }
    });
}

function podeTrocarPick() {
    if (!jogoComecado) {
        return true;
    }
    if (confirm("You can't change your pick without restarting. Do you want to restart now?")) {
        newGame();
    }
    return false;
}

function activate(personagem) {
    if (!personagemEscolhido) {
        alert("Pick your character first.");
        return;
    }
    nome = personagem+'photo'
    var Image_Id = document.getElementById(nome);
    var nomefoto = personagem+'.png';
    if (Image_Id.src.match(nomefoto)) {
        Image_Id.src = 'img/bw/'+personagem+' (2).png';
        jogoComecado = true;
    }
    else {
        Image_Id.src = 'img/colored/'+nomefoto;
    }
}


function pickandoChar() {
    if (!podeTrocarPick()) {
        return;
    }
    complet = document.getElementById("picktexto").value;
    complet = complet.toLowerCase()
    if (validarEscolha(complet)){
        var Image_Id = document.getElementById("pickando");
        Image_Id.src = 'img/colored/'+complet+'.png';
        personagemEscolhido = true;
    }else{
        alert("That character doesn't exist.");
    }
}

function pickRandomChar() {
    if (!podeTrocarPick()) {
        return;
    }
    var escolha = personagens[Math.floor(Math.random() * personagens.length)];
    document.getElementById("picktexto").value = escolha.charAt(0).toUpperCase() + escolha.slice(1);
    document.getElementById("pickando").src = 'img/colored/' + escolha + '.png';
    personagemEscolhido = true;
}

function validarEscolha(escolha){
    var validade = false;
    for (var i = 0; i <= personagens.length - 1; i++) { 
        if(personagens[i] == escolha){
            validade = true;
            return validade; 
        }
    }return validade;
}
