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
    // Se a sessão for corridas, recarregar a tabela
    if (sectionId === 'Corridas') {
      getCorridas();
    } else if (sectionId === 'Clientes') {
      getClientes();
    }
}


// Função para colocar uma nova corrida do servidor via requisição POST

const postCorrida = async (idCliente, tipoCorrida, valorCorrida, origemCorrida, destinoCorrida) => {
  const formData = new FormData();
  formData.append('id_cliente', idCliente);
  formData.append('tipo_corrida', tipoCorrida);
  formData.append('valor_corrida', valorCorrida);
  formData.append('origem_corrida', origemCorrida);
  formData.append('destino_corrida', destinoCorrida);  

  let url = 'http://127.0.0.1:5000/corridas';
  return fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => {
      if (response.ok) {
        console.log(response.status)
        alert("Corrida adicionada com sucesso!");
        // resolve so caller can refresh lists or take further actions
        return response;
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
          // Reject so caller can handle failure if desired
          throw new Error('Failed to add corrida');
        });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      throw error;
    });
};



// Função para adicionar uma nova corrida após o preenchimento do formulário

const novaCorrida = () => {
  let idCliente = document.getElementById("cpfClienteCorrida").value;
  let tipoCorrida = document.getElementById("tiposDeCorrida").value;
  let valorCorrida = document.getElementById("valorCorrida").value;
  let origemCorrida = document.getElementById("origemCorrida").value;
  let destinoCorrida = document.getElementById("destinoCorrida").value;
  // Return the promise so callers can react when the POST completes
  return postCorrida(idCliente, tipoCorrida, valorCorrida, origemCorrida, destinoCorrida)
}

// Função para colocar um novo cliente do servidor via requisição POST

const postCliente = async (cpfCliente, nomeCliente, telefoneCliente) => {
  const formData = new FormData();
  formData.append('cpf_cliente', cpfCliente);
  formData.append('nome', nomeCliente);
  formData.append('telefone', telefoneCliente);

  let url = 'http://127.0.0.1:5000/clientes';
  return fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => {
      if (response.ok) {
        console.log(response.status)
        alert("Cliente adicionado com sucesso!");
        return response;
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
          throw new Error('Failed to add cliente');
        });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      throw error;
    });
};


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
  return fetch(url, {
    method: 'delete'
  })
    .then((response) => {
      if (response.ok) {
        console.log(response.status)
        alert("Cliente removido com sucesso!");
        return response;
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
          throw new Error('Failed to delete cliente');
        });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      throw error;
    });
};


// Função para deletar um novo cliente após o preenchimento do formulário

const removeCliente = () => {
  let cpfCliente = document.getElementById("cpfCliente").value;
  deleteCliente(cpfCliente);
}

// Função para atualizar um novo cliente via requisição PUT

const putCliente = async (cpfCliente, nomeCliente, telefoneCliente) => {
  const formData = new FormData();
  formData.append('cpf_cliente', cpfCliente);
  formData.append('nome', nomeCliente);
  formData.append('telefone', telefoneCliente);

  let url = 'http://127.0.0.1:5000/clientes';
  return fetch(url, {
    method: 'put',
    body: formData
  })
    .then((response) => {
      if (response.ok) {
        console.log(response.status)
        alert("Cliente atualizado com sucesso!");
        return response;
      } else {
        return response.json().then((data) => {
          if (response.status === 409) {
            alert("Erro: " + data.mensagem);
            console.log(response.status)
          } else if (response.status === 400) {
            alert("Erro de requisição: " + data.mensagem);
          } else {
            alert("Erro ao atualizar cliente. Por favor, tente novamente mais tarde.");
          }
          throw new Error('Failed to update cliente');
        });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      throw error;
    });
};

// Função para envio do formulário/query após clique no botão e fazer o carregamento de tabelas de get

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');

  const botaoAdicionarCorrida = document.getElementById('botaoAdicionarCorrida');
  const botaoAdicionarCliente = document.getElementById('botaoAdicionarCliente');
  const botaoRemoverCliente = document.getElementById('botaoRemoverCliente');
  const botaoAtualizarCliente = document.getElementById('botaoAtualizarCliente');

  botaoAdicionarCorrida.addEventListener('click', function(event) {
      event.preventDefault();
      novaCorrida();
      setTimeout(() => getCorridas(), 500);

  });
    
  botaoAdicionarCliente.addEventListener('click', function(event) {
      event.preventDefault();
      novoCliente()
      setTimeout(() => getClientes(), 500);

  });

  botaoRemoverCliente.addEventListener('click', function(event) {
    event.preventDefault();
    removeCliente();
    setTimeout(() => getClientes(), 500);
    

});

  botaoAtualizarCliente.addEventListener('click', function(event) {
    event.preventDefault();
    atualizaCliente();
    setTimeout(() => getClientes(), 500);

});

});

