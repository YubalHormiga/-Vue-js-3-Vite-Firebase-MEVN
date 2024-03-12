<script setup>
import { useFavoritosStore } from "@/store/favoritos";
import { RouterLink } from "vue-router";


const useFavoritos = useFavoritosStore();

</script>

<template>
  <h1>Favoritos</h1>
  <p v-if="useFavoritos.favoritos.length == 0">No hay favoritos</p>
  <ul v-else>
    <li v-for="(item, index) in useFavoritos.favoritos" :key="index">
      {{ item.name }}
      <button   @click="useFavoritos.eliminar(item.id)">Eliminar</button>
      <router-link :to="`/pokemons/${item.name}`" >Mas información</router-link>  
    </li>
  </ul>
</template>
<style scoped></style>

