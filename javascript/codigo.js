var infobotao = '';
var url = 'https://botafogo-atletas.mange.li/';

function atualizarTextoDoBotao(botaoId) {

  var botao = document.getElementById(botaoId);

  var textoDoBotao = botao.innerText.toLowerCase();

  if (infobotao !== textoDoBotao) {
    
    infobotao = textoDoBotao;

    console.log("Texto do botão clicado: " + infobotao);

    url = 'https://botafogo-atletas.mange.li/' + infobotao;

    pegar_coisas_original();
      
    }}

const body = document.body;
body.style.display = 'flex';
body.style.gap = '.5em';
body.style.flexWrap = 'wrap';
body.style.maxWidth = '1259 px';

const preenche = (atleta) => {
    
    const container = document.createElement('article');
    const titulo = document.createElement('h3');
    const imagem = document.createElement('img');
    const descricao = document.createElement('p');

    container.dataset.id = atleta.id;
    container.dataset.altura = atleta.altura;
    container.dataset.nome_completo = atleta.nome_completo;
    container.dataset.nascimento = atleta.nascimento;
    
    container.style.width = '15em';
    container.style.backgroundColor = 'gray';
    container.style.textAlign = 'center';
    container.style.margin = "0,5em";
    container.style.padding = 'auto';

    titulo.innerText = atleta.nome;
    imagem.src = atleta.imagem;
    imagem.alt = `Imagem de ${atleta.nome}`;
    descricao.innerHTML = atleta.descricao;

    container.appendChild(titulo);
    container.appendChild(imagem);
    
    const saibaMaisButton = document.createElement('button');
    saibaMaisButton.innerText = 'Saiba Mais';
    
    saibaMaisButton.onclick = handleClick;

    container.appendChild(saibaMaisButton);
    divExterna.appendChild(container);
  
    document.body.appendChild(divExterna);
};

const handleClick = (e) => {
    const artigo = e.target.closest('article');

    document.cookie = `id =${artigo.dataset.id} `;
    document.cookie = `nome_completo =${artigo.dataset.nome_completo} `;
    document.cookie = `nascimento =${artigo.dataset.nascimento} `;
    document.cookie = `altura =${artigo.dataset.altura} `;
    document.cookie = `imagem =${artigo.dataset.img} `;

    localStorage.setItem('id', artigo.dataset.id);
    localStorage.setItem('nome_completo', artigo.dataset.nome_completo);
    localStorage.setItem('nascimento', artigo.dataset.nascimento);
    localStorage.setItem('img', artigo.dataset.img);
    localStorage.setItem('altura', artigo.dataset.altura);
    localStorage.setItem('dados-original', artigo.dataset);
    localStorage.setItem('dados', JSON.stringify(artigo.dataset));

    sessionStorage.setItem('id', artigo.dataset.id);
    sessionStorage.setItem('nome_completo', artigo.dataset.nome_completo);
    sessionStorage.setItem('nascimento', artigo.dataset.nascimento);
    sessionStorage.setItem('altura', artigo.dataset.altura);
    sessionStorage.setItem('dados-original', artigo.dataset);
    sessionStorage.setItem('dados', JSON.stringify(artigo.dataset));

    console.log(acha_cookie('nome_completo'));
    console.log(localStorage.getItem('id'));
    console.log(JSON.parse(localStorage.getItem('dados')).altura);

    window.location = `outra.html?id=${artigo.dataset.id}&nome_completo=${artigo.dataset.nome_completo}`
}

const acha_cookie = (chave) => {
    lista_de_cookies = document.cookie.split("; ");
    procurado = lista_de_cookies.find(
        (e) => e.startsWith(chave));
    return procurado.split("=")[1];
}

const pegar_coisas = async (caminho) =>{
    const resposta = await fetch(caminho);
    const dados = await resposta.json();    
    return dados;
};

function pegar_coisas_original() {
  divExterna.innerHTML = '';
  pegar_coisas(`${url}`).then(
    (entrada) => {
      for (atleta of entrada) {
        preenche(atleta);
      }
    }
  );
}
console.log('assincrono');