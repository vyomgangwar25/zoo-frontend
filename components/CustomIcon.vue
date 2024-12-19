<script lang="ts" setup>
const emit = defineEmits(["clicked"]);
const props = defineProps<{
  name: string;
  iconcolour: String;
}>();
</script>

<template>
  <div>
    <span
      @click="emit('clicked')"
      :class="'inline-flex items-center justify-center border border-gray-200 text-white p-2 rounded-md cursor-pointer bg-gray-100 hover:bg-gray-500 hover:text-white ml-2'"
    >
      <Icon :name="props.name" :class="'text-2xl' + props.iconcolour" />
    </span>
  </div>
</template>

<style></style>
