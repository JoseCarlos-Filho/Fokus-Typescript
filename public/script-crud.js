"use strict";
let estadoInicial = {
    tarefas: [
        {
            descricao: 'Tarefa concluída',
            concluida: true
        },
        {
            descricao: 'Tarefa pendente 1',
            concluida: false
        },
        {
            descricao: 'Tarefa pendente 2',
            concluida: false
        }
    ],
    tarefaSelecionada: null
};
const selecionarTarefa = (estado, tarefa) => {
    return {
        ...estado,
        tarefaSelecionada: tarefa === estado.tarefaSelecionada ? null : tarefa
    };
};
const adicionarTarefa = (estado, tarefa) => {
    return {
        ...estado,
        tarefas: [...estado.tarefas, tarefa]
    };
};
const andamentoDaTarefa = (estado) => {
    var _a;
    return estado.tarefas.find(tarefa => tarefa === estado.tarefaSelecionada) ? `${(_a = estado.tarefaSelecionada) === null || _a === void 0 ? void 0 : _a.descricao}` : 'Nenhuma tarefa em andamento';
};
const editaTarefa = (descricao) => {
    var _a;
    if (((_a = estadoInicial.tarefaSelecionada) === null || _a === void 0 ? void 0 : _a.descricao) === descricao) {
        return;
    }
};
// atualizar User Interface
const atualizarUI = () => {
    const taskIconSvg = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF" />
            <path
                d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E" />
        </svg>
    `;
    const ulTarefas = document.querySelector('.app__section-task-list');
    const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
    const formAdicionarTarefa = document.querySelector('.app__form-add-task');
    const textArea = document.querySelector('.app__form-textarea');
    let emAndamento = document.querySelector(".app__section-active-task-description");
    const btnCancelar = document.querySelector(".app__form-footer__button--cancel");
    const btnDeletar = document.querySelector(".app__form-footer__button--delete");
    if (!btnAdicionarTarefa) {
        throw Error('Botão de adicionar tarefa não encontrado');
    }
    btnAdicionarTarefa.onclick = () => {
        formAdicionarTarefa === null || formAdicionarTarefa === void 0 ? void 0 : formAdicionarTarefa.classList.toggle('hidden');
    };
    formAdicionarTarefa.onsubmit = (e) => {
        e.preventDefault();
        const descricao = textArea.value;
        estadoInicial = adicionarTarefa(estadoInicial, {
            descricao,
            concluida: false
        });
        atualizarUI();
    };
    if (ulTarefas) {
        ulTarefas.innerHTML = '';
    }
    estadoInicial.tarefas.forEach((tarefa) => {
        const li = document.createElement('li');
        li.classList.add('app__section-task-list-item');
        const svgIcon = document.createElement('svg');
        svgIcon.innerHTML = taskIconSvg;
        const paragraph = document.createElement('p');
        paragraph.classList.add('app__section-task-list-item-description');
        paragraph.textContent = tarefa.descricao;
        const button = document.createElement('button');
        button.classList.add('app_button-edit');
        const editIcon = document.createElement('img');
        editIcon.setAttribute('src', '../imagens/edit.png');
        button.appendChild(editIcon);
        if (tarefa.concluida) {
            // button.setAttribute('disabled', 'false')
            li.classList.add('app__section-task-list-item-complete');
        }
        li.appendChild(svgIcon);
        li.appendChild(paragraph);
        li.appendChild(button);
        li.addEventListener('click', () => {
            console.log('Tarefa clicada', tarefa);
            estadoInicial = selecionarTarefa(estadoInicial, tarefa);
            emAndamento.innerHTML = `${andamentoDaTarefa(estadoInicial)}`;
            atualizarUI();
        });
        editIcon.addEventListener('click', (e) => {
            e.preventDefault();
            formAdicionarTarefa === null || formAdicionarTarefa === void 0 ? void 0 : formAdicionarTarefa.classList.toggle('hidden');
            textArea.value = tarefa.descricao;
            const editar = editaTarefa(tarefa.descricao);
            // const novaTarefa = textArea!.value;
            // if(novaTarefa !== tarefa.descricao) {
            //     tarefa.descricao = novaTarefa;    
            // }
        });
        btnCancelar.addEventListener('click', (e) => {
            e.preventDefault();
            formAdicionarTarefa === null || formAdicionarTarefa === void 0 ? void 0 : formAdicionarTarefa.classList.add('hidden');
        });
        btnDeletar.addEventListener('click', (e) => {
            e.preventDefault();
            // if (estadoInicial.tarefaSelecionada && estadoInicial.tarefaSelecionada.concluida) {
            //     estadoInicial.tarefas = estadoInicial.tarefas.filter(tarefa => tarefa === estadoInicial.tarefaSelecionada)
            //     estadoInicial.tarefaSelecionada = null
            // }
            if (estadoInicial.tarefaSelecionada) {
                if (estadoInicial.tarefaSelecionada.concluida) {
                    estadoInicial.tarefas = estadoInicial.tarefas.filter(tarefa => tarefa !== estadoInicial.tarefaSelecionada);
                    estadoInicial.tarefaSelecionada = null;
                }
                else {
                    alert('A tarefa selecionada não está concluída. Por favor, conclua-a antes de removê-la.');
                }
            }
            atualizarUI();
        });
        ulTarefas === null || ulTarefas === void 0 ? void 0 : ulTarefas.appendChild(li);
    });
};
document.addEventListener('TarefaFinalizada', (e) => {
    if (estadoInicial.tarefaSelecionada) {
        estadoInicial.tarefaSelecionada.concluida = true;
        estadoInicial = selecionarTarefa(estadoInicial, estadoInicial.tarefaSelecionada);
        atualizarUI();
    }
});
atualizarUI();
