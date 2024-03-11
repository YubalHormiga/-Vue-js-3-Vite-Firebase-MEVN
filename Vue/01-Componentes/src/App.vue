<script setup>
import { ref, computed, onMounted } from "vue";

import ButtonCounter from "./components/ButtonCounter.vue";
import BlogPostVue from "./components/BlogPost.vue";
import PaginatePost from "./components/PaginatePost.vue";
import LoadingSpinner from "./components/LoadingSpinner.vue";

const posts = ref([]);
const postXPage = 10;
const inicio = ref(0);
const fin = ref(postXPage);
const loading = ref(true);

const favorito = ref("");
const cambiarFavorito = (post) => {
  favorito.value = post;
  console.log("post");
};

onMounted(async () => {
  // loading.value = true;
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    posts.value = data;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});

// fetch("https://jsonplaceholder.typicode.com/posts")
//   .then((res) => res.json())
//   .then((data) => {
//     posts.value = data;
//   })
//   .finally(() =>
//     setTimeout(() => {
//       loading.value = false;
//     }, 2000)
//   );

const next = () => {
  inicio.value = inicio.value + postXPage;
  fin.value = fin.value + postXPage;
};
const previus = () => {
  inicio.value = inicio.value - postXPage;
  fin.value = fin.value - postXPage;
};

const maxLegth = computed(() => posts.value.length);
</script>

<template>
  <LoadingSpinner v-if="loading" />
  <div class="container" v-else>
    <h1>Componentes</h1>
    <h2>Mi post favorito: Post {{ favorito }}</h2>
    <PaginatePost
      class="mb-2"
      @next="next"
      @previus="previus"
      :inicio="inicio"
      :fin="fin"
      :maxLegth="maxLegth"
    />
    <!-- <ButtonCounter />
    <button-counter></button-counter>
    <BlogPostVue
      title="Post1"
      id="1"
      body="Descripcion 1"
      colorText="primary"
    />
    <BlogPostVue
      title="Post2"
      id="2"
      body="Descripcion 2"
      colorText="secondary"
    />
    <BlogPostVue
      title="Post3"
      id="3"
      body="Descripcion 3"
      colorText="success"
    /> -->
    <BlogPostVue
      v-for="post in posts.slice(inicio, fin)"
      :key="post.id"
      :post="post"
      @cambiar-favorito="cambiarFavorito"
      class="mb-2"
    />
  </div>
</template>

<style scoped></style>
import { Button } from "bootstrap";, computedimport LoadingSpinnerVue from
"./components/LoadingSpinner.vue";, onMounted
