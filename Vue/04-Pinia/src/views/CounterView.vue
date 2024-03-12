<script setup>
import { useCounterStore } from "../store/counter.js";
import { storeToRefs } from "pinia";

const counter = useCounterStore();
const { increment } = counter;
const { double, count } = storeToRefs(counter);
</script>

<template>
  <h5>Cantidad:{{ count }}</h5>
  <h5>Cantidad:{{ double }}</h5>
  <button @click="increment">Incrementar</button>
</template>
