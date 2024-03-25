//Homeview.vue
<script setup>
import { useUserStore } from "../store/userStore";
import { useDataBaseStore } from "../store/database";
import { ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const dataBaseStore = useDataBaseStore();
const router = useRouter();

dataBaseStore.getUrls();

const url = ref([]);

const hadleSumit = () => {
  dataBaseStore.addUrl(url.value);
};
</script>

<template>
  <h1>Home:</h1>
  <p>{{ userStore.userData?.email }}</p>
  <form @submit.prevent="hadleSumit">
    <input type="text" placeholder="Introduce url" v-model="url" />
    <button type="submit">Añadir</button>
  </form>
  <p v-if="dataBaseStore.loadingDoc">Loading...</p>
  <ul v-else>
    <li v-for="item in dataBaseStore.documents" :key="item.id">
      {{ item.id }} - {{ item.name }} - {{ item.short }} 

      <button @click="dataBaseStore.deleteUrl(item.id)">Eliminar</button>
      <button @click="router.push(`/editar/${item.id}`)">Editar</button>
    </li>
  </ul>
</template>
