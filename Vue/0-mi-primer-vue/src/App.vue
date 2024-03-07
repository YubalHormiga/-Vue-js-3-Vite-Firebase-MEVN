<script setup>
import { ref, computed } from "vue";
const name = "Vue dinamico";
const styleColor = "color:blue";
const colors = ["blue", "red", "green"];
const activo = true;
const arrayFrutas = ["🍎", "🍌", "🍉", "🍓", "🍒"];
const arrayFrutas1 = [
  {
    name: "Manzana",
    price: "$1.00",
    description: "Una manzana",
    stock: 0,
  },
  {
    name: "Pera",
    price: "$2.00",
    description: "Una pera",
    stock: 10,
  },
  {
    name: "Naranja",
    price: "$3.00",
    description: "Una naranja",
    stock: 20,
  },
];
const fruta = {
  name: "Naranja",
  price: "$3.00",
  description: "Una naranja",
};

const handleClick = (message) => {
  console.log(message);
};

const counter = ref(0);
const increment = () => {
  console.log("aumentar");
  counter.value++;
};
const decrement = () => {
  console.log("decrementar");
  counter.value--;
};
const reset = () => {
  counter.value = 0;
  console.log("reset");
};

const classCounter = computed(() => {
  if (counter.value === 0) {
    return "zero";
  }
  return counter.value > 0 ? "positive" : "negative";
});

const favoritos = ref([]);
const estaEnFavoritos = (valor) => {
  return favoritos.value.includes(valor);
};
const add = () => {
  if (!estaEnFavoritos(counter.value)) {
    favoritos.value.push(counter.value);
  }
};
</script>
<template>
  <h1>Hola {{ name.toUpperCase() }}</h1>
  <h1>{{ colors }}</h1>
  <h2 :style="styleColor">Soy azul</h2>
  <h2 :style="`color:${colors[2]}`">Soy {{ colors[2] }}</h2>
  <h2>{{ activo ? "estoy activo" : "estoy inactivo" }}</h2>
  <p v-if="!activo">Estoy Inactivo</p>
  <p v-else>Estoy activo</p>
  <ul>
    <li v-for="(fruta, index) in arrayFrutas" :key="index">
      {{ index }} - {{ fruta }}
    </li>
  </ul>
  <ul>
    <li v-for="(fruta, index) in arrayFrutas1" :key="fruta.name">
      Nombre: {{ fruta.name }} Precio: {{ fruta.price }} Descripción:
      {{ fruta.description }}
    </li>
  </ul>
  <h6>V-for en objetos</h6>
  <ul>
    <li v-for="(value, propiedad, index) in fruta" :key="index">
      {{ index }} - {{ propiedad }} : {{ value }}
    </li>
  </ul>
  <h6>v-if +v-for</h6>
  <ul>
    <template v-for="(fruta, index) in arrayFrutas1" :key="index">
      <li v-if="fruta.stock > 10">
        Nombre: {{ fruta.name }} Precio: {{ fruta.price }} Descripción:
        {{ fruta.description }} - Stock: {{ fruta.stock }}
      </li>
    </template>
  </ul>
  <button @click="handleClick('activame1')">Activame</button>
  <button @click="handleClick('activame2')">Activame</button>
  <br />
  <button @click.left="handleClick('Text izquierdo')">
    Activame Izquierdo
  </button>
  <button @click.right.prevent="handleClick('Text derecho')">
    Activame Derecho
  </button>
  <button @click.middle="handleClick('Text centro')">Activame centro</button>
  <br />
  <h5 :class="classCounter">{{ counter }}</h5>
  <button @click="increment">Aumentar</button>
  <button @click="decrement">Decrementar</button>
  <button @click="reset">Reset</button>
  <button @click="add" :disabled="estaEnFavoritos(counter)">Add</button>

  <p>{{ favoritos }}</p>
  <ul>
    <li v-for="(number, index) in favoritos" :key="index">{{ number }}</li>
  </ul>
</template>
<style scoped>
h1 {
  color: red;
}
li {
  list-style: none;
}
.positive {
  color: blue;
}
.negative {
  color: red;
}
.zero {
  color: green;
}
</style>
, computed
