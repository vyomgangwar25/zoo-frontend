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
          <CustomInput
            type="text"
            placeholder="Enter your name"
            v-model="name"
            :regex="/^.+$/"
            errorMessage="Please enter name"
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
            :regex="/^[^\s@]+@[^\s@]+\.[^\s@]+$/"
            errorMessage="Please enter a valid email address."
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
            :regex="/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/"
            errorMessage="Please enter a valid password."
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

<script setup>
import { ref } from "vue";

import Button from "~/components/Button.vue";
import { useCustomFetch } from "~/composable/useFetchOptions";

const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("user");
const errors = ref({
  name: "",
  email: "",
  password: "",
});
const nameError = computed(() => {
  if (!name.value) {
    return "Please enter your name";
  }
});
const emailError = computed(() => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.value) ? "" : "Please enter a valid email address.";
});

const passwordError = computed(() => {
  return password.value.length >= 6
    ? ""
    : "Password must be at least 6 characters long.";
});
const nameValidate = () => {
  if (!name.value) {
    errors.value.name = "name is required";
  }
};
const emailValidate = () => {
  errors.value.email = "";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value) {
    errors.value.email = "Email is required.";
  } else if (!emailPattern.test(email.value)) {
    errors.value.email = "Invalid email format.";
  }
};
const passwordValidate = () => {
  errors.value.password = "";
  if (errors.value.password) {
    errors.value.password = "password is required";
  } else if (password.value.length < 6) {
    errors.value.password = "Password must be at least 6 characters";
  }
};

const handleSubmit = async () => {
  if (!name.value) {
    alert("enter name");
    return;
  }
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

    alert(response);
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};
</script>
