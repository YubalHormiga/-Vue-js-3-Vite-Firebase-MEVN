<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="error-container">
    <h1>404</h1>
    <p>¡Oops! La página que estás buscando no se encuentra.</p>
    <p>Vuelve a: <router-link to="/">Home</router-link> la página principal</p>
  </div>
</template>
<style>
body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  background-color: #f4f4f4;
}

.error-container {
  text-align: center;
}

h1 {
  font-size: 5em;
  margin: 0;
  color: #333;
}

p {
  font-size: 1.5em;
  margin-top: 0.5em;
  color: #666;
}

a {
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}
</style>
