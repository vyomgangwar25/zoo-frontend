<template>
  <div class="flex items-center justify-center min-h-screen bg-blue-100 p-4">
    <div class="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
      <h1 class="text-3xl font-bold text-center text-gray-700 mb-8">
        Registration Form
      </h1>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            v-model="name"
            type="text"
            id="name"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        <FormValidator
          :name="name"
          :email="email"
          :password="password"
          :role="role"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "custom",
});
import { ref } from "vue";
import FormValidator from "~/components/RegistrationFormValidator.vue";
import Button from "~/components/Button.vue";
import { useCustomFetch } from "~/composable/useFetchOptions";

const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("user");

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
    console.log(response);
    alert("user registered successfully");
  } catch (err) {
    console.error("Error:", err);
  }
};
</script>
