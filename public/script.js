const socket = io();

const btn = document.getElementById("send-btn");
btn.addEventListener("click", () => {
    const msg = document.getElementById("inp").value;
    const username = document.getElementById("username").value || "Anonymous"; // Use the entered username or "Anonymous" if not provided
    socket.emit("send-msg", { msg, username }); // Emit the message with the username
    document.getElementById("inp").value = "";
});

socket.on("recieved-msg", (data) => {
    const li = document.createElement('li');
    li.classList.add('border', 'mt-2', 'p-2', 'rounded-pill', 'w-50', "mx-4");

    if (data.id === socket.id) {
        li.style.alignSelf = "flex-start"; // Align to the left for the same sender
        li.style.backgroundColor = "#d1e7dd"; // Greenish background for the sender
        li.style.color = "#1b4332";
    } else {
        li.style.alignSelf = "flex-end"; // Align to the right for a new sender
        li.style.backgroundColor = "#f8d7da"; // Pinkish background for new sender
        li.style.color = "#842029";
    }

    li.innerHTML = `<span class="fw-bold"> ${data.username} </span>: ${data.msg}`; // Display the username in the message
    document.querySelector('#chat').append(li);
});
