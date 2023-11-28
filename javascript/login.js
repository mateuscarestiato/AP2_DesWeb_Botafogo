  document.getElementById('botaologin').addEventListener('click', function() {
  
  var senhainput = document.getElementById('senha').value;
  var hashsenha = hex_md5(senhainput);
  var senhaCerta = '85ee0fe4f155a9af2657d85054ad63ca';

  if (hashsenha === senhaCerta) {
      
      window.location.href = 'elenco.html';
  } else {
     
      alert('Senha incorreta. Tente novamente.');
  }
  });

