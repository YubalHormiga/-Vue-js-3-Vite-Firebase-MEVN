import { computed, onMounted, ref, watch } from "vue";
import { defineStore } from "pinia";

export const useFavoritosStore = defineStore("favoritos", () => {
  const favoritos = ref([]);
  watch(
    favoritos,
    () => {
      guardarLocalStorage();
    },
    {
      deep: true,
    }
  );
  const guardarLocalStorage = () => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
  };

  onMounted(() => {
    favoritos.value = JSON.parse(localStorage.getItem("favoritos")) ?? [];
    
  });
  const incluirAfavoritos = (pokemon) => {
    favoritos.value.push(pokemon);
  };
  const eliminar = (id) => {
    favoritos.value = favoritos.value.filter((pokemon) => pokemon.id !== id);
  };

  const existe = computed(() => {
    return (pokemon) =>
      favoritos.value.find((poke) => poke.name === pokemon.name);
  });

  return {
    favoritos,
    incluirAfavoritos,
    eliminar,
    existe,
  };
});
