// Marcar como "tarefa feita"
const list = document.querySelector("ul"); // Captura a lista inteira

// Ao clicar na lista a minha função recebe um evento
list.addEventListener("click", function (ev) {
  // Se o nome do item que eu cliquei na lista foi "LI"
  if (ev.target.nodeName === "LI") {
    ev.target.classList.toggle("checked"); // Adiciona nesse elemento a classe "checked"
  }
});

const closeMessage = document.querySelector("#close")
const message = document.querySelector(".message")

closeMessage.addEventListener("click", function (){
    message.style.display = "none"
})

setTimeout(() => {
    message.style.display = "none"
}, 5000)