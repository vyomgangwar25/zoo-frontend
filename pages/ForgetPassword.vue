<template>
      <AlertPopup :label="toastMessage" :isVisible="isToastVisible" @close="closeToast" />
  <div>
    <div class="flex items-center justify-center min-h-screen bg-blue-100">
      <div class="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <h1 class="text-3xl font-bold text-center text-gray-700 mb-8">
          Enter Email
        </h1>
        <form class="space-y-6" @submit.prevent="handleResetPassword">
          <div class="flex flex-col">
            <label
              for="newPassword"
              class="block text-sm font-medium text-gray-700"
            >
              Enter your email
            </label>
            <CustomInput
              type="email"
              v-model="email"
              placeholder="Enter your email"
              regex="^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$"
            errorMessage="enter valid email address"
             @validity="(event) => {validationCheck=event}"
            />
          </div> 
          <Button name="reset">Reset Password</Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Button from "~/components/Button.vue";
import { useCustomFetch } from "~/composable/useFetchOptions";
import AlertPopup from "~/components/AlertPopup.vue";
const email = ref("");
const toastMessage :Ref<string> = ref('');
const isToastVisible = ref(false);
const validationCheck=ref(true)
const closeToast=()=>{
  isToastVisible.value=false
}

const handleResetPassword = async () => {
  if(!validationCheck.value)
    {
      console.log(validationCheck.value)
  return;
      }
  try {
    const response :any= await useCustomFetch("/forgetpassword", {
      method: "POST",

      body: JSON.stringify({
        email: email.value,
      }),
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
