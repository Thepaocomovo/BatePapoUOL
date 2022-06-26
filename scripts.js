let userName = "";
let chat = document.querySelector(".chat");

const refreshData = setInterval(DATA, 10000);

askUser();

function askUser(){
    userName = prompt("Qual nome de usuario deseja utilizar?");
    if(userName === ""){
        askUser();
    }
    login();
}

function login(){
    userName = {name: userName}
    const requisition = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", userName);
    requisition.then(DATA);
    requisition.catch(treatLoginError);
    setInterval(keep, 5000);
}

function keep(){
    const confirmation = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", userName);
    confirmation.then()
    confirmation.catch(deuruim)
}

function DATA(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(dadosChat);
    promise.catch(treatError);
}

function dadosChat(answer){
    chat.innerHTML = "";
    const answerQtd = answer.data.length;

    for(let i = 0; answerQtd > i; i++){
        const from = (answer.data[i].from);
        const text = (answer.data[i].text);
        const time = (answer.data[i].time);
        const to   = (answer.data[i].to);
        const type = (answer.data[i].type);
        if(type == "status"){
            let mensagem = `<li class="content status"> 
            <div class="time"><span>(${time})</span></div>
            <div class="text"><span><strong>${from}</strong> ${text}</span></div>
            </li>`;
            chat.innerHTML = chat.innerHTML + mensagem;
            
        }
        if(type == "message"){
            let mensagem = `<li class="content message"> 
            <div class="time"><span>(${time})</span></div>
            <div class="text"><span><strong>${from}</strong> para <strong>${to}</strong>: ${text}</span></div>
            </li>`;
            chat.innerHTML = chat.innerHTML + mensagem;
        }
        if(type === "private_message" && (to === userName.name || from === userName.name)){
            let mensagem = `<li class="content direct"> 
            <div class="time"><span>(${time})</span></div>
            <div class="text"><span><strong>${from}</strong> reservadamente para <strong>${to}</strong>: ${text}</span></div>
            </li>`;
            chat.innerHTML = chat.innerHTML + mensagem;
        }    
        let allComents = document.querySelectorAll(".content");
        allComents[allComents.length - 1].scrollIntoView();
    }
}

function sendMessage(){
    let message = document.querySelector(".sendIt");
    readyToSend = message.value
    if(readyToSend != ""){
        let coment = {from: userName.name,
        to: "Todos",
        text: readyToSend,
        type: "message"
        };
        const send = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", coment);
        DATA();
        message.value = "";
    }
}

function treatError(erro){
    console.log("deu ruim");
}

function treatLoginError(erro){
    let kind = (erro.response.status);
    if (kind === 400){
        alert("Este nome esta sendo utilizado por outro usuário!");
        askUser();
    }
}

function deuruim(){
    alert("Desconectado por inatividade");
    window.location.reload();
}

document.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        sendMessage()
    }
})