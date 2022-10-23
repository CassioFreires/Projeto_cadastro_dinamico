class Tabela {
    constructor() {
        this.usuarios = []
    }

    // Função que verificar se existe algum usuario no localStorage e realiza a logica
    lerDados() {
        if (localStorage.hasOwnProperty('usuarios') !== 'usuarios') {
            console.log(localStorage.getItem('usuarios'));
        }
        if (localStorage.hasOwnProperty('usuarios')) {
            let users = JSON.parse(localStorage.getItem('usuarios'));
            return users
        }
    }

    // Função que cria a tabela de forma dinamica
    listarDadosNaTabela() {
        let tbody = document.getElementById('tbody');
        let users = this.lerDados()
        for (const iterator of users) {
            let tr = tbody.insertRow();
            let td_nome = tr.insertCell();
            let td_telefone = tr.insertCell();
            let td_email = tr.insertCell();
            let td_cep = tr.insertCell();
            let td_cidade = tr.insertCell();
            let td_rua = tr.insertCell();
            let td_bairro = tr.insertCell();
            let td_uf = tr.insertCell();
            let td_btn = tr.insertCell();

            td_nome.innerText = iterator.nome;
            td_telefone.innerText = iterator.telefone;
            td_email.innerText = iterator.email;
            td_cep.innerText = iterator.cep;
            td_cidade.innerText = iterator.cidade;
            td_rua.innerText = iterator.rua;
            td_bairro.innerText = iterator.bairro;
            td_uf.innerText = iterator.uf;
            td_btn.appendChild(this.botaoApagar())
        }

    }

    // Função de criar o botão de excluir
    botaoApagar() {
        let btn = document.createElement('button');
        btn.classList = 'img-delete'
        return btn;
    }
    // Função de apagar a tabela
    excluir() {
        let tabela = document.querySelector('#tabela');
        tabela.addEventListener('click', e => {
            const el = e.target;
            if (el.classList.contains('img-delete')) {
                let celula = el.parentNode;
                let linha = celula.parentNode;
                return linha.remove();
            }
        })
    }

}

let tabela = new Tabela()
tabela.listarDadosNaTabela()
tabela.excluir()