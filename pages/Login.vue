<template>
  <div class="flex items-center justify-center min-h-screen bg-blue-100">
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
            :isvalid="isEmailValid"
            placeholder="Enter your email"
            :regex="/^[^\s@]+@[^\s@]+\.[^\s@]+$/"
            errorMessage="Please enter a valid email address."
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
            :regex="/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/"
            errorMessage="Please enter a valid password."
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
      <div class="flex items-center justify-center mb-2">
        not Registered?
        <nuxt-link
          to="Registration"
          class="text-blue-500 underline hover:text-blue-700 capitalize"
          >create an account</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
import { ref } from "vue";
import { useRoleStore } from "~/store/useRoleStore";
import { useRouter } from "vue-router";
import { useCustomFetch } from "~/composable/useFetchOptions";
import Button from "~/components/Button.vue";
import CustomInput from "~/components/CustomInput.vue";
const router = useRouter();
const email = ref("");
const password = ref("");
const isEmailValid = ref(false);
const roleStore = useRoleStore();

const handleSubmit = async () => {
  try {
    const response = await useCustomFetch("/login", {
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    console.log(response);
    const token = response.token;
    roleStore.setState(response.role, response.email, response.name);

    const test = useCookie("SavedToken");
    test.value = token;
    localStorage.setItem("SavedToken", token);

    router.push("/Dashboard");
  } catch (err) {
    alert(err.message || "An error occurred during login.");
  }
};
</script>

<style scoped></style>
