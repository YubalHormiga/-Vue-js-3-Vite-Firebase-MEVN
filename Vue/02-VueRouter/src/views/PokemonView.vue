<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import axios from "axios";


const pokemons = ref([]);

const obtenePokemons = async () => {
  try {
    const url = "https://pokeapi.co/api/v2/pokemon";
    const { data } = await axios.get(url);
    const { results } = data;
    pokemons.value = results;
    console.log(results);
  } catch (error) {
    console.log(error);
  }
};

obtenePokemons();
</script>

<template>
  <h1>Pokemon</h1>
  <ul>
    <li v-for="(pokemon, index) in pokemons" :key="index">
      <router-link :to="`/pokemons/${pokemon.name}`">{{
        pokemon.name
      }}</router-link>
    </li>
  </ul>
</template>
<style scoped></style>
