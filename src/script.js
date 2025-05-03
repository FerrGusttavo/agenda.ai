
  const botaoAgendar = document.querySelector("button");
  const tabela = document.getElementById("agendamentos-list");

  
  window.addEventListener("load", () => {
    const agendamentosSalvos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    agendamentosSalvos.forEach(adicionarNaTabela);
  });

  
  botaoAgendar.addEventListener("click", () => {
    const nome = document.querySelector('input[placeholder="Nome do cliente"]').value;
    const telefone = document.querySelector('input[placeholder="Telefone do cliente"]').value;
    const modelo = document.querySelector('input[placeholder="Modelo do veículo"]').value;
    const placa = document.querySelector('input[placeholder="Placa do veículo"]').value;
    const data = document.querySelector('input[type="date"]').value;
    const hora = document.querySelector('input[type="time"]').value;
    const servico = document.querySelector('select').value;
    const valor = document.querySelector('input[type="number"]').value;

    if (!nome || !telefone || !modelo || !placa || !data || !hora || !servico || !valor) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    const novoAgendamento = {
      nome,
      telefone,
      veiculo: `${modelo} - ${placa}`,
      data,
      hora,
      servico,
      valor: parseFloat(valor).toFixed(2)
    };

    adicionarNaTabela(novoAgendamento);
    salvarNoLocalStorage(novoAgendamento);

    
    document.querySelectorAll("input, select").forEach(el => el.value = "");
  });

  
  function adicionarNaTabela(agendamento) {
    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
      <td class="border border-gray-300 p-2">${agendamento.nome}</td>
      <td class="border border-gray-300 p-2">${agendamento.telefone}</td>
      <td class="border border-gray-300 p-2">${agendamento.veiculo}</td>
      <td class="border border-gray-300 p-2">${agendamento.data}</td>
      <td class="border border-gray-300 p-2">${agendamento.hora}</td>
      <td class="border border-gray-300 p-2">${agendamento.servico}</td>
      <td class="border border-gray-300 p-2">R$ ${agendamento.valor}</td>
    `;
    tabela.appendChild(novaLinha);
  }

  
  function salvarNoLocalStorage(agendamento) {
    const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    agendamentos.push(agendamento);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
  }

