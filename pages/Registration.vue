<template>
  <div class="flex items-center justify-center min-h-screen bg-blue-100 p-4">
    <AlertPopup :label="toastMessage" :isVisible="isToastVisible" @close="closeToast" />
    <div class="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
      <h1 class="text-3xl font-bold text-center text-gray-700 mb-8">
        Registration Form
      </h1>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <CustomInput
            type="text"
            placeholder="Enter your name"
            v-model="name"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <CustomInput
            v-model="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <CustomInput
            v-model="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <div>
          <label for="role" class="block text-sm font-medium text-gray-700"
            >Role</label
          >
          <select
            v-model="role"
            id="role"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <Button name="Registration" />

        <div>
          Already have an account?
          <nuxt-link
            to="/Login"
            class="text-blue-500 underline hover:text-blue-700 capatalize"
            >Sign in</nuxt-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});
import { ref } from "vue";

import Button from "~/components/Button.vue";
import { useCustomFetch } from "~/composable/useFetchOptions";
import AlertPopup from "~/components/AlertPopup.vue";
const name : Ref<string> = ref("");
const email :Ref<string>= ref("");
const password = ref("");
const role :Ref<string>= ref("user");
const toastMessage :Ref<string>= ref('');
const isToastVisible = ref(false);

const closeToast=()=>{
  isToastVisible.value=false
}

const handleSubmit = async () => {
  try {
    const response = await useCustomFetch("/registration", {
      method: "POST",

      body: JSON.stringify({
        username: name.value,
        email: email.value,
        password: password.value,
        role: role.value,
      }),
    });
   toastMessage.value = response as string;
    isToastVisible.value = true;
   

  
  } catch (err: any) {
    toastMessage.value = err.response._data;
    isToastVisible.value = true;
  }
};
</script>
