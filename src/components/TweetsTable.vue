<script setup>
import { defineProps } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { removeTweetService} from "@/services/tweetServices";
import AlertCustom from "@/components/AlertCustom.vue";
const user = JSON.parse(localStorage.getItem("user"));
const openRemoveTweetAlert = ref(false);
const props = defineProps({
  tweets: {
    type: Array,
    required: true,
  },
});
const router = useRouter();
const handleUpdateTweet = (tweetId) => {
  router.push({name: 'Tweet', params: { titlePage: 'Actualizar Tweet', id: tweetId}})

};
const handleDeleteTweet = async (tweetId) => {
  await removeTweetService(user.id, tweetId);
  tweets.value = tweets.value.filter(tweet => tweet.id !== tweetId);
  openRemoveTweetAlert.value = true;
  setTimeout(() => {
    openRemoveTweetAlert.value = false;
  }, 3000);
};
const tweets = ref(props.tweets);
</script>
<template>
  <AlertCustom
        :open=openRemoveTweetAlert
        color="success"
        icon="$success"
        title="Tweet eliminado"
        text="El tweet ha sido eliminado exitosamente."
    />
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Titulo
        </th>
        <th class="text-left">
          Contenido
        </th>
        <th class="text-left">
          Fecha
        </th>
        <th class="text-left">
          Acciones
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in tweets"
        :key="item.name"
      >
        <td>{{ item.title }}</td>
        <td>{{ item.content }}</td>
        <td>{{ new Date(item.date).toLocaleDateString() }}</td>
        <td>
          <v-btn @click="handleUpdateTweet(item.id)" class="button" color="primary" text>Editar</v-btn>
          <v-btn color="error" @click="handleDeleteTweet(item.id)" text>Eliminar</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<style>
th {
  text-align: left;
}
.button {
  margin-right: 10px;
}
</style>