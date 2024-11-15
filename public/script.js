// client waala logic 
 
const socket = io();

const btn = document.getElementById("send-btn")
btn.addEventListener("click", () => {
    // console.log(`${document.getElementById("inp").value}`);
    const msg = document.getElementById("inp").value;
    socket.emit("send-msg", {msg})// emit --> used to send anything which accepts an event 
    document.getElementById("inp").value="";
})

socket.on("server-send-msg", (data) => {
    const li = document.createElement('li');
    li.classList.add('border', 'mt-2', 'p-2', 'rounded-pill');
    const username="Anonymous"
    if(data.id === socket.id){
        li.style.backgroundColor = 'black';
        li.style.color = 'white';
    }else{
        li.style.backgroundColor = 'green';
        li.style.color = 'white'
    }
    li.innerHTML = `<span class="fw-bold"> ${username} </span> -> ${data.msg} `;
    document.querySelector('#chat').append(li);

})
