<script setup>
import {defineProps} from "vue";

const props = defineProps({
  tituloChat: String // Definir una prop para el nombre de la sala
});
</script>

<template>
  <section class="chat">
    <div class="chat__group">
    <div class="chat__left-container">
      <div class="left__container-img">
        <img src="../assets/enviroment.png" alt="" class="chat__img">
      </div>
    </div>
    <div class="right__container">
      <div class="right__top">
        <h1 class="chat__title">{{tituloChat}}</h1>
      </div>
      <ul class="right__bottom">
        <li class="chat__msj">[Personas activas en el chat]</li>
      </ul>
    </div>
    </div>
      <div class="videocall__icon-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-video-fill videocall__icon" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2z"/>
        </svg>
      </div>

  </section>
</template>

<style scoped>
.chat{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  transition: all 200ms ease-in-out;
  border-bottom: 1px solid var(--light_grey)
}
.chat__group{
  display: flex;
}
.videocall__icon-container{
  cursor: pointer;
  margin-right: 15px;
  padding: 16px 18px;
  border-radius: 10px;
  border: 1px solid var(--subtitle-color);
}
.videocall__icon{
  transform: scale(1.6);
  color: var(--background-color2);
  transition: all 300ms ease-in-out;

}
.videocall__icon-container:hover .videocall__icon {
  transform: scale(1.8); /* Cambia el valor de escala al hacer hover */
}


.chat__left-container{
  width: 6rem;
  height: 6rem;
}
.left__container-img{
  width: 100%;
  height: 100%;
  border-radius: 15px;
  overflow: hidden;
}
.chat__img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
.right__container{
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  margin-left: 1rem;
  font-size: 0.9rem;

}
.chat__title{
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--title-color);
}
.chat__msj{
  font-size: 1.2rem;
  color: var(--subtitle-color);
}
.right__bottom{
  display: flex;
}

.chat__msj + .chat__msj::before {
  content: ", ";
}
</style>