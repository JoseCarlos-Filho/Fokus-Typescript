// encontrar o botão adicionar tarefa
const btnAdicionarTarefa = document.querySelector(".app__button--add-task");
const formAdicionarTarefa = document.querySelector(".app__form-add-task");
const textArea = document.querySelector(".app__form-textarea");
const ulTarefas = document.querySelector(".app__section-task-list");
const btnCancelaTarefa = document.querySelector(".app__form-footer__button--cancel");
const paragrafoDescricaoTarefa = document.querySelector(".app__section-active-task-description");

const btnRemoverConcluidas = document.querySelector("#btn-remover-concluidas");
const btnRemoverTodas = document.querySelector("#btn-remover-todas");


let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let tarefaSelecionada = null;
let liTarefaSelecionada = null;


btnCancelaTarefa.addEventListener("click", () => {
    textArea.value = "";
    formAdicionarTarefa.classList.add('hidden');
})    


// função que adiciona nova tarefa ou atualiza.
function atualizarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// função que cria os elementos(html) para adição da tarefa
function criarElementoTarefa(tarefa) {
    const li = document.createElement("li");
    li.classList.add("app__section-task-list-item");

    const svg = document.createElement("avg");
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `;

    const paragrafo = document.createElement("p");
    paragrafo.textContent = tarefa.descricao;
    paragrafo.classList.add("app__section-task-list-item-description");

    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("app_button-edit");
    // botão que altera a descrição da tarefa já adicionados na lista.
    botaoEditar.onclick = () => {
        // debugger;
        const novaDescricao = prompt("Qual é o nome da tarefa?");
        if(novaDescricao) {
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarTarefas();
            alert("Tarefa atualizada!");
        } else {
            alert("Campo vazio ou cancelada, coloque uma descrição válida!");
        }
    }

    
    const imagemBotao = document.createElement("img");
    imagemBotao.setAttribute("src", "/imagens/edit.png");
    botaoEditar.append(imagemBotao);

    li.append(svg);
    li.append(paragrafo);
    li.append(botaoEditar);

    if(tarefa.completa) {
        liTarefaSelecionada.classList.add("app__section-task-list-item-complete");
        botaoEditar.setAttribute("disabled", 'disabled');
    } else {
        // evento de click na lista de tarefas. Para selecionar uma tarefa.
        li.onclick = () => {
            document.querySelectorAll(".app__section-task-list-item-active").forEach(elemento => {
                elemento.classList.remove("app__section-task-list-item-active");
            })
            if(tarefaSelecionada == tarefa) {
                paragrafoDescricaoTarefa.textContent = "";
                tarefaSelecionada = null;
                liTarefaSelecionada = null;
                return;
            }
            tarefaSelecionada = tarefa;
            liTarefaSelecionada = li;
            paragrafoDescricaoTarefa.textContent = tarefa.descricao;
            li.classList.add("app__section-task-list-item-active");
        }
    }


    return li;
}

// evento de click do botão adicionar tarefa que ativa a visibilidade do form de tarefa
btnAdicionarTarefa.addEventListener("click", () => {
    formAdicionarTarefa.classList.toggle("hidden");
})

// função que escuta um submit adicionando uma tarefa
formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value,
    }
    tarefas.push(tarefa);
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
    atualizarTarefas();
    textArea.value = '';
    formAdicionarTarefa.classList.add('hidden')
})

// função que adiciona tarefa na ul com a chamada da função criaEmentoTarefa(tarefa)
tarefas.forEach((tarefa) => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});

// evento customizado de tarefa finalizada(foco finalizado.)
document.addEventListener("FocoFinalizado", () => {
    if(tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove("app__section-task-list-item-active");
        liTarefaSelecionada.classList.add("app__section-task-list-item-complete");
        liTarefaSelecionada.querySelector("button").setAttribute("disabled", 'disabled');
        tarefaSelecionada.completa = true;
        atualizarTarefas();
    }
})

// botão com ações de remoção das tarefas concluidas.
const removerTarefas = (somenteCompletas) => {
    // const seletor = somenteCompletas ? ".app__section-task-list-item-complete" :  ".app__section-task-list-item";
    let seletor = ".app__section-task-list-item-complete";
    if(somenteCompletas) {
        seletor = ".app__section-task-list-item-complete"
    }
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    });
    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : [];
    atualizarTarefas();
}

btnRemoverConcluidas.onclick = removerTarefas(true);
btnRemoverTodas.onclick = () => removerTarefas(false);