<template>
  <div class="flex items-center justify-center min-h-screen bg-blue-100">
    <AlertPopup :label="toastMessage" :isVisible="isToastVisible" @close="closeToast" />
    <div class="max-w-sm w-full p-8 bg-white shadow-lg rounded-lg">
     
      <h1 class="text-3xl font-bold text-center text-gray-700 mb-8">
        Login Form
      </h1>
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div class="flex flex-col">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <CustomInput
            type="email"
            v-model="email"
            placeholder="Enter your email"
            regex="^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$"
            errorMessage="enter valid email address"
             
          />
        </div>
        <div class="flex flex-col">
          <label for="password" class="text-gray-700 font-medium mb-2"
            >Password</label
          >
          <CustomInput
            type="password"
            v-model="password"
            placeholder="Enter your password"
            regex="[0-9a-zA-Z]{6,}"
            errorMessage="Password must be at least 6 characters"
          />
        </div>
        <Button name="Submit" />
      </form>
   

      <div class="flex items-center justify-center">
        <NuxtLink
          to="/ForgetPassword"
          class="text-blue-500 underline hover:text-blue-700 capitalize py-4"
          >Forget Password?</NuxtLink
        >
      </div>
      <div class="flex items-center justify-center mb-2">
        not Registered?
        <NuxtLink
          to="/registration"
          class="text-blue-500 underline hover:text-blue-700 capitalize"
        >
          Create an account
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
 
 definePageMeta({
  middleware: "auth",
});
import { ref } from "vue";
import { useRoleStore } from "~/store/useRoleStore";
import { useRouter, type Router } from "vue-router";
import { useCustomFetch } from "~/composable/useFetchOptions";
import AlertPopup from "~/components/AlertPopup.vue";
import Button from "~/components/Button.vue";
import CustomInput from "~/components/CustomInput.vue";
 
const router: Router = useRouter();
const email: Ref<string> = ref("");
const password = ref("");
const toastMessage :Ref<string> = ref('');
const isToastVisible = ref(false);

const roleStore = useRoleStore();

const closeToast=()=>{
  isToastVisible.value=false
}

const handleSubmit = async () => {
  try {
    const response: any = await useCustomFetch("/login", {
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    console.log(response);
    const token = response.token;
    roleStore.setState(response.role, response.email, response.name,response.id);

    const test = useCookie("SavedToken", {
      maxAge : 7200
    });
    test.value = token;
   

    router.push("/Dashboard");
  } catch (err: any) {
    toastMessage.value = err.response._data;
    isToastVisible.value = true;
  
  }
};
</script>

<style scoped></style>
