<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const pokemon = ref({});

const back = () => {
  router.push("/pokemons");
};
const obtenePokemon = async () => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${route.params.name}`;
    const { data } = await axios.get(url);
    console.log(data.sprites.front_default);
    pokemon.value = data;
  } catch (error) {
    console.log(error);
    pokemon.value = null;
  }
};
obtenePokemon();
</script>

<template>
  <div>
    <div v-if="pokemon">
      <h5>Poke name:{{ pokemon.name }}</h5>
      <img :src="pokemon.sprites?.front_default" />
    </div>
    <h4 v-else>No existe el Pokemon</h4>
    <div>
      <button @click="back" class="btn btn-outline-primary">Back</button>
    </div>
  </div>
</template>
<style scoped></style>
