<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { UsePokemons } from "../composables/UsePokemons.js";

const { pokemons, getPokemons, loading, error } = UsePokemons();

getPokemons();

const postXPage = 5;
const inicio = ref(0);
const fin = ref(postXPage);

const next = () => {
  inicio.value = inicio.value + postXPage;
  fin.value = fin.value + postXPage;
};
const previus = () => {
  inicio.value = inicio.value - postXPage;
  fin.value = fin.value - postXPage;
};

const maxLegth = computed(() => pokemons.value.length);
</script>

<template>
  <h1>Pokemon</h1>
  <p v-if="loading">Cargando información</p>
  <div class="alert alert-danger" v-if="error">
    {{ error }}
  </div>
  <div v-if="pokemons">
    <ul>
      <li v-for="(pokemon, index) in pokemons.slice(inicio, fin)" :key="index">
        <router-link :to="`/pokemons/${pokemon.name}`">{{
          pokemon.name
        }}</router-link>
      </li>
    </ul>
    <button @click="previus" :disabled="inicio <= 0"
    >Previus</button>
    <button @click="next" :disabled="fin >= maxLegth">Next</button>
  </div>
</template>
<style scoped></style>
