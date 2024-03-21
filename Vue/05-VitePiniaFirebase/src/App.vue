<script setup>
import { useUserStore } from "./store/userStore";

const userStore = useUserStore();
const { logoutUser } = userStore;
</script>

<template>
  <h1 class="title">App Base</h1>
  <nav class="nav" v-if="!userStore.loadingSession">
    <router-link :to="{ name: 'home' }" class="router-link" v-if="userStore.userData">Home |</router-link>
    <router-link :to="{ name: 'login' }" class="router-link" v-if="!userStore.userData"
      >Login |</router-link
    >
    <router-link :to="{ name: 'register' }" class="router-link" v-if="!userStore.userData"
      >Register |</router-link
    >
    <button @click="logoutUser" v-if="userStore.userData">Logout</button>
  </nav>
  <div v-else>Loading user...</div>
  <router-view></router-view>
</template>
<style scoped>
.title {
}
.nav {
  display: flex;
}
.router-link {
  text-decoration: none;
  padding: 5px;
}
</style>
