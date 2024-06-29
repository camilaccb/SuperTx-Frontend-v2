// Função para mostrar a seção correspondente ao item de navegação clicado e atualizar a classe dos itens de navegação
function showSection(sectionId) {
    var sections = document.querySelectorAll('section');
    sections.forEach(function(section) {
        section.style.display = 'none';
    });
    
    var navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(function(item) {
        item.classList.remove('selected');
    });
    
    var sectionToShow = document.querySelector('.' + sectionId);
    sectionToShow.style.display = 'block';
    
    var clickedNavItem = document.querySelector('.nav-item[data-section="' + sectionId + '"]');
    clickedNavItem.classList.add('selected');
}


// Função para colocar uam nova corrida do servidor via requisição POST

const postCorrida = async (idCliente, tipoCorrida, valorCorrida) => {
  const formData = new FormData();
  formData.append('id_cliente', idCliente);
  formData.append('tipo_corrida', tipoCorrida);
  formData.append('valor_corrida', valorCorrida);

  let url = 'http://127.0.0.1:5000/corridas';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => {
      if (response.ok) {
        console.log(response.status)
        alert("Corrida adicionada com sucesso!");
      } else {
        return response.json().then((data) => {
          if (response.status === 409) {
            alert("Erro: " + data.mensagem);
            console.log(response.status)
          } else if (response.status === 400) {
            alert("Erro de requisição: " + data.mensagem);
          } else {
            alert("Erro ao adicionar corrida. Por favor, tente novamente mais tarde.");
          }
        });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    })};



// Função para adicionar uma nova corrida após o preenchimento do formulário

const novaCorrida = () => {
  let idCliente = document.getElementById("cpfClienteCorrida").value;
  let tipoCorrida = document.getElementById("tiposDeCorrida").value;
  let valorCorrida = document.getElementById("valorCorrida").value;
  
  postCorrida(idCliente,tipoCorrida,valorCorrida)
  }

// Função para colocar um novo cliente do servidor via requisição POST

const postCliente = async (cpfCliente, nomeCliente, telefoneCliente) => {
  const formData = new FormData();
  formData.append('cpf_cliente', cpfCliente);
  formData.append('nome', nomeCliente);
  formData.append('telefone', telefoneCliente);

  let url = 'http://127.0.0.1:5000/clientes';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => {
      if (response.ok) {
        console.log(response.status)
        alert("Cliente adicionado com sucesso!");
      } else {
        return response.json().then((data) => {
          if (response.status === 409) {
            alert("Erro: " + data.mensagem);
            console.log(response.status)
          } else if (response.status === 400) {
            alert("Erro de requisição: " + data.mensagem);
          } else {
            alert("Erro ao adicionar cliente. Por favor, tente novamente mais tarde.");
          }
        });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    })};



// Função para adicionar um novo cliente após o preenchimento do formulário

const novoCliente = () => {
  let cpfCliente = document.getElementById("cpfCliente").value;
  let nomeCliente = document.getElementById("nomeCliente").value;
  let telefoneCliente = document.getElementById("telefoneCliente").value;
  
  postCliente(cpfCliente,nomeCliente,telefoneCliente)
  }



// Função para deletar um cliente do servidor via requisição DELETE

const deleteCliente = async (cpfCliente) => {
  console.log(cpfCliente)
  let url = 'http://127.0.0.1:5000/clientes?cpf=' + cpfCliente;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => {
      if (response.ok) {
        console.log(response.status)
        alert("Cliente removido com sucesso!");
      } else {
        return response.json().then((data) => {
          if (response.status === 409) {
            alert("Erro: " + data.mensagem);
            console.log(response.status)
          } else if (response.status === 400) {
            alert("Erro de requisição: " + data.mensagem);
          } else {
            alert("Erro ao remover cliente. Por favor, tente novamente mais tarde.");
          }
        });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    })};



// Função para deletar um novo cliente após o preenchimento do formulário

const removeCliente = () => {
  let cpfCliente = document.getElementById("cpfCliente").value;
  deleteCliente(cpfCliente)
  }

  // Função para envio do formulário após clique no botão

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');

  const botaoAdicionarCorrida = document.getElementById('botaoAdicionarCorrida');
  const botaoAdicionarCliente = document.getElementById('botaoAdicionarCliente');
  const botaoRemoverCliente = document.getElementById('botaoRemoverCliente');

  botaoAdicionarCorrida.addEventListener('click', function(event) {
      event.preventDefault();
      novaCorrida();
  })
    
  botaoAdicionarCliente.addEventListener('click', function(event) {
      event.preventDefault();
      novoCliente();

  });

  botaoRemoverCliente.addEventListener('click', function(event) {
    event.preventDefault();
    removeCliente();

});
});


const insertList = (nomeCliente, valorGasto) => {
  var item = [nomeCliente, valorGasto]
  var table = document.getElementById('tabelaTopClientes');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
}

const getList = async () => {
  let url = 'http://127.0.0.1:5000/clientes';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach(item => insertList(item.nome_cliente, item.total_gasto))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

getList()





