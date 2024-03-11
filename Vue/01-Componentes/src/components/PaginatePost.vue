<script setup>
const emit = defineEmits(["next", "previus"]);
const props = defineProps(["inicio", "fin", "maxLegth"]);
</script>

<template>
  <div class="btn-group" role="group" aria-label="Basic example">
    <button
      @click="emit('previus')"
      type="button"
      class="btn btn-outline-primary"
      :disabled="inicio <= 0"
    >
      Previus {{ inicio }}
    </button>
    <button
      @click="emit('next')"
      type="button"
      class="btn btn-outline-primary"
      :disabled="fin >= maxLegth"
    >
      Next {{ fin }}
    </button>
  </div>
</template>
<style scoped></style>
