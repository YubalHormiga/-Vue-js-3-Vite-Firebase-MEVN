import { ref } from "vue";
import { useRoute } from "vue-router";

import axios from "axios";

export const UsePokemons = () => {
  const route = useRoute();
  const pokemons = ref([]);
  const loading = ref(true);
  const pokemon = ref({});
  const error = ref('');
  const url = "https://pokeapi.co/api/v2/pokemon";

  const getPokemons = async () => {
    loading.value = true;
    try {
      const { data } = await axios.get(url);
      const { results } = data;
      pokemons.value = results;
      console.log(results)
    } catch (e) {
       
        error.value = "Error de conexión";
    } finally {
      loading.value = false;
    }
  };
  const obtenerPokemon = async () => {
    try {
      const { data } = await axios.get(`${url}/${route.params.name}`);
      console.log(data.sprites.front_default);
      pokemon.value = data;
      // console.log(data)
    } catch (e) {
        pokemon.value = null;
        error.value = "No existe el pokemon";
    }finally{
        loading.value = false
    }
  };

  return {
    pokemons,
    getPokemons,
    loading,
    pokemon,
    obtenerPokemon,
    error,
  };
};
