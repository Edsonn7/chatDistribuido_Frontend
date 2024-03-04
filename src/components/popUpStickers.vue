<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['enviarSticker']);

// Función para enviar un sticker al componente padre
const enviarSticker = (stickerUrl) => {
  emit('enviarSticker', stickerUrl);
};
</script>

<template>
  <div class="popup">
    <div class="stickers">
      <!-- Aquí puedes listar los stickers disponibles -->
      <!-- Por ejemplo: -->
      <img src="../assets/enviroment.png" style="width: 70px; height: 70px" @click="enviarSticker('../assets/enviroment.png')"/>
      <img src="../assets/enviroment.png" style="width: 70px; height: 70px" @click="enviarSticker('../assets/enviroment.png')"/>
      <img src="../assets/enviroment.png" style="width: 70px; height: 70px" @click="enviarSticker('../assets/enviroment.png')"/>
      <img src="../assets/enviroment.png" style="width: 70px; height: 70px" @click="enviarSticker('../assets/enviroment.png')"/>
      <!-- Agrega más stickers según sea necesario -->
    </div>
  </div>
</template>

<style scoped>
/* Estilos para el pop-up de stickers */
.popup {
  max-width: 300px;
  max-height: 200px;
  position: fixed;
  top: 73%;
  left: 45%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  overflow-y: auto;
}

.stickers {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.stickers img {
  width: 80px;
  height: 80px;
  margin: 10px;
  cursor: pointer;
}
</style>