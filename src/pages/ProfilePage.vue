<script setup>
import AppBar from "@/components/AppBar.vue";
import { updateUserService } from "@/services/userServices";
import Footer from "@/components/Footer.vue";
import { ref } from "vue";
import { getUserService } from "@/services/userServices";
import {useRouter} from "vue-router";
const router = useRouter();
const user = await getUserService(JSON.parse(localStorage.getItem("user")).id);
const nameModel = ref(user.name);
const emailModel = ref(user.email);
const passwordModel = ref(user.password);
const openSuccessAlert = ref(false);
const updateProfile = async () => {
    if (!nameModel.value || !emailModel.value || !passwordModel.value) {
        alert("No se puede dejar ningun campo vacio");
        return;
    }
    const response = await updateUserService({
        ...user,
        name: nameModel.value,
        email: emailModel.value,
        password: passwordModel.value,
    });
    
    if (response.status !== 200) {
        alert("Error al actualizar usuario");
        return;
    }
    localStorage.setItem("user", JSON.stringify({
        ...user,
        name: nameModel.value,
        email: emailModel.value,
        password: passwordModel.value,
    }));
    openSuccessAlert.value = true;
    setTimeout(() => {
        openSuccessAlert.value = false;
    }, 3000);
    router.push("/");

};
</script>
<template>
    <AppBar />
    <AlertCustom
        :open=openSuccessAlert
        color="success"
        icon="$success"
        title="Usuario actualizado"
        text="El usuario ha sido actualizado exitosamente."
    />
    <h1 class="profile">Mi Perfil</h1>
    <v-form class="form">
        <v-text-field
            v-model="nameModel"
            label="Nombre"
            outlined
            required
            
        ></v-text-field>
        <v-text-field
            v-model="emailModel"
            label="Correo"
            outlined
            required
        ></v-text-field>
        <v-text-field
            v-model="passwordModel"
            label="Contraseña"
            outlined
            required
            type="password"
        ></v-text-field>
        <v-btn @click="updateProfile" color="primary">Actualizar</v-btn>
    </v-form>
    <Footer />
</template>
<style scoped>
.profile {
    text-align: center;
    margin-top: 50px;
}
.form {
    width: 400px;
    margin: 0 auto;
}
</style>