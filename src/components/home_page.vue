<script setup>
import Header_chats from "@/components/header_chats.vue";
import Contactos_chat from "@/components/contactos_chat.vue";
import popUpStickers from '@/components/popUpStickers.vue'
import { onMounted, ref } from "vue";
import * as signalR from "@microsoft/signalr";
import { useRoute } from 'vue-router';
import PopEmojis from "@/components/popEmojis.vue";
import router from "@/router/index.js";

const route = useRoute();
const chats = ref([]);
const mensaje = ref("");
const usuario = ref(localStorage.getItem("nombreUser"));
const connection = ref(null);
const chatId = ref(route.params.chatId);
const mensajesRecibidos = ref([]); // Variable reactiva para almacenar los mensajes recibido
const tituloChatActivo = ref('');
const popUp = ref(false);
const popUpEmojis= ref(false);
const focusText = ref(false);

onMounted(() => {
  chatlist();
  configuracionConexion();
  conexiones();
});
// Función para seleccionar un chat y actualizar el título del chat activo

const autoScrollToBottom = () => {
  let contentMain = document.querySelector('.content__main');
  // Hacer scroll hacia abajo
  contentMain.scrollTop = contentMain.scrollHeight;
};

const recibirSticker = (stickerUrl) => {
  connection.value.invoke("SendMessage", "" + chatId.value, usuario.value, `<img src="${stickerUrl}" style="width: 70px; height: 70px; margin-bottom: 10px; object-fit: cover" alt="Sticker">`)
      .then(() => {
        autoScrollToBottom();
        console.log("Mensaje con sticker enviado con éxito: " + stickerUrl);
        mensaje.value='';
      })
      .catch((error) => {
        console.error("Error al enviar el mensaje con sticker", error);
      });
};

const agregarEmoji = (emoji) => {
  mensaje.value += emoji; // Agregar el emoji al mensaje// Ocultar el popup de emojis después de seleccionar uno
};
const abrirPopEmojis = () =>{
  popUpEmojis.value = !popUpEmojis.value;
  if (popUp.value = true){
    popUp.value = false
  }
}
const abrirPop = () =>{
  popUp.value = !popUp.value;
  if (popUpEmojis.value = true){
    popUpEmojis.value = false
  }
}
const chatlist = () => {
  fetch('http://localhost:5145/Chat', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
  })
      .then(response => response.json())
      .then(response => {
        chats.value = response.map(item => {
          return {
            Chat_Id: item.group_id,
            Nombre: item.name
          };
        });
      })
      .catch(error => {
        console(error);
      });
};

const configuracionConexion = () => {
  // Configura la conexión
  connection.value = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5145/message", { withCredentials: true }) // Reemplaza con la URL correcta de tu servidor
      .build();

  // Inicia la conexión
  connection.value
      .start()
      .then(() => {
        console.log("Conectado a SignalR");
      })
      .catch((err) => console.error(err));
};

const conexiones = () => {
  connection.value.on("ReceiveMessage", (user, message) => {
    console.log("Mensaje recibido:", "Usuario:", user, "Mensaje:", message);
    mensajesRecibidos.value.push({ usuario: user, mensaje: message }); // Almacena el mensaje recibido en la variable reactiva
  });

  connection.value.on("ShowWho", (message) => {
    console.log("Alguien se conecto: ", message);
  });
};

const enviarMensaje = () => {
  // Obtener el valor del mensaje
  const mensajeTexto = mensaje.value.trim(); // Eliminar espacios en blanco al principio y al final
  // Verificar si el mensaje está vacío
  if (mensajeTexto === "") {
    console.error("El mensaje está vacío. Por favor, escribe algo antes de enviar.");
    return; // Salir de la función si el mensaje está vacío
  }
  // Si el mensaje no está vacío, enviarlo
  console.log(chatId.value);
  connection.value.invoke("SendMessage", "" + chatId.value, usuario.value, mensajeTexto)
      .then(() => {
        autoScrollToBottom();
        console.log("Mensaje enviado con éxito: " + mensajeTexto);
        // Puedes hacer más cosas después de enviar el mensaje si es necesario
        mensaje.value='';
      })
      .catch((error) => {
        console.error("Error al enviar el mensaje", error);
      });
};

