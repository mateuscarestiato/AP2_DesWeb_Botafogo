document.addEventListener('DOMContentLoaded', function (){
    const parametros = new URLSearchParams(window.location.search)
    const atletaID = parseInt(parametros.get('id'));
    
    async function fetchatletas(atletaID) {
        try {
            const retorno = await fetch(`https://botafogo-atletas.mange.li/${atletaID}`);
            if (!retorno.ok) {
                throw new Error(`Houve um erro ao buscar os dados da API. Status: ${retorno.status}`);
            }
            const dados = await retorno.json();
            return dados;
        } catch (error) {
            console.error('Não foi possivel buscar os detalhes da API:', error);
            return null;
        }
    }
    
    if (!atletaID || isNaN(atletaID)) {
        console.error('Não foi possivel coletar ou não foi fornecido o ID do atleta');
        } 
        else {
        fetchatletas(atletaID)
            .then((atleta) => {
                if (!atleta) {
                    console.error(`Atleta com ID ${atletaID} não encontrado.`);
                } else {
                    const containerdetalhes = document.getElementById('atleta_jogador');
                    containerdetalhes.innerHTML = `
                        <div id="card_atleta">
                            <h2>${atleta.nome}</h2>
                            <img src="${atleta.imagem}" alt="Imagem de ${atleta.nome}">
                        </div>
                        <div id="detalhescont">
                            <p>Descrição: ${atleta.descricao}</p>
                            <p>Nome Completo: ${atleta.nome_completo}</p>
                            <p>Nascimento: ${atleta.nascimento}</p>
                            <p>Altura: ${atleta.altura}</p>
                            <p>Posição: ${atleta.posicao}</p>
                        </div>
                    `;
                }
            })
            .catch((error) => {
                console.error('Erro ao processar os detalhes do atleta:', error);
                
            });
    }
    



function redirecionarParaOutraPagina() {
    window.location.href = "elenco.html";
  }
document.getElementById("voltar").addEventListener("click", redirecionarParaOutraPagina);

});