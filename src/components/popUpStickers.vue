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
      <img src="https://purina.com.pe/sites/default/files/styles/webp/public/2022-10/Que_debes_saber_antes_de_adoptar_un_gatito.jpg.webp?itok=N2sS0lfp" style="object-fit: cover" @click="enviarSticker('https://purina.com.pe/sites/default/files/styles/webp/public/2022-10/Que_debes_saber_antes_de_adoptar_un_gatito.jpg.webp?itok=N2sS0lfp')"/>
      <img src="https://delangelclinicaveterinaria.com/wp-content/uploads/2021/06/perros.png" @click="enviarSticker('https://delangelclinicaveterinaria.com/wp-content/uploads/2021/06/perros.png')"/>
      <img src="../assets/enviroment.png" style="width: 70px; height: 70px" @click="enviarSticker('../assets/enviroment.png')"/>
      <img src="../assets/enviroment.png" style="width: 70px; height: 70px" @click="enviarSticker('../assets/enviroment.png')"/>
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