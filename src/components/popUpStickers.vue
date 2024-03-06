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
      <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTExZ3QwNmk2bjFpYjRjeDZmeGZ2Y3dybHA5NGU2ZXJkNTU5cnpzaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2A75RyXVzzSI2bx4Gj/giphy.gif" style="object-fit: cover" @click="enviarSticker('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTExZ3QwNmk2bjFpYjRjeDZmeGZ2Y3dybHA5NGU2ZXJkNTU5cnpzaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2A75RyXVzzSI2bx4Gj/giphy.gif')"/>
      <img src="https://media1.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy.webp?cid=790b7611i572ap02bh9kugeyiaxsc15t5fzw29njads6qvkk&ep=v1_gifs_trending&rid=giphy.webp&ct=g" style="object-fit: cover" @click="enviarSticker('https://media1.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy.webp?cid=790b7611i572ap02bh9kugeyiaxsc15t5fzw29njads6qvkk&ep=v1_gifs_trending&rid=giphy.webp&ct=g')"/>
      <img src="https://media1.giphy.com/media/brHaCdJqCXijm/200.webp?cid=82a1493b2c8sgy61gvwvttu1s5yw0ywr2bszbj6ec4tb66gs&ep=v1_gifs_trending&rid=200.webp&ct=g" style="object-fit: cover"  @click="enviarSticker('https://media1.giphy.com/media/brHaCdJqCXijm/200.webp?cid=82a1493b2c8sgy61gvwvttu1s5yw0ywr2bszbj6ec4tb66gs&ep=v1_gifs_trending&rid=200.webp&ct=g')"/>
      <img src="https://media2.giphy.com/media/qiMbLh4WHEZyw/giphy.webp?cid=82a1493bd1maom344ud6lab7cjwy9e8bdhbf4c3dbtvngpus&ep=v1_gifs_trending&rid=giphy.webp&ct=g" style="object-fit: cover" @click="enviarSticker('https://media1.giphy.com/media/26gsaY8FS9XuuahYA/200.webp?cid=82a1493becdil1gui19qqu8ktgjafqsri6hfpmu2lia9ne28&ep=v1_gifs_trending&rid=200.webp&ct=g')"/>
      <img src="https://media2.giphy.com/media/UO5elnTqo4vSg/200.webp?cid=82a1493ber31kkmvw7v5x90rahj1qxzztb7dct8wf0jxwpep&ep=v1_gifs_trending&rid=200.webp&ct=g" style="object-fit: cover" @click="enviarSticker('https://media2.giphy.com/media/UO5elnTqo4vSg/200.webp?cid=82a1493ber31kkmvw7v5x90rahj1qxzztb7dct8wf0jxwpep&ep=v1_gifs_trending&rid=200.webp&ct=g')"/>
      <img src="https://media4.giphy.com/media/3NtY188QaxDdC/giphy.webp?cid=82a1493bcxwpduhyu3si6gc348s6yd2ygfiexo25dp1crd75&ep=v1_gifs_trending&rid=giphy.webp&ct=g" style="object-fit: cover" @click="enviarSticker('https://media4.giphy.com/media/3NtY188QaxDdC/giphy.webp?cid=82a1493bcxwpduhyu3si6gc348s6yd2ygfiexo25dp1crd75&ep=v1_gifs_trending&rid=giphy.webp&ct=g')"/>
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