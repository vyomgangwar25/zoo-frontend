<script lang="ts" setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
const validationSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});
import { useRoleStore } from "~/store/useRoleStore";
import { useRouter, type Router } from "vue-router";
import { useCustomFetch } from "~/composable/useFetchOptions";
import AlertPopup from "~/components/AlertPopup.vue";
const toastMessage: Ref<string> = ref("");
const isToastVisible = ref(false);
const items: Ref<
  { token: string; role: string; email: string; name: string; id: number }[]
> = ref([]);
const router: Router = useRouter();
const email  = ref("");
const password = ref("");
const roleStore = useRoleStore();

const closeToast = () => {
  isToastVisible.value = false;
};
const handleSubmit = async () => {
  try {
    const response: any = await useCustomFetch("/login", {
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    items.value = response;
    console.log(response);
    const token = items.value[0].token;
    roleStore.setState(
      items.value[0].role,
      items.value[0].email,
      items.value[0].name,
      items.value[0].id
    );

    const test = useCookie("SavedToken", {
      maxAge: 7200,
    });
    test.value = token;
    router.push("/Dashboard");
  } catch (err: any) {
    toastMessage.value = err.response._data;
    isToastVisible.value = true;
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-blue-100">
 

    <div class="max-w-sm w-full p-8 bg-white shadow-lg rounded-lg">
      <h1 class="text-3xl font-bold text-center text-gray-700 mb-8">
        Login Form
      </h1>

      <Form :validation-schema="validationSchema" @submit="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <Field
            name="email"
            type="email"
            class="px-4 py-2 text-base border-b-2 border-slate-500 focus:outline-none bg-white text-slate-800 w-full"
            v-model="email"
          />
          <ErrorMessage name="email" class="text-red-600 text-sm mt-1" />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <Field
            name="password"
            type="password"
            class="px-4 py-2 text-base border-b-2 border-slate-500 focus:outline-none bg-white text-slate-800 w-full"
            v-model="password"
          />
          <ErrorMessage name="password" class="text-red-600 text-sm mt-1" />
        </div>

        <button
          type="submit"
          class="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </Form>

      <div class="flex items-center justify-center mt-4">
        <NuxtLink
          to="/ForgetPassword"
          class="text-blue-500 underline hover:text-blue-700 capitalize"
          >Forget Password?</NuxtLink
        >
      </div>

      <div class="flex items-center justify-center mt-2">
        Not Registered?
        <NuxtLink
          to="/registration"
          class="text-blue-500 underline hover:text-blue-700 capitalize ml-1"
          >Create an account</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
