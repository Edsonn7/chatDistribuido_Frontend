<script setup>
import Header_chats from "@/components/header_chats.vue";
import Contactos_chat from "@/components/contactos_chat.vue";
import Area_text from "@/components/area_text.vue";
import { onMounted, ref } from "vue";
import * as signalR from "@microsoft/signalr";
import { useRoute } from 'vue-router';

const route = useRoute();
const chats = ref([]);
const mensaje = ref("");
const usuario = ref(localStorage.getItem("nombreUser"));
const connection = ref(null);
const chatId = ref(route.params.chatId);
const mensajesRecibidos = ref([]); // Variable reactiva para almacenar los mensajes recibido
const emits = defineEmits();

onMounted(() => {
  chatlist();
  configuracionConexion();
  conexiones();
});

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
  // Llama al método Send en tu hub SignalR
  console.log(chatId.value);
  connection.value.invoke("SendMessage", "" + chatId.value, usuario.value, mensaje.value)
      .then(() => {
        console.log("Mensaje enviado con éxito" + mensaje.value);
        // Puedes hacer más cosas después de enviar el mensaje si es necesario
      })
      .catch((error) => {
        console.error("Error al enviar el mensaje", error);
      });
};

const seleccionar = (chat_id) => {
  chatId.value = chat_id;
  connection.value.invoke("AddToGroup", "" + chatId.value)
      .catch((e) => console.error(e));
};
</script>

<template>
  <div class="layout">
    <aside class="layout__aside">
      <section class="sidebar">
        <div class="sidebar__header">
          <h1 class="sidebar__title">{{usuario}}</h1>
          <h2 class="sidebar__sub">Chat</h2>
        </div>
        <ul class="sidebar__chats-container">
          <li class="sidebar__chats">
            <contactos_chat></contactos_chat>
          </li>
        </ul>
      </section>
    </aside>


    <main class="layout__content">
      <section class="content__page">
        <header class="content__header">
          <header_chats></header_chats>
        </header>
        <main class="content__main">

        </main>
        <footer class="content__footer">
          <area_text></area_text>
        </footer>
      </section>
    </main>
  </div>
</template>

<style scoped>
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
  border-radius: 20px 0 0 20px;
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
  flex: 1;
  border-bottom: 1px solid var(--light_grey);
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

@media(max-width:800px){
}
@media(max-width:585px){
}

@media(max-width:480px){
}

</style>