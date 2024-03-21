<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/userStore";
// import { useRouter } from "vue-router";

const userStore = useUserStore();
const { login } = userStore;
// const router = useRouter();
const { loadingUser } = storeToRefs(userStore);

const email = ref("correo@correo.com");
const password = ref("123123123");

const hadleSubmit = async () => {
  if (!email.value || password.value.length < 6) {
    return alert("Introduce todos los campos");
  }

  await login(email.value, password.value);
  // router.push({ name: "home" });
};
</script>

<template>
  <h1>Login</h1>
  <form @submit.prevent="hadleSubmit">
    <input type="email" placeholder="Ingrese email" v-model.trim="email" />
    <input
      type="password"
      placeholder="Ingrese contraseña"
      v-model.trim="password"
    />
    <button type="submit" :disabled="loadingUser">Acceso</button>
  </form>
</template>
<style scoped></style>
