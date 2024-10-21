<template>
  <div>
    <input
      :type="type"
      :placeholder="placeholder"
      class="custom-input px-4 py-2 text-xl border-b-2 border-slate-500 focus:outline-none bg-white text-slate-800"
      @input="onInputChange"
      :required="true"
      :value="modelValue"
      />
    <p v-if="errormsz" class="text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  type: String,
  placeholder: String,
  modelValue: String,
  regex: String,
  errorMessage: String,
});

const emit = defineEmits(["update:modelValue"]);
const errormsz = ref(false);

const onInputChange = (event) => {
  const value = event.target.value;
  emit("update:modelValue", value);

  if (props.regex) {
    const pattern = new RegExp(props.regex);
    errormsz.value = !pattern.test(value);
  }
};
</script>
