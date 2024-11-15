<template>
      <AlertPopup :label="toastMessage" :isVisible="isToastVisible" @close="closeToast" />
  <div>
    <div class="flex items-center justify-center min-h-screen bg-blue-100">
      <div class="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <h1 class="text-3xl font-bold text-center text-gray-700 mb-8">
          Enter Email
        </h1>
        <Form   class="space-y-6" @submit="handleResetPassword">
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

<script lang="ts" setup>
import { ref } from "vue";
import Button from "~/components/Button.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useCustomFetch } from "~/composable/useFetchOptions";
import AlertPopup from "~/components/AlertPopup.vue";
const userEmail = ref("");
const toastMessage :Ref<string> = ref('');
const isToastVisible = ref(false);
const closeToast=()=>{
  isToastVisible.value=false
}

const handleResetPassword = async () => {
  try {
    const response :any= await useCustomFetch("/forgetpassword", {
      method: "POST",
      body:userEmail.value,
    
    });
    console.log(response);
    toastMessage.value="reset password link sent to  console ";
    isToastVisible.value = true;
   
  } catch (err:any) {
    toastMessage.value = err.response._data;
    isToastVisible.value = true;
   
  }
};
</script>
