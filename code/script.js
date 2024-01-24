const personagens = ["abigail", "alex", "caroline", "clint", "demetrius", "dwarf", "elliott", "emily", "evelyn", "george", "gunther", "gus", "haley", "harvey", "henchman", "jas", "jodi", "kent", "krobus", "leah", "leo", "lewis", "linus", "marnie", "maru", "morris", "pam", "penny", "pierre", "robin", "sam", "sebastian", "shane", "vincent", "willy", "wizard"];

function newGame(){
    location.reload();
}

function activate(personagem) {
    nome = personagem+'photo'
    var Image_Id = document.getElementById(nome);
    var nomefoto = personagem+'.png';
    if (Image_Id.src.match(nomefoto)) {
        Image_Id.src = personagem+' (2).png';
    }
    else {
        Image_Id.src = nomefoto;
    }
}   
     

function pickandoChar() {
    complet = document.getElementById("picktexto").value;
    complet = complet.toLowerCase()
    if (validarEscolha(complet)){
        var Image_Id = document.getElementById("pickando");
        Image_Id.src = complet+'.png';
    }else{
        alert("That character doesn't exist.");
    } 
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
