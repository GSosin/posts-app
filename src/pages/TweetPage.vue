<script setup>
import { ref } from "vue";
import AppBar from "@/components/AppBar.vue";
import Footer from "@/components/Footer.vue";
import { createTweetService, updateTweetService, getTweetService } from "@/services/tweetServices";
import { useRouter } from "vue-router";
import { defineProps } from "vue";
const user = JSON.parse(localStorage.getItem("user"));
const router = useRouter();
const props = defineProps({
  id: {
    type: String,
    required: false,
  },
});
const tweet = props.id ? await getTweetService(user.id, props.id) : { title: "", content: "" };
const titleModel = ref(tweet.title);
const contentModel = ref(tweet.content);

const handleTweet = async () => {

  if (!props?.id) {
    await createTweetService(user.id,{ title: titleModel.value, content: contentModel.value });
  } else{
    await updateTweetService(user.id,{...tweet, title: titleModel.value, content: contentModel.value})

  }
  router.push("/");
};
</script>

<template>
  <AppBar />
  <div class="container">
    <h1 class="title">{{props.titlePage}}</h1>
    <v-form class="form">
      <v-text-field
        v-model="titleModel"
        label="Titulo"
        outlined
        required
      ></v-text-field>
      <v-text-field
        v-model="contentModel"
        label="Contenido"
        outlined
        required
      ></v-text-field>
      <v-btn @click="handleTweet" color="primary">Enviar</v-btn>
    </v-form>
  </div>
  <Footer />
</template>

<style scoped>
.title {
  text-align: center;
  margin-top: 50px;
}
.form {
  width: 400px;
  margin: 0 auto;
}
.c
.container {
  display: flex;
  justify-content: center;
}
</style>
