<template>
  <div>
    <Navbar />
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
            <input
              v-model="email"
              type="email"
              class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <Button name="reset">Reset Password</Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Button from "~/components/Button.vue";
import Navbar from "~/components/Navbar.vue";
import { useCustomFetch } from "~/composable/useFetchOptions";
const email = ref("");

const handleResetPassword = async () => {
  try {
    const response = await useCustomFetch("/forget_password", {
      method: "POST",

      body: JSON.stringify({
        email: email.value,
      }),
    });

    console.log(response);
    alert("reset password link sent to your email address");
  } catch (err) {
    console.error(err);
  }
};
</script>
