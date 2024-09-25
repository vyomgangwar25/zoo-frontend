<template>
  <div class="flex items-center justify-center min-h-screen bg-blue-100">
    <div class="max-w-sm w-full p-8 bg-white shadow-lg rounded-lg">
      <h1 class="text-3xl font-bold text-center text-gray-700 mb-8">
        Login Form
      </h1>
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div class="flex flex-col">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="flex flex-col">
          <label for="password" class="text-gray-700 font-medium mb-2"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <Button name="Submit" />
      </form>

      <div class="flex items-center justify-center">
        <nuxt-link
          to="ForgetPassword"
          class="text-blue-500 underline hover:text-blue-700 capitalize py-4"
          >Forget Password?</nuxt-link
        >
      </div>
      <div class="flex items-center justify-center mb-2cle">
        not Registered?
        <nuxt-link
          to="Registration"
          class="text-blue-500 underline hover:text-blue-700 capitalize"
          >create an account</nuxt-link
        >
      </div>

      <LoginFormValidator :email="email" :password="password" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "custom",
});
import { useCustomFetch } from "~/composable/useFetchOptions";
const router = useRouter();
const email = ref("");
const password = ref("");
import Button from "~/components/Button.vue";

const handleSubmit = async () => {
  try {
    const response = await useCustomFetch("/login", {
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    // const data = await response;
    const token = response;
    localStorage.setItem("SavedToken", token);

    router.push("/Dashboard");
  } catch (err) {
    console.log(err);
    alert(err);
  }
};
</script>
