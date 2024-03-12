<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container">
      <router-link to="/" class="navbar-brand" href="#">
        <img src="@/assets/logo.svg" alt="Bootstrap" width="30" height="24" />
        PokeApi
      </router-link>
      <div>
        <router-link class="btn btn-outline-primary"  active-class="active" to="/">Home</router-link>
        <router-link class="btn btn-outline-primary" to="/pokemons" active-class="active"
          >Pokemons</router-link
        >
        <router-link class="btn btn-outline-primary" to="/favoritos" active-class="active"
          >Favoritos</router-link
        >
        <router-link class="btn btn-outline-primary" to="/counter" active-class="active"
          >Counter</router-link
        >
      </div>
    </div>
  </nav>
  <div class="container">
    <RouterView />
  </div>
</template>
