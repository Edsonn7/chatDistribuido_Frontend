<script setup>
import Header_chats from "@/components/home_page.vue";
import { defineProps } from 'vue';

const props = defineProps({
  nombreSala: String // Definir una prop para el nombre de la sala
});
</script>

<template>
  <article class="chat">
    <div class="chat__left-container">
      <div class="left__container-img">
        <img src="" alt="" class="chat__img">
      </div>
    </div>
    <div class="right__container">
      <div class="right__top">
        <h1 class="chat__title">{{nombreSala}}</h1>
      </div>
      <div class="right__bottom">
        <span class="chat__msj"><strong>Epson Cock:</strong> Soy puto</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.chat{
  display: flex;
  padding: 1rem;
  padding-right: 1.5rem;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  border-bottom: 1px solid var(--light_grey)
}
.chat:hover{
  background-color: var(--background-color2);
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
</style>