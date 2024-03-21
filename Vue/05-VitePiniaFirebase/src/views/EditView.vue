<script setup>
import { useRoute } from "vue-router";
import { useDataBaseStore } from "../store/database";
import { onMounted, ref } from "vue";

const dataBaseStore = useDataBaseStore();
const route = useRoute();
console.log(route.params.id);

const url = ref("");

onMounted(async () => {
  url.value = await dataBaseStore.leerUrl(route.params.id);
});
const hadleSumit = () => {
  console.log("editar");
  dataBaseStore.updateUrl(route.params.id, url.value)
};
</script>

<template>
  <h1>Editar id:{{ route.params.id }}</h1>
  <form @submit.prevent="hadleSumit">
    <input type="text" placeholder="Modifica url" v-model="url"/>
    <button>Actualizar</button>
  </form>
</template>
<style scoped></style>
