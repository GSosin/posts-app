<script setup>
import { ref } from "vue";
import { createUserService } from "@/services/userServices";
import { useRouter } from "vue-router";
import AlertCustom from "@/components/AlertCustom.vue";
const name = ref("");
const email = ref("");
const password = ref("");
const openSuccessAlert = ref(false);
const openErrorAlert = ref(false);
const router = useRouter();
const createUser = async () => {
  if (!name.value || !email.value || !password.value) {
    openErrorAlert.value = true;
    setTimeout(() => {
      openErrorAlert.value = false;
    }, 3000);
    return;
  }
  const response = await createUserService({
    name: name.value,
    email: email.value,
    password: password.value,
  });
  if (response.status === 201) {
    openSuccessAlert.value = true;
    localStorage.setItem("user", JSON.stringify(await response.json()));
    setTimeout(() => {
      router.push("/");
    }, 2000);
  } else {
    alert("Error al crear usuario");
  }
};
</script>

<template>
  <div>
    <AlertCustom
      :open=openSuccessAlert
      color="success"
      icon="$success"
      title="Usuario creado exitosamente"
      text="El usuario ha sido creado exitosamente."
    />

    <AlertCustom
      :open=openErrorAlert
      color="error"
      icon="$error"
      title="Error al crear usuario"
      text="Todos los campos son requeridos."
    />
  </div>
  <div class="container">
    <v-card class="mx-auto" width="400">
      <template v-slot:title>
        <span class="font-weight-black">Registrar Usuario</span>
      </template>

      <v-card-text class="bg-surface-light pt-4">
        <v-form>
          <v-text-field
            v-model="name"
            label="Nombre"
            outlined
            dense
            required
          ></v-text-field>

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

          <v-btn @click="createUser" color="primary" block>
            Registrame
          </v-btn>
        </v-form>
        <p class="title">¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link></p>
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
