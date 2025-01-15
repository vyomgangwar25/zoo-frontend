<script lang="ts" setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import Button from "~/components/Button.vue";
import { useCustomFetch } from "~/composable/useFetchOptions";
import type { Roles } from "~/types/HandleRoles";

const name = ref("");
const userEmail = ref("");
const password = ref("");
const role = ref("");
const toastMessage = ref("");
const isToastVisible = ref(false);

const roles: Ref<Roles[]> = ref([]);
const closeToast = () => {
  isToastVisible.value = false;
};

function handleRegistration() {
  useCustomFetch<string>("/user/registration", {
    method: "POST",
    body: JSON.stringify({
      username: name.value,
      email: userEmail.value,
      password: password.value,
      roleId: role.value,
    }),
  })
    .then(function (response: any) {
      // console.log(response)
      toastMessage.value = response;
      isToastVisible.value = true;
    })
    .catch(function (err: any) {
      toastMessage.value = err.response._data;
      isToastVisible.value = true;
    });
}

function handleRoles() {
  $fetch<Roles[]>(`/api/fetch-role`, {
    method: "GET",
  })
    .then(function (response2) {
      roles.value = response2;
    })
    .catch(function (err) {
      toastMessage.value = err.response2._data;
      isToastVisible.value = true;
    });
}
onMounted(() => {
  handleRoles();
});
</script>
<template>
  <div class="flex items-center justify-center min-h-screen bg-blue-100 p-4">
    <AlertPopup
      :label="toastMessage"
      :isVisible="isToastVisible"
      @close="closeToast"
    />
    <div class="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
      <h1 class="text-3xl font-bold text-center text-gray-700 mb-8">
        Registration Form
      </h1>
      <Form @submit="handleRegistration" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <Field
            name="name"
            type="text"
            class="px-4 py-2 text-base border-b-2 border-slate-500 focus:outline-none bg-white text-slate-800 w-full"
            v-model="name"
            rules="required|alpha_spaces"
          />
          <ErrorMessage name="name" class="text-red-600 text-sm mt-1" />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <Field
            name="email"
            type="email"
            class="px-4 py-2 text-base border-b-2 border-slate-500 focus:outline-none bg-white text-slate-800 w-full"
            v-model="userEmail"
            rules="required|email"
          />
          <ErrorMessage name="email" class="text-red-600 text-sm mt-1" />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <Field
            name="password"
            type="password"
            class="px-4 py-2 text-base border-b-2 border-slate-500 focus:outline-none bg-white text-slate-800 w-full"
            v-model="password"
            rules="required|min:6"
          />
          <ErrorMessage name="password" class="text-red-600 text-sm mt-1" />
        </div>

        <div>
          <label for="role" class="block text-sm font-medium text-gray-700"
            >Role</label
          >
          <Field
            name="role"
            as="select"
            id="role"
            v-model="role"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rules="required"
          >
            <option value="" disabled>Select Role</option>
            <option v-for="(item, index) in roles" :value="item?.id">
              {{ item?.role }}
            </option>
          </Field>
          <ErrorMessage name="role" class="text-red-600 text-sm mt-1" />
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
      </Form>
    </div>
  </div>
</template>
