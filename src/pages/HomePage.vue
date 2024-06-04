<script setup>
import AppBar from "@/components/AppBar.vue"
import Footer from "@/components/Footer.vue"
import TweetsTable from "@/components/TweetsTable.vue"
import { getUserService } from "@/services/userServices"
import { useRouter } from "vue-router"
import {createTweetService, getTweetsService } from "@/services/tweetServices"
const { id } = JSON.parse(localStorage.getItem("user"))
const tweets = await getTweetsService(id)
const router = useRouter()
const handleCreateTweet = () => {
    router.push({name: 'Tweet'})
}
</script>
<template>
  <div>
    <AppBar />
    <h1>Pagina Principal</h1>
    <div class="buttonContainer">
        <v-btn @click="handleCreateTweet" class="button" color="success" text>Crear tweet</v-btn>
    </div>
    <TweetsTable :tweets="tweets" />
    <Footer />
  </div>
</template>
<style scoped>
h1 {
  text-align: center;
  margin-top: 20px;
}
.button {
  margin: 20px;
}
.buttonContainer {
  display: flex;
  justify-content: right;
}
</style>
