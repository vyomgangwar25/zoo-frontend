<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);
</script>

<template>
  <div
    v-if="isVisible"
    id="toast-default"
    class="fixed top-16 right-4 flex items-center w-full max-w-xs p-4 text-green-500 bg-white rounded-lg shadow dark:text-green-400 dark:bg-green-800 z-50"
  >
    <div class="ms-3 text-sm font-normal">{{ label }}</div>
    <button
      type="button"
      @click="emit('close')"
      class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 h-8 w-8 dark:text-gray-red dark:hover:text-white dark:bg-green-800"
    >
      <svg
        class="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </button>
  </div>
</template>
