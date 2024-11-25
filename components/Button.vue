<script setup>
import { defineProps } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex justify-center">
    <button
      type="submit"
      class="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {{ name }}
    </button>
  </div>
</template>
