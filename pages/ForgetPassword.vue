<script lang="ts" setup>
import { Form, Field, ErrorMessage } from "vee-validate";
const userEmail = ref("");
const toastMessage = ref("");
const isToastVisible = ref(false);
 

const closeToast = () => {
  isToastVisible.value = false;
};

function forgetPassword() {
      $fetch<string>("/api/forget-password", {
    method: "POST",
    body: JSON.stringify({
      email: userEmail.value,
    }),
  })
    .then(function (response: any) {
      navigateTo(`/SetPassword?token=${response}`);
    })
    .catch(function (err) {
      toastMessage.value = err.response._data;
      isToastVisible.value = true;
    });
}
</script>

<template>
  <AlertPopup
    :label="toastMessage"
    :isVisible="isToastVisible"
    @close="closeToast"
  />
  <div>
    <div class="flex items-center justify-center min-h-screen bg-blue-100">
      <div class="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <h1 class="text-3xl font-bold text-center text-gray-700 mb-8">
          Enter Email
        </h1>
        <Form class="space-y-6" @submit="forgetPassword">
          <div class="flex flex-col">
            <label
              for="newPassword"
              class="block text-sm font-medium text-gray-700"
            >
              Enter your email
            </label>
            <Field
              name="email"
              type="email"
              class="px-4 py-2 text-base border-b-2 border-slate-500 focus:outline-none bg-white text-slate-800 w-full"
              v-model="userEmail"
              rules="required|email"
            />
            <ErrorMessage name="email" class="text-red-600 text-sm mt-1" />
          </div>
          <Button name="reset">Reset Password</Button>
        </Form>
      </div>
    </div>
  </div>
</template>
