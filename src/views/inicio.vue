<script setup>
import { onMounted, ref } from "vue";
import * as signalR from "@microsoft/signalr";
import { useRoute } from 'vue-router';

const route = useRoute();
const chats = ref([]);
const mensaje = ref("");
const usuario = ref(localStorage.getItem("nombreUser"));
const connection = ref(null);
const chatId = ref(route.params.chatId);
const mensajesRecibidos = ref([]);
const tituloChat = ref("Mensajes"); // Variable reactiva para almacenar el título del chat

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
        console.error(error);
      });
};

const configuracionConexion = () => {
  // Configura la conexión
  connection.value = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5145/message", { withCredentials: true })
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
    mensajesRecibidos.value.push({ usuario: user, mensaje: message });
  });

  connection.value.on("ShowWho", (message) => {
    console.log("Alguien se conecto: ", message);
  });
};

const enviarMensaje = () => {
  connection.value.invoke("SendMessage", "" + chatId.value, usuario.value, mensaje.value)
      .then(() => {
        console.log("Mensaje enviado con éxito: " + mensaje.value);
        // Puedes hacer más cosas después de enviar el mensaje si es necesario
      })
      .catch((error) => {
        console.error("Error al enviar el mensaje", error);
      });
};

const seleccionar = (chat_id, nombreChat) => {
  chatId.value = chat_id;
  tituloChat.value = nombreChat; // Actualiza el título del chat seleccionado
  connection.value.invoke("AddToGroup", "" + chatId.value)
      .catch((e) => console.error(e));
};
</script>

<template>
  <div>
    <h2>{{ usuario }}</h2> <br>
  </div>
  <h2>SALAS DE CHAT</h2>
  <h4 v-for="(chat, index) in chats" :key="index" @click="seleccionar(chat.Chat_Id, chat.Nombre)" role="button">
    {{ chat.Chat_Id }} {{ chat.Nombre }}
  </h4>

  <h3>{{ tituloChat }}</h3> <!-- Utiliza el título del chat seleccionado -->
  <label>Ingresa el mensaje</label>
  <input v-model="mensaje">
  <button @click="enviarMensaje">enviar</button>
  <div class="mensajesArea">
    <div v-if="tituloChat === 'Mensajes'">
      <p>Bienvenido! Por favor selecciona un chat para empezar a chatear.</p>
    </div>
    <div v-else>
      <div v-for="(mensaje, index) in mensajesRecibidos" :key="index">
        <p>{{ mensaje.usuario }}: {{ mensaje.mensaje }}</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
</style>

