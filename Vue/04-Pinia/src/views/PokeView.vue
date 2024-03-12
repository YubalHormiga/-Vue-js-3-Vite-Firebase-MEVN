<script setup>
import { useRouter } from "vue-router";
import { UsePokemons } from "../composables/UsePokemons.js";
import {useFavoritosStore} from '@/store/favoritos'

const useFavoritos = useFavoritosStore()

const router = useRouter();
const { obtenerPokemon, pokemon, error, loading } = UsePokemons();

const back = () => {
  router.push("/pokemons");
};

obtenerPokemon();
</script>

<template>
  <div class="alert alert-danger" v-if="error">
    {{ error }}
  </div>
  <div v-else>
    <p v-if="loading">Cargando información</p>
    <div v-if="pokemon">
      <h5>Poke name:{{ pokemon.name }}</h5>
      <img :src="pokemon.sprites?.front_default" />
    </div>
    <h4 v-else>No existe el Pokemon</h4>
    <div>
      <button @click="back" class="btn btn-outline-primary">Back</button>
    </div>
    <div>
      <button
        @click="useFavoritos.incluirAfavoritos(pokemon)"
        :disabled="useFavoritos.existe(pokemon)"
        class="btn btn-outline-primary"
      >
        Añadir a favorito
      </button>
    </div>
  </div>
</template>
<style scoped></style>
//DESACTIVAR
// :disabled='useFavoritos.favoritos.includes(pokemon)'
