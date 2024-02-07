<script setup>
// Variables
import {ref} from "vue";

const verClave = ref('password')
</script>

<template>
  <body>

  <div class="layout">
    <div class="layout__content">
      <header class="content__header">
        <div class="header__container-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="header__icon bi bi-chat-dots-fill" viewBox="0 0 16 16">
            <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
          </svg>
        </div>
        <div class="header__text">
          <h1 class="header__title">PsMessage</h1>
          <h5 class="header__subtitle">Conectate y comunicate</h5>
        </div>
      </header>
      <div class="content__formulario">
        <form action="" class="contact__form">
          <div class="form__container">

            <h1 class="form__header">
              Iniciar sesión
            </h1>
            <div class="form__group">
              <input type="email" class="form__input" name="email" required placeholder="Email">
              <label for="email" class="form__label">Email</label>
            </div>

            <div class="form__group">
              <input type="text" class="form__input" name="contraseña " required placeholder="Contraseña">
              <label for="contraseña" class="form__label">Contraseña</label>

              <div class="form__contraseña-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="form__icon bi bi-lock-fill" viewBox="0 0 16 16">
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
                </svg>
              </div>
            </div>
          </div>
          <input type="submit" value="Continuar" class="form__button">
        </form>
      </div>
      <footer class="content__footer">
        <h5 class="footer__title">
          ¿Aún no tienes cuenta?
        </h5>
        <a href="#" class="footer__link">Crear cuenta</a>
      </footer>
    </div>
  </div>
  </body>
</template>

<style scoped>
body{
  width: 100%;
  height: 100%;
  font-family: "Poppins", Helvetica, sans-serif;
  font-size: 1.5rem;
}


h1, h2, h3, h4, h5, h6{
  color: var(--title-color);
}
body{
  background-image: linear-gradient(to bottom, var(--background-color1) 70%, var(--background-color2), var(--principal-color) );
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
}
.layout{
  width: 28%;
  margin: 10vh auto;
  padding: 5rem 8rem;
  display: flex;
  justify-content: center;
  position: relative;

  background-color: var(--principal-color);
  border-radius: 1rem;
  box-shadow: 0 0 30px -5px #44419D;
}
.layout__content{
  width: 100%;
}
.content__header{
  width: 100%;
}
.header__container-icon{
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}
.header__icon {
  width: 5rem;
  height: 5rem;
  fill: var(--secondary-color);
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

.content__formulario{
  margin-top: 4.5rem;
}
.form__header{
  font-size: 2rem;
  color: var(--title-color);

  text-align: center;
  margin-bottom: 2rem;
}

.form__group{
  position: relative;
  margin-bottom: 2.5rem;
}
.form__contraseña-icon{
  position: absolute;
  top: 12px;
  right: 15px;
}
.form__icon{
  width: 18px;
  height: 18px;
}
.form__input
{
  position: relative;
  width: 100%;
  height: 4.2rem;
  display: block;
  font-size: 1.5rem;
  padding: 1rem 3rem 1rem 1.5rem;
  border: 0.2rem;
  border-radius: 0.5rem;
  outline: none;
  box-shadow: 0 1rem 1rem -8px rgba(0,0,0, 0.10);
  background-color: var(--bottons-color);
  line-height: 2.1rem;
}
.form__input:focus{
  border: 0.2rem solid var(--secondary-color);
}
.form__label{
  position: absolute;
  top: 1rem;
  left: 1.5rem;

  color: var(--color-company);
  transition: all 250ms ease-in-out;
  pointer-events: none;
}
.form__input:focus~label,
.form__input:not(:placeholder-shown)~label
{
  top: -2rem;
  left: 0;
  z-index: 1;
  font-size: 1.3rem;
  color: var(--secondary-color);
}
.form__input::-webkit-input-placeholder{
  color: transparent;
}
.form__input::-moz-placeholder{
  color: transparent;
}
.form__button{
  width: 100%;
  cursor: pointer;
  padding: 1rem 3rem;
  font-size: 1.5rem;
  border: 0.2rem solid var(--secondary-color);
  color: var(--title-color);
  background-color: var(--principal-color);
  border-radius: 1rem;
  box-shadow: 0 1rem 1rem -8px rgba(0,0,0, 0.22);
  transition: all 300ms linear;
  margin: 0 auto;
  margin-top: 2rem;
}
.form__button:hover{
  background-color: var(--secondary-color);
  color: var(--principal-color);
}
.form__button:active{
  background-color: var(--color-scrollbar);
}
.content__footer{
  height: 30%;
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.footer__title{
  color: var(--subtitle-color);
}
.footer__link{
  color: var(--secondary-color);
}

</style>