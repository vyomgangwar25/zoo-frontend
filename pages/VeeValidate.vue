<script lang="ts" setup>
import { defineRule, ErrorMessage, Field, Form } from "vee-validate";
import { required, email, min } from "@vee-validate/rules";
defineRule("required", required);
defineRule("email", email);
defineRule("min", min);

function onSubmit() {
  alert("form is submitted");
}
definePageMeta({
  layout: false,
});

const userEmail = ref("aks@gmail.com");
</script>

<template>
  <div class="test">
    <Form @submit="onSubmit">
      <br /><br />
      <Field
        name="email"
        v-model="userEmail"
        rules="required|email"
        v-slot="{ field, errorMessage }"
        class="border"
      >
        <CustomInput
          type="email"
          v-bind="field"
          placeholder="Enter your email"
          :errorMessage="errorMessage"
        />
      </Field>

      <br /><br />
      <button>Sign up</button>
    </Form>
  </div>
</template>

<style scoped>
.test {
  display: flex;
  justify-content: center; /* Centers horizontally */
  align-items: center; /* Centers vertically */
  height: 100vh; /* Full height of the viewport */
}
</style>
