<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const nameUser = ref("");
const router = useRouter();
const { name } = JSON.parse(localStorage.getItem("user"));
nameUser.value = name;

const logOut = () => {
  localStorage.removeItem("user");
  router.push("/login");
};
const moveToProfile = () => {
  router.push("/profile");
};

const moveToHome = () => {
  router.push("/");
};
</script>
<template>
    <v-app-bar :elevation="2">
  <template v-slot:prepend>
  </template>

  <v-app-bar-title>Hola {{ name }}!</v-app-bar-title>
  <v-btn @click="moveToProfile" text>Mi usuario</v-btn>
    <v-btn @click="logOut" text>Cerrar sesión</v-btn>
    <v-btn  @click="moveToHome" text>Inicio</v-btn>
</v-app-bar>
</template>