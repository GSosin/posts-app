<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
    default: false,
  },
  color: {
    type: String,
    required: true,
    default: "success",
  },
  icon: {
    type: String,
    required: true,
    default: "mdi-check-circle",
  },
  title: {
    type: String,
    required: true,
    default: "Info",
  },
  text: {
    type: String,
    required: true,
    default: "This is an alert",
  },
});
</script>
<template>
    <v-alert class="alert" v-if="props.open"
      :color="props.color"
      :icon="props.icon"
      :title="props.title"
      :text="props.text"
    ></v-alert>
</template>
<style scoped>
.alert {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9999;
}
</style>