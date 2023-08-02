

function Calcular(event) {
    event.preventDefault()

    let usuario = receberValores()
    let idade = calcularIdade(usuario.ano)
    let ano = calcularFaixaEtaria(idade)

    usuario = organizarDados(usuario, idade, ano)

    cadastrarUsuario(usuario)

    window.location.reload()



}

function receberValores() {
    let nomeRecebido = document.getElementById("nome").value.trim()
    let diaNascimento = document.getElementById("dia-nascimento").value
    let mesNascimento = document.getElementById("mes-nascimento").value
    let anoNascimento = document.getElementById("ano-nascimento").value

    let dadosUsuario = {
        nome: nomeRecebido,
        dia: diaNascimento,
        mes: mesNascimento,
        ano: anoNascimento

    }

    return dadosUsuario
}

function calcularIdade(ano) {

    // Obter ano atual
    let dataAtual = new Date();
    let anoAtual = dataAtual.getFullYear();


    // Calculo da idade
    let idade = anoAtual - ano;

    // Mostrar a idade
    return idade

}

function calcularFaixaEtaria(idade) {

    

    if (idade <= 12) {
        return("Criança")
    } else if (idade >= 13 && idade <= 17) {
        return("Adolecente")
    }else if (idade >= 18 && idade <= 65){
        return("Adulto")
    } else{
       return("Idoso")
    }
}

function organizarDados(dadosUsuario, calcularIdade, calcularFaixaEtaria) {

    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        idade:calcularIdade,
        faixa:calcularFaixaEtaria
    }
    console.log(dadosUsuarioAtualizado)

    return dadosUsuarioAtualizado
}



function cadastrarUsuario(dadosUsuario) {
    let listaUsuario = []

    if(localStorage.getItem("usuariosCadastrados") != null){
        listaUsuario = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    listaUsuario.push(dadosUsuario)
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuario))
}



function carregarUsuario(){
    let listaCarregada = []
    if (localStorage.getItem("usuariosCadastrados") != null) {
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    if (listaCarregada.length == 0){
        let tabela = document.getElementById("corpo-tabela")

        tabela.innerHTML = `<tr class="linha-mensagem">
        <td colspan="6">Nenhum usuario cadastrado. </td> </tr>`
        
    } else{
        montarTabela(listaCarregada)
    }
    console.log(listaCarregada)
}

window.addEventListener("DOMContentLoaded", () => carregarUsuario())



function montarTabela(listaUsuarios) {
    let tabela = document.getElementById("corpo-tabela")

    let template = ""

    listaUsuarios.forEach(usuario => {
        console.log("O usuario é: ", usuario)

        template += `<tr>
        <td data-cell="nome">${usuario.nome}</td>
        <td data-cell="data de nascimento">${usuario.dia}/${usuario.mes}/${usuario.ano}</td>
        <td data-cell="idade">${usuario.idade}</td>
        <td data-cell="faixa etária">${usuario.faixa}</td>
    </tr> `
    });

    tabela.innerHTML = template;
}



function deletarRegistros() {

    // Remove o item do localStorage
    localStorage.removeItem("usuariosCadastrados")
    // recarrega a pagina
    window.location.reload()
}
