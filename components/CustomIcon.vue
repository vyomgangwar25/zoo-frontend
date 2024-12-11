<template>
  <div>
    <span
      @click="emit('clicked')"
      :class="
        'inline-flex items-center justify-center border border-gray-200 text-white p-2 rounded-md cursor-pointer bg-gray-100 hover:bg-gray-500 hover:text-white ml-2' +
        iconbg +
        iconhover
      "
    >
      <Icon :name="name" :class="'text-2xl' + iconcolour" />
    </span>
  </div>
</template>

<script setup>
const emit = defineEmits(["clicked"]);
const props = defineProps({
  name: String,
  iconcolour: String,
  iconbg: String,
  iconhover: String,
});
</script>

<style></style>
