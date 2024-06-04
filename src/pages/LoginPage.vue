<script setup>
import { ref } from "vue";
import { loginUserService } from "@/services/userServices";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const router = useRouter();
const openErrorAlert = ref(false);
const LoginUser = async () => {
  const userFound = await loginUserService({
    email: email.value,
    password: password.value,
  });
  if (userFound) {
    localStorage.setItem("user", JSON.stringify(userFound));
    setTimeout(() => {
      router.push("/");
    }, 2000);
  } else {
    openErrorAlert.value = true;
    setTimeout(() => {
      openErrorAlert.value = false;
    }, 3000);
  }
};
</script>

<template>
    <AlertCustom
      :open=openErrorAlert
      color="error"
      icon="$error"
      title="Error al iniciar sesión"
      text="Correo o contraseña incorrectos."
    />
  <div class="container">
    <v-card class="mx-auto" width="400">
      <template v-slot:title>
        <span class="font-weight-black">Login Usuario</span>
      </template>

      <v-card-text class="bg-surface-light pt-4">
        <v-form>
          <v-text-field
            v-model="email"
            label="Correo"
            outlined
            dense
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Contraseña"
            outlined
            dense
            required
            type="password"
          ></v-text-field>

          <v-btn @click="LoginUser" color="primary" block>
            Login
          </v-btn>
        </v-form>
        <p class="title">¿No tienes cuenta? <router-link to="/register">Regístrate</router-link></p>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.title {
  text-align: center;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}
</style>
