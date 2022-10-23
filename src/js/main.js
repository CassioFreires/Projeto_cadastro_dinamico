import {
    TellRegex
} from '../modules/telefone.js'
import {
    EmailRegex
} from '../modules/email.js';
import {
    CepRegex
} from '../modules/cep.js'

let nomeiInput = document.getElementById('nome');
let telefoneInput = document.getElementById('telefone');
let emailInput = document.getElementById('email')
let cepInput = document.getElementById('cep')
let cidadeInput = document.getElementById('cidade');
let ruaInput = document.getElementById('rua');
let bairroInput = document.getElementById('bairro');
let ufInput = document.getElementById('uf');


let btnCadastrar = document.getElementById('btn-cadastrar');
let btnProcurarCep = document.getElementById('btn-cep');

class Cadastro {
    constructor() {
        this.usuarios = [];

    }

    // Função que valida os inputs os inputs
    validarInputs() {
        if (nomeiInput === ' ' || telefoneInput.value === ' ' || emailInput.value === ' ' || cepInput.value === ' ' || cidadeInput.value === '' || bairroInput.value === '' || ufInput === ' ') {
            document.querySelectorAll('input').forEach(item => {
                item.value = 'Tentativa de cadastro';
                item.style.border = '1px solid red';
            })
            alert('ERRO - preencha novamente')
        } else{
            alert('Cadastrado com sucesso')
        }
        return true;
    }

    // Função que salva os dados no localStorage e faz uma validação antes
    gravar() {
        // 1° faz a validação do localStorage
        if (localStorage.hasOwnProperty('usuarios')) {

            // Existe algum valor no valor localStorage ? sim!
            // Pegar o objeto do localStorage e armazena no array
            this.usuarios = JSON.parse(localStorage.getItem('usuarios'))
        }

        let obj = {
            nome: nomeiInput.value,
            telefone: telefoneInput.value,
            email: emailInput.value,
            cep: cepInput.value,
            cidade: cidadeInput.value,
            rua: ruaInput.value,
            bairro: bairroInput.value,
            uf: ufInput.value
        };

        this.usuarios.push(obj)
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios))

    }

    // Função para limpar input após a gravação
    limparInput() {
        document.querySelectorAll('input').forEach(item => {
            return item.value = '';
        })
    }

}
// Class que retorna uma api
class Consulta extends Cadastro {
    constructor() {
        super()
        cepInput = cep;
    }
    async retornarApi() {
        let url = ` https://viacep.com.br/ws/${cep.value}/json/`;
        let response = await fetch(url).then(resposta => {
            return resposta.json();
        }).then(resposta => {
            this.geraEndereco(resposta)
        })

    }

    // Gera o endreço de forma dinamica
    geraEndereco(value) {
        cidadeInput.value = value.localidade;
        ruaInput.value = value.logradouro;
        bairroInput.value = value.bairro;
        ufInput.value = value.uf;
    }

}

// Função quando clica no botao cadastrar
btnCadastrar.addEventListener('click', e => {
    event.preventDefault()
    let cadastro = new Cadastro();
    cadastro.validarInputs();
    cadastro.gravar()
    cadastro.limparInput();
})

// Função quando clica no botao procurar cep
btnProcurarCep.addEventListener('click', e => {
    event.preventDefault();
    let consulta = new Consulta(cep.value);
    consulta.retornarApi()

})

// Algoritmo que formata a string dinamicamente
document.getElementById('telefone').addEventListener('input', e => {
    e.target.value = TellRegex();
})
// Algoritmo que formata a string dinamicamente
document.getElementById('email').addEventListener('input', e => {
    e.target.value = EmailRegex()
})
// Algoritmo que formata a string dinamicamente
document.getElementById('cep').addEventListener('input', e => {
    e.target.value = CepRegex();
})