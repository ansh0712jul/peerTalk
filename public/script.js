// client waala logic 
 
const socket = io();

const btn = document.getElementById("send-btn")
btn.addEventListener("click", () => {
    // console.log(`${document.getElementById("inp").value}`);
    const msg = document.getElementById("inp").value;
    socket.emit("send-msg", {msg})// emit --> used to send anything which accepts an event 
    document.getElementById("inp").value="";
})

socket.on("recieved-msg", (data) => {
    // console.log(data.id)
    const li = document.createElement('li');
    li.classList.add('border', 'mt-2', 'p-2', 'rounded-pill','w-50');
    const username="Anonymous"
    if (data.id === socket.id) {
        li.style.alignSelf = "flex-start"; // Align to the left for the same sender
        li.style.backgroundColor = "#d1e7dd"; // Greenish background for same sender
        li.style.color = "#1b4332";
    } else {
        li.style.alignSelf = "flex-end"; // Align to the right for a new sender
        li.style.backgroundColor = "#f8d7da"; // Pinkish background for new sender
        li.style.color = "#842029";
    }

    li.innerHTML = `<span class="fw-bold"> ${username} </span> -> ${data.msg} `;
    document.querySelector('#chat').append(li);

})