// Função para inclusão das corridas recuperadas na tabela

const insertCorridas = (cpfCliente, origemCorrida, destinoCorrida, horaCorrida, distanciaCorrida, valorCorrida, valorLiquidoCorrida) => {
  var item = [cpfCliente, origemCorrida, destinoCorrida, horaCorrida, distanciaCorrida, valorCorrida, valorLiquidoCorrida]
  var table = document.getElementById('corridasRecentes');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
}

// Função que recupera todas as corridas

const getCorridas = async () => {
  let url = 'http://127.0.0.1:5000/corridas';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      // Limpar linhas existentes (manter cabeçalho) e inserir dados atualizados
      var table = document.getElementById('corridasRecentes');
      if (table) {
        while (table.rows.length > 1) {
          table.deleteRow(1);
        }
      }
      data.forEach(item => insertCorridas(item.id_cliente, item.origem_corrida, item.destino_corrida, item.hora_registro_corrida, item.distancia_corrida, item.valor_corrida, item.valor_liquido_corrida))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Função para inclusão de clientes recuperados na tabela

const insertClientes = (cpfCliente, nomeCliente, TelefoneCliente, DataCadastro, ultimaModificacao) => {
  var table = document.getElementById('clientes');
  var row = table.insertRow();

  // CPF (não-editável)
  var cpfCell = row.insertCell(0);
  cpfCell.textContent = cpfCliente;

  // Nome (editável quando em modo edição)
  var nomeCell = row.insertCell(1);
  nomeCell.textContent = nomeCliente;

  // Telefone (editável quando em modo edição)
  var telefoneCell = row.insertCell(2);
  telefoneCell.textContent = TelefoneCliente;

  // Data Cadastro (não-editável)
  var dataCadCell = row.insertCell(3);
  dataCadCell.textContent = DataCadastro;

  // Data Atualização (não-editável)
  var dataAtualizCell = row.insertCell(4);
  dataAtualizCell.textContent = ultimaModificacao;

  // Célula de ações
  var actionsCell = row.insertCell(5);
  actionsCell.className = 'actions-cell';

  // Botão Editar
  var editBtn = document.createElement('button');
  editBtn.textContent = '✏️';
  editBtn.className = 'editBtn';
  editBtn.title = 'Editar';
  editBtn.onclick = function() {
    // Ativar modo edição
    makeEditable(nomeCell, nomeCliente);
    makeEditable(telefoneCell, TelefoneCliente);
    
    // Ocultar botão editar, mostrar botões salvar e deletar
    editBtn.classList.add('hidden');
    saveBtn.classList.remove('hidden');
    deleteBtn.classList.remove('hidden');
  };
  actionsCell.appendChild(editBtn);

  // Botão Salvar (oculto por padrão)
  var saveBtn = document.createElement('button');
  saveBtn.textContent = '💾';
  saveBtn.className = 'saveBtn hidden';
  saveBtn.title = 'Salvar';
  saveBtn.onclick = function() {
    // Obter valores dos campos de entrada se existirem, senão do textContent
    var newNome = nomeCell.querySelector('input') ? nomeCell.querySelector('input').value : nomeCell.textContent;
    var newTelefone = telefoneCell.querySelector('input') ? telefoneCell.querySelector('input').value : telefoneCell.textContent;
    
    console.log('Salvando:', cpfCliente, newNome, newTelefone);
    
    putCliente(cpfCliente, newNome, newTelefone)
      .then(() => {
        setTimeout(() => getClientes(), 500);
      })
      .catch((err) => {
        console.error('Falha ao salvar:', err);
      });
  };
  actionsCell.appendChild(saveBtn);

  // Botão Deletar
  var deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️';
  deleteBtn.className = 'deleteBtn';
  deleteBtn.title = 'Deletar';
  deleteBtn.onclick = function() {
    if (confirm('Tem certeza que deseja deletar este cliente?')) {
      deleteCliente(cpfCliente);
    }
  };
  actionsCell.appendChild(deleteBtn);
};

// Função auxiliar para tornar uma célula editável
function makeEditable(cell, originalValue) {
  var input = document.createElement('input');
  input.type = 'text';
  input.value = cell.textContent;
  input.className = 'cell-input';
  cell.textContent = '';
  cell.appendChild(input);
  input.focus();
  input.select();
}

const getClientes = async () => {
  let url = 'http://127.0.0.1:5000/clientes';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      // Limpar linhas existentes (manter cabeçalho) e inserir dados atualizados
      var table = document.getElementById('clientes');
      if (table) {
        while (table.rows.length > 1) {
          table.deleteRow(1);
        }
      }
      data.forEach(item => insertClientes(item.cpf_cliente, item.nome, item.telefone, item.data_cadastro, item.data_atualizacao))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


document.addEventListener('DOMContentLoaded', function () {
    showSection('Corridas'); 
});











