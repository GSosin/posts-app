<script setup>
import { removeUserService, convertToAdminService, getUserService } from "@/services/userServices";
import { useRouter } from "vue-router";
import sound from "../assets/sounds/admin-sound.mp3";
const userSavedInLocalStorage = JSON.parse(localStorage.getItem("user"));
const user = await getUserService(userSavedInLocalStorage.id);
const router = useRouter();
const isAdmin = ref(user.isAdmin);
const removeUser = async () => {
  const response = await removeUserService(user.id);
  if (response.status === 200) {
    localStorage.removeItem("user");
    router.push("/login");
  } else {
    alert("Error al eliminar usuario");
  }
};

const convertToAdmin = async () => {
  const response = await convertToAdminService(user.id);
  if (response.status === 200) {
    localStorage.setItem("user", JSON.stringify(await response.json()));
    isAdmin.value = true;
    const audio = new Audio(sound);
    audio.play();
    alert("Usuario convertido a admin");
    setTimeout(() => {
      audio.pause();
    }, 7000);
  } else {
    alert("Error al convertir usuario a admin");
  }
};

</script>
<template>
  <v-footer>
    <v-row justify="center" no-gutters>
      <v-btn
        class="mx-2"
        color="white"
        rounded="xl"
        variant="text"
        @click="removeUser"
      >
        Eliminar Usurio
      </v-btn>
      <v-btn v-if="!isAdmin"
        class="mx-2"
        color="white"
        rounded="xl"
        variant="text"
        @click="convertToAdmin"
        >
        Quiero ser Admin
      </v-btn>
    </v-row>
  </v-footer>
</template>
<style scoped>
.v-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
