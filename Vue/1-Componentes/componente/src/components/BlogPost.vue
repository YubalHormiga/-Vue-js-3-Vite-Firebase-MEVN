<script setup>
const props = defineProps({
  // title: {
  //   type: String,
  // },
  // id: {
  //   type: String,
  // },
  // body: {
  //   type: String,
  // },
  // colorText: {
  //   type: String,
  // },
  post: {
    type: Object,
  },

});
const emit = defineEmits(["cambiar-favorito"]);

</script>

<template>
  <!-- <div class="card">
    <div class="card-body">
      <h5 class="card-title" :class="`text-${colorText}`">
        {{ id }}-{{ title }}
      </h5>
      <p>{{ body }}</p>
    </div>
  </div> -->
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ post.id }}-{{ post.title }}</h5>
      <p>{{ post.body }}</p>
      <button @click="emit('cambiar-favorito',post.id)">Favorito</button>
    </div>
  </div>
</template>
<style scoped></style>
