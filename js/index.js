//------------------------------------------------------------------------------------------

//Funções de data

function getCurrentDate() {
    const date = new Date();
    return String(date.getDate()).padStart(2, '0') + "/" + String((date.getMonth() + 1)).padStart(2, '0') + "/" + String(date.getFullYear()).padStart(2, '0');
}

function getWeekDay() {
    const date = new Date();
    let days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return days[date.getDay()];
}

function getCurrentHour() {
    const date = new Date();
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
}

function printCurrentHour() {
    horaMinSeg.textContent = getCurrentHour();
}

//------------------------------------------------------------------------------------------

// Funcao de localizacao

async function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            let userLocation = {
                "latitude": position.coords.latitude,
                "longitude": position.coords.longitude
            }
            resolve(userLocation);
        },
        (error) => {
            reject("Erro ao recuperar a localização " + error);
        });
    });
}

//------------------------------------------------------------------------------------------

//funcoes de save

let registerLocalStorage = getRegisterLocalStorage();

function getRegisterLocalStorage() {
    const registers = localStorage.getItem("register");
    return registers ? JSON.parse(registers) : [];
}


function saveRegisterLocalStorage(register) {
    const typeRegister = document.getElementById("tipos-ponto");
    registerLocalStorage.push(register); // Array
    localStorage.setItem("register", JSON.stringify(registerLocalStorage));
    localStorage.setItem("lastTypeRegister", typeRegister.value);
}

function saveRegisterLocalStorage0(register) {
    registerLocalStorage.push(register); // Array
    localStorage.setItem("register", JSON.stringify(registerLocalStorage));
} 

let registerLocalStorageJusti = getJustificativaLocalStorage();

function getJustificativaLocalStorage() {
    const justificativas = localStorage.getItem("justificativa");
    return justificativas ? JSON.parse(justificativas) : [];
}


function saveJustificativaLocalStorage(register) {
    registerLocalStorageJusti.push(register);
    localStorage.setItem("justificativa", JSON.stringify(registerLocalStorageJusti));
    console.log(localStorage.setItem("justificativa", JSON.stringify(registerLocalStorageJusti)));
} 

//------------------------------------------------------------------------------------------

//Dados padrões apresentação
const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

diaSemana.textContent = getWeekDay();
diaMesAno.textContent = getCurrentDate();
setInterval(printCurrentHour, 1000);

const dialogData = document.getElementById("dialog-data");
const dialogHora = document.getElementById("dialog-hora");
const dialogPonto = document.getElementById("dialog-ponto");

//------------------------------------------------------------------------------------------

//Formulario de registro de ponto
const btnBaterPonto = document.getElementById("btn-bater-ponto");
btnBaterPonto.addEventListener("click", register);

const nextRegister = {
    "entrada": "intervalo",
    "intervalo": "volta-intervalo", 
    "volta-intervalo": "saida", 
    "saida": "entrada"
}

function register() {
    dialogData.textContent = "Data: " + getCurrentDate();
    dialogHora.textContent = "Hora: " + getCurrentHour();
    
    let lastTypeRegister = localStorage.getItem("lastTypeRegister");
    if(lastTypeRegister) {
        const typeRegister   = document.getElementById("tipos-ponto");
        typeRegister.value   = nextRegister[lastTypeRegister];
        let lastRegisterText = "Último registro: " + localStorage.getItem("lastDateRegister") + " - " + localStorage.getItem("lastTimeRegister") + " | " + localStorage.getItem("lastTypeRegister")
        document.getElementById("dialog-last-register").textContent = lastRegisterText;
    }

    setInterval(() => {
        dialogHora.textContent = "Hora: " + getCurrentHour();
    }, 1000);

    dialogPonto.showModal();
}


//Regsitro e save do ponto
const btnDialogBaterPonto = document.getElementById("btn-dialog-bater-ponto");
const divAlertaRegistroPonto = document.getElementById("alerta-registro-ponto");

btnDialogBaterPonto.addEventListener("click", async () => {
    const typeRegister = document.getElementById("tipos-ponto");
    const observationText = document.getElementById("observationText").value;

    let userCurrentPosition = await getCurrentPosition();
    
    let ponto = {
        "data": getCurrentDate(),
        "hora": getCurrentHour(),
        "localizacao": userCurrentPosition,
        "id": 1,
        "tipo": typeRegister.value,
        "observacao": observationText || "-"
    };
    
    saveRegisterLocalStorage(ponto);
    
    localStorage.setItem("lastDateRegister", ponto.data);
    localStorage.setItem("lastTimeRegister", ponto.hora);
    
    dialogPonto.close();
    
    divAlertaRegistroPonto.classList.remove("hidden");
    divAlertaRegistroPonto.classList.add("show");
    
    setTimeout(() => {
        divAlertaRegistroPonto.classList.remove("show");
        divAlertaRegistroPonto.classList.add("hidden");
    }, 5000);
});


let lastTypeRegister = localStorage.getItem("lastTypeRegister");
    if(lastTypeRegister) {
        const typeRegister   = document.getElementById("tipos-ponto");
        typeRegister.value   = nextRegister[lastTypeRegister];
        let lastRegisterText = "Último registro: " + localStorage.getItem("lastDateRegister") + " - " + localStorage.getItem("lastTimeRegister") + " | " + localStorage.getItem("lastTypeRegister")
        document.getElementById("dialog-last-register").textContent = lastRegisterText;
    }