const seleccionar = (chat_id, nombreChat) => {
  limpiarMensajes();
  chatId.value = chat_id;
  tituloChatActivo.value = nombreChat;
  connection.value.invoke("AddToGroup", "" + chatId.value)
      .catch((e) => console.error(e));
};

const limpiarMensajes = () => {
  mensajesRecibidos.value = []; // Limpia el arreglo de mensajes
};

const getMensajeClass = (usuarioMensaje) => {
  return usuarioMensaje === usuario.value ? 'mensaje-derecha' : 'mensaje-izquierda';
};

const cerrarSesion = () =>{
  setTimeout(function () {
    localStorage.removeItem('nombreUser');
    router.push('/')
  }, 600);
}
</script>

<template>
  <div class="layout">
    <aside class="layout__aside">
      <section class="sidebar">
        <div class="sidebar__header">
          <h1 class="sidebar__title p-2 d-flex align-items-center justify-content-between">{{usuario}}
            <svg  @click="cerrarSesion" xmlns="http://www.w3.org/2000/svg" style="margin-right: 20px" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left chat__emote" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
              <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
            </svg>
          </h1>
          <h2 class="sidebar__sub">Salas de Chat</h2>
        </div>
        <ul class="sidebar__chats-container">
          <li class="sidebar__chats">
            <contactos_chat v-for="(chat, index) in chats" @click="seleccionar(chat.Chat_Id,chat.Nombre)" :nombre-sala="chat.Nombre"></contactos_chat>
          </li>
        </ul>
      </section>
    </aside>
    <main class="layout__content">
      <section class="content__page">
        <header class="content__header" v-if="tituloChatActivo != ''">
          <header_chats :titulo-chat="tituloChatActivo"></header_chats>
        </header>
        <main class="content__main">
          <div v-if="tituloChatActivo === ''" style="width: 850px; height: 700px; position: absolute" class="d-flex flex-column justify-content-center align-items-center">
            <div class="header__container-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="header__icon bi bi-chat-dots-fill" viewBox="0 0 16 16">
                <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
              </svg>
            </div>
            <div class="header__text">
              <h1 class="header__title">NX Message</h1>
              <h5 class="header__subtitle">¡Bienvenido! {{ usuario }}</h5>
              <h5 class="header__subtitle">Porfavor, ¡selecciona un chat para comenzar a conectar!</h5>
            </div>
          </div>
          <div v-else>
            <div :class="getMensajeClass(mensaje.usuario)" v-for="(mensaje, index) in mensajesRecibidos" :key="index">
              <div v-if="mensaje.chatId === chatId.value">
        <span v-if="mensaje.usuario !== usuario" style="color:#348A96; font-size: 17px; font-weight: bold;">
          {{ mensaje.usuario }}:
        </span>
                <div v-if="mensaje.chatId === chatId.value" style="color: #191A1F; font-size: 16px" v-html="mensaje.mensaje"></div>
              </div>
            </div>
          </div>
        </main>
        <footer class="content__footer" v-if="tituloChatActivo != ''">
          <section class="chat-text">
            <div class="emote__container">
              <svg @click="abrirPop" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark chat__emote" viewBox="0 0 16 16">
                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
              </svg>
              <svg style="margin-left: 20px" @click="abrirPopEmojis" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-smile chat__emote" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"/>
              </svg>
              <popUpStickers @enviarSticker="recibirSticker" v-if="popUp"/>
              <pop-emojis @enviarEmoji="agregarEmoji" v-if="popUpEmojis"/>
            </div>
            <div class="areatext">
              <input ref="focusText" type="text" class="form__input" v-model="mensaje" @keyup.enter="enviarMensaje">
            </div>
            <div class="chat__send" @click="enviarMensaje">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send send__emote" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
              </svg>
            </div>
          </section>
        </footer>
      </section>
    </main>
  </div>
</template>

<style scoped>
.header__icon {
  width: 5rem;
  height: 5rem;
  fill: var(--secondary-color);
}

