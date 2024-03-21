<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/userStore";
import { storeToRefs } from "pinia";
// import { useRouter } from "vue-router";

const userStore = useUserStore();
const { register } = userStore;
// const router = useRouter();
const { loadingUser } = storeToRefs(userStore);

const email = ref("correo@correo.com");
const password = ref("123123123");

const hadleSubmit = async () => {
  if (!email.value || password.value.length < 6) {
    return alert("Introduce todos los campos");
  }

  await register(email.value, password.value);
  // router.push({ name: "home" });
};
</script>

<template>
  <h1>Register</h1>
  <form @submit.prevent="hadleSubmit">
    <input type="email" placeholder="Ingrese email" v-model.trim="email" />
    <input
      type="password"
      placeholder="Ingrese contraseña"
      v-model.trim="password"
    />
    <button type="submit" :disabled="loadingUser">Crear Usuario</button>
  </form>
</template>
<style scoped></style>