const btnDialogFechar = document.getElementById("btn-dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});

const btnCloseAlertRegister = document.getElementById("alerta-registro-ponto-fechar");
btnCloseAlertRegister.addEventListener("click", () => {
    divAlertaRegistroPonto.classList.remove("show");
    divAlertaRegistroPonto.classList.add("hidden");
});

//------------------------------------------------------------------------------------------
const btnBaterPontoAntigo = document.getElementById("btn-bater-ponto-antigo");
const dialogPontoVelho = document.getElementById("dialogPontoVelho");
const btnCancelar = document.getElementById("btn-cancelar");
const btnDialogBaterPontoAntigo = document.getElementById("btn-dialog-bater-ponto-antigo");

// Evento para abrir o diálogo ao clicar no botão
btnBaterPontoAntigo.addEventListener("click", () => {
    dialogPontoVelho.showModal();
});

// Função para registrar ponto no passado
btnDialogBaterPontoAntigo.addEventListener("click", async () => {
    const data = document.getElementById("data-ponto").value;
    const hora = document.getElementById("hora-ponto").value;
    const tipo = document.getElementById("tipo-ponto").value;
    const observationText = document.getElementById("observationText1").value;

    // Verifique se getCurrentPosition está implementado corretamente
    let userCurrentPosition = await getCurrentPosition();

    // Validação dos campos
    if (!data || !hora || !tipo) {
        showNotification("Por favor, preencha todos os campos.");
        return;
    }

    // Formatação dos dados
    const dataFormatada = data.split('-').reverse().join('/');
    const horaFormatada = hora;

    // Criação do objeto ponto
    let ponto = {
        "data": dataFormatada,
        "hora": horaFormatada,
        "localizacao": userCurrentPosition || "Localização não disponível", // Adicione um valor padrão se a localização não estiver disponível
        "id": Date.now(), // ID único baseado no timestamp
        "tipo": tipo,
        "observacao": observationText || "-"
    };

    console.log(ponto); // Para verificar o objeto no console

    // Salvar ponto no Local Storage, sobrescrevendo qualquer registro anterior
    saveRegisterLocalStorage0(ponto);

    // Resetar o formulário e fechar o diálogo
    document.getElementById("form-ponto-passado").reset();
    dialogPontoVelho.close();
});

// Evento para cancelar o registro e fechar o diálogo
btnCancelar.addEventListener("click", () => {
    dialogPontoVelho.close();
});

//------------------------------------------------------------------------------------------

// Botão para abrir o diálogo de justificativa
const btnBaterJustificar = document.getElementById("btn-bater-justificar");
btnBaterJustificar.addEventListener("click", registerJustificativa);



function registerJustificativa() {

    // Atualiza a hora a cada segundo
    setInterval(() => {
        document.getElementById("dialog-hora-justificativa").textContent = "Hora: " + getCurrentHour();
    }, 1000);

    dialogJustificativa.showModal();
}

// Botão para confirmar o registro da justificativa
const btnDialogJustificativa = document.getElementById("btn-dialog-bater-justificativa");
const divAlertaRegistroJustificativa = document.getElementById("alerta-registro-justificativa");

btnDialogJustificativa.addEventListener("click", async () => {
    const absenceDate = document.getElementById("absenceDate").value;
    const observationText = document.getElementById("observationTextJus").value;

    if (!absenceDate) {
        alert("Por favor, selecione uma data de ausência.");
        return;
    }

    // Obtém a posição atual do usuário
    let userCurrentPosition = await getCurrentPosition();

    // Cria o objeto de justificativa
    const absenceFile = document.getElementById("absenceFile").files[0];

    if (absenceFile) {
        const reader = new FileReader();
        
        // Lê o arquivo e cria a justificativa após o carregamento do arquivo
        reader.onload = function(event) {
            const arquivoBase64 = event.target.result;

            let justificativa = {
                data: absenceDate,
                hora: getCurrentHour(),
                localizacao: userCurrentPosition,
                id: 1,
                tipo: "justificativa",
                arquivoAnexado: arquivoBase64,
                nomeArquivo: absenceFile.name,
                observacao: observationText || "-"
            };

            console.log(justificativa);

            // Salva o registro da justificativa no localStorage
            saveJustificativaLocalStorage(justificativa);

            dialogJustificativa.close();

            // Mostra um alerta de registro da justificativa
            divAlertaRegistroJustificativa.classList.remove("hidden");
            divAlertaRegistroJustificativa.classList.add("show");

            setTimeout(() => {
                divAlertaRegistroJustificativa.classList.remove("show");
                divAlertaRegistroJustificativa.classList.add("hidden");
            }, 5000);
        };

        reader.readAsDataURL(absenceFile);
    } else {
        // Se não houver arquivo, cria a justificativa sem o anexo
        let justificativa = {
            data: absenceDate,
            hora: getCurrentHour(),
            localizacao: userCurrentPosition,
            id: 1,
            tipo: "justificativa",
            arquivoAnexado: null,
            nomeArquivo: null,
            observacao: observationText || "-"
        };

        console.log(justificativa);

        // Salva o registro da justificativa no localStorage
        saveJustificativaLocalStorage(justificativa);

        dialogJustificativa.close();

        // Mostra um alerta de registro da justificativa
        divAlertaRegistroJustificativa.classList.remove("hidden");
        divAlertaRegistroJustificativa.classList.add("show");

        setTimeout(() => {
            divAlertaRegistroJustificativa.classList.remove("show");
            divAlertaRegistroJustificativa.classList.add("hidden");
        }, 5000);
    }
});


function toggleFileInput() {
    const fileInputContainer = document.getElementById("fileInputContainer");
    fileInputContainer.style.display = document.getElementById("toggleFileCheckbox").checked ? "block" : "none";
}

// Fechamento manual do formulário de justificativa
const dialogJustificativa = document.getElementById("dialog-justificativa");
const btnFecharJustificativa = document.getElementById("btn-dialog-fechar-justificatica");
btnFecharJustificativa.addEventListener("click", () => {
    dialogJustificativa.close();
});