.header__container-icon{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__text{
  text-align: center;
}
.header__title{
  font-size: 3.5rem;
}
.header__subtitle{
  color: var(--subtitle-color);
}

.mensaje-derecha {
  text-align: right;
  display: flex;
  justify-content: end;
}

.mensaje-izquierda {
  text-align: left;
}
.layout{
  position: relative;
  min-width: 1290px;
  width: 75%;
  height: 80vh;
  min-height: 80vh;
  margin: 10vh auto;
  display: grid;
  grid-template-areas:
        "aside content";
  grid-template-columns: 30% 70%;
  box-shadow: 0 0 100px -5px rgba(0,0,0, 0.5);
}
/*BARRA LATERAL AZUL*/
.layout__aside{
  grid-area: aside;
  overflow: hidden;
}
.sidebar{
  padding: 2rem 0;
  min-height: 100%;
  min-width: 30rem;
  background-color: var(--sidebar-color);
  border-radius: 20px 0 20px 20px;
  border-right: 1px solid var(--light_grey);
}
.sidebar__header{
  background-color: var(--sidebar-color);
  margin-left: 2rem;
  border-bottom: 1px solid var(--light_grey);
}
.sidebar__title{
  color: var(--background-color2);
  font-size: 2.6rem;
}
.sidebar__sub{
  color: var(--subtitle-color);
  font-size: 2.1rem;
}
.sidebar__chats-container{
  overflow: auto;
  height: 70vh;
}
.sidebar__chats{

}
.sidebar__chats-container::-webkit-scrollbar {
  width: 4px;
}
.sidebar__chats-container::-webkit-scrollbar-thumb {
  background-color: var(--light_grey);
  border-radius: 10px;
}
.sidebar__chats-container::-webkit-scrollbar-thumb:hover {
  background-color: var(--background-color2);
  width: 10px;
}
/*PRINCIPAL CONTAINER*/
.layout__content{
  grid-area: content;
  height: 100%;
  min-height: 100%;
  background-color: var(--secondary-color);
  border-radius: 0 10rem 10rem 0;
}
.content__page{
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background-color: var(--principal-color);
  border-radius: 0 20px 20px 0;
}
content__header{
  width: 100%;
  flex: 2;
  height: 15%;
  background-color: black;
}
.content__main{
  background-color: rgba(52, 138, 150, 0.34);
  flex: 1;
  border-bottom: 1px solid var(--light_grey);
  padding: 17px 20px 15px;
  overflow-y: scroll;
  max-height: 680px;
}
.content__footer{
  height: 60px;
  width: 100%;
}



/*Responsivo*/
@media (max-width:1490px){
  body{
    padding: 0;
  }
  .layout{
    min-width: auto;
    width: 80%;
  }
}
@media(max-width:1320px){
  .layout{
    width: 89%;
    margin-left: 3rem;
  }
  .sidebar__chats-container{
    height: 68vh;
  }
}

@media(max-width:1160px){
  .layout{
    width: 85%;
    margin-left: 4rem;
  }
}

@media(max-width:1060px){
  body{
    background-image: none;
    position: static;
  }
  .layout{
    width: 100%;
    height: 100%;
    min-height: 100%;
    margin: 0;
    border-radius: 0;

    grid-template-areas: 'content';
    grid-template-columns: 100%;
    overflow-x: hidden;
  }
  .layout__content{
    border-radius: 0;
    background-color: transparent;
  }

  .layout__aside{
    display: block;
    position: absolute;
    max-width: 33rem;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 999;

    text-align: center;
    border-radius: 0;
    overflow: auto;
    transition: all 300ms ease-in-out;

    margin-right: -100%;
    opacity: 0;
  }
  .content__page{
    border-radius: 0;
    height: 100vh;
  }

}

.chat-text{
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
}
.emote__container, .chat__send{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
}
.chat__emote, .send__emote{
  transform: scale(1.5);
  color: var(--background-color2);
  cursor: pointer;
}

.chat__emote:hover, .send__emote:hover{
  color: #564ED7;
}
.areatext{
  width: 80%;
}
.form__input
{
  width: 100%;
  display: block;
  font-size: 1.5rem;
  padding: 1rem 2rem 1rem 1.2rem;
  border: none;
  box-shadow: 2px 0 5px 1px rgba(0,0,0,0.75);

  border-radius: 0.5rem;
  outline: none;
  line-height: 2.1rem;
}

@media(max-width:800px){
}
@media(max-width:585px){
}

@media(max-width:480px){
}

</style>