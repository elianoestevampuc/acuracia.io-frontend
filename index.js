
let dominio = "http://127.0.0.1:5000";
const modalCadastroPessoa = new bootstrap.Modal('#modalCadastroPessoa');

const carregarDados = async () => {
    let url = dominio + '/carregar';
    fetch(url, {
        method: 'get',
    })
        .then((response) => response.json())
        .then((data) => {
            preencherDados(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

const processar = async () => {
    let url = dominio + '/processar';
    fetch(url, {
        method: 'get'
    })
        .then((response) => response.json())
        .then((data) => {
            preencherResultado(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

const validarCadastro = () => {
    let idade = document.getElementById("idade").value;
    if (idade === '') {
        alert("Informe a idade!");
    } else {
        cadastrar();
    }
}

const cadastrar = async () => {
    let dado = [];
    dado.push(document.getElementById("idade").value);
    dado.push(document.getElementById("ictericia").value);
    dado.push(document.getElementById("autismoFamilia").value);
    dado.push(document.getElementById("autista").value);
    let url = dominio + '/adicionar';
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text'
        },
        body: dado
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            fecharModalCadastroPessoa();
            carregarDados();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

const preencherDados = (dados) => {
    document.getElementById("dados-content").innerHTML = "";
    let header = `
                    <div class="row  justify-content-center">
                        <div class="col-3">Idade</div>
                        <div class="col-3">Ictericia?</div>
                        <div class="col-3">Autismo na familia?</div>
                        <div class="col-3">É autista?</div>
                    </div>    
                `;
    document.getElementById("dados-header").innerHTML = header;
    document.getElementById("dados-header").style.display = "block";
    document.getElementById("dados-content").style.display = "block";

    for (let dado of dados) {
        let conteudo = `
            <div class="row  justify-content-center" style="border-bottom: 1px solid #D6D6D6;">
                <div class="col-3">` + dado[0] + `</div>
                <div class="col-3">` + dado[1] + `</div>
                <div class="col-3">` + dado[2] + `</div>
                <div class="col-3">` + dado[3] + `</div>
            </div>   
        `;
        document.getElementById("dados-content").innerHTML += conteudo;
    }
}

list = [];
const preencherResultado = (dados) => {
    document.getElementById("resultado-header").style.display = "block";
    document.getElementById("resultado").style.display = "block";

    let conteudo = `
        <div class="row" style="border-bottom: 1px solid #D6D6D6;">
            <div class="col-12">KNN: ` + dados.knn + `</div>
        </div>   

        <div class="row" style="border-bottom: 1px solid #D6D6D6;">
            <div class="col-12">SVC: ` + dados.svc + `</div>
        </div> 

        <div class="row" style="border-bottom: 1px solid #D6D6D6;">
            <div class="col-12">CART: ` + dados.cart + `</div>
        </div> 

        <div class="row" style="border-bottom: 1px solid #D6D6D6;">
            <div class="col-12">NB: ` + dados.nb + `</div>
        </div> 

        <div class="row" style="border-bottom: 1px solid #D6D6D6;">
            <div class="col-12">**************************************************</div>
        </div> 
    `;

    list.unshift(conteudo);
    atualizarResultado();
}

const atualizarResultado = () => {
    document.getElementById("resultado").innerHTML = "";
    for (let c of list) {
        document.getElementById("resultado").innerHTML += c;
    }
}

const abrirModalCadastroPessoa = () => {
    modalCadastroPessoa.show();
}

const fecharModalCadastroPessoa = () => {
    modalCadastroPessoa.hide();
  }