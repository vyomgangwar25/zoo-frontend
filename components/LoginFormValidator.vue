<template>
  <div>
    <div v-if="emailError" class="error">{{ emailError }}</div>
    <div v-if="passwordError" class="error">{{ passwordError }}</div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const emit = defineEmits("emailError");
const props = defineProps({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailError: {
    type: String,
    required: true,
  },
  passwordError: {
    type: String,
    required: true,
  },
});

const emailError = computed(() => {
  if (!props.email) emit("emailError", "Email is required.");
  else if (!/\S+@\S+\.\S+/.test(props.email))
    emit("emailError", "Email is not valid.");

  return "";
});

const passwordError = computed(() => {
  if (!props.password) {
    return "Password is required.";
  } else if (props.password.length < 6) {
    return "Password must be at least 6 characters.";
  }
  return "";
});
</script>

<style scoped>
.error {
  color: red;
}
</style>
