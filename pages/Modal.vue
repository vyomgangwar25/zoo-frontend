<template>
  <div
    v-if="isactive"
    class="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
      <p class="text-sm text-gray-500 mb-4">
        Are you sure you want to remove this item?
      </p>
      <div class="flex justify-end space-x-2">
        <button
          @click="modalopen"
          class="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-500"
        >
          Ok
        </button>
        <button
          @click="closeModal"
          class="px-4 py-2 bg-gray-100 text-gray-900 text-sm rounded hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isactive = ref(true);

const modalopen = () => {
  isactive.value = false;
};

const closeModal = () => {
  isactive.value = false;
};
</script>
