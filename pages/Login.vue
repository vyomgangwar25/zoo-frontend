<script lang="ts" setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { useRoleStore } from "~/store/useRoleStore";
import { useRouter, type Router } from "vue-router";
import type { User } from "~/types/UserData";

const toastMessage = ref("");
const isToastVisible = ref(false);

const items: Ref<User | undefined> = ref();

const router = useRouter();
const userEmail = ref("");
const userPassword = ref("");
const roleStore = useRoleStore();

const closeToast = () => {
  isToastVisible.value = false;
};

function handleLogin() {
  $fetch<User>("/api/login", {
    method: "POST",
    body: JSON.stringify({
      email: userEmail.value,
      password: userPassword.value,
    }),
  })
    .then(function (response) {
      console.log(response);
      items.value = response;

      //const token = items.value.token;
      roleStore.setState(
        items.value.role,
        items.value.email,
        items.value.username,
        items.value.id
      );
      const flag = useCookie("flag", {
        maxAge: 24 * 60 * 60,
      });

      flag.value = "1";
      router.push("/Dashboard");
    })
    .catch(function (err) {
      console.log(err);
      toastMessage.value = err.response._data.data;
      isToastVisible.value = true;
    });
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-blue-100">
    <AlertPopup :label="toastMessage" :isVisible="isToastVisible" @close="closeToast" />

    <div class="max-w-sm p-8 bg-white shadow-lg rounded-lg">
      <h1 class="text-3xl font-bold text-center text-gray-700 mb-8">
        Login Form
      </h1>

      <Form @submit="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <Field name="email" type="email"
            class="px-4 py-2 text-base border-b-2 border-slate-500 focus:outline-none bg-white text-slate-800 w-full"
            v-model="userEmail" rules="required|email" />
          <ErrorMessage name="email" class="text-red-600 text-sm mt-1" />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <Field name="password" type="password"
            class="px-4 py-2 text-base border-b-2 border-slate-500 focus:outline-none bg-white text-slate-800 w-full"
            v-model="userPassword" rules="required|min:6" />
          <ErrorMessage name="password" class="text-red-600 text-sm mt-1" />
        </div>
        <Button name="Submit" />
      </Form>

      <!-- Sign in with google -->

      <div class="flex items-center justify-center mt-4">
        <NuxtLink to=" http://localhost:8080/oauth2/authorization/google">Sign in with Google</NuxtLink>
      </div>


      <div class="flex items-center justify-center mt-4">
        <NuxtLink to="/ForgetPassword" class="text-blue-500 underline hover:text-blue-700 capitalize">Forget Password?
        </NuxtLink>
      </div>

      <div class="flex items-center justify-center mt-2">
        Not Registered?
        <NuxtLink to="/registration" class="text-blue-500 underline hover:text-blue-700 capitalize ml-1">Create an
          account</NuxtLink>
      </div>
    </div>
  </div>
</template>