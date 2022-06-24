let chat = document.querySelector(".chat");

const refreshData = setInterval(DATA, 50000);
DATA()

function DATA() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(dadosChat);
    promise.catch(tratarErro);
}

function dadosChat(answer) {
    chat.innerHTML = "";
    console.log(answer);
    
    const answerQtd = answer.data.length

    for(let i = 0; answerQtd > i; i++){
        const from = (answer.data[i].from);
        const text = (answer.data[i].text);
        const time = (answer.data[i].time);
        const to = (answer.data[i].to);
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
            <div class="text"><span><strong>${from}</strong> para <strong>${to}:</strong> ${text}</span></div>
            </li>`;
            chat.innerHTML = chat.innerHTML + mensagem;
        }
        if(type == "private_message"){
            let mensagem = `<li class="content direct"> 
            <div class="time"><span>(${time})</span></div>
            <div class="text"><span>${from} ${to} ${text}</span></div>
            </li>`;
            chat.innerHTML = chat.innerHTML + mensagem;
        }    
    }
    
}
function tratarErro(erro){
    console.log("deu ruim")
}

