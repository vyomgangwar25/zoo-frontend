<script lang="ts" setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { useRoute, type Router } from "vue-router";
import { useCustomFetch } from "~/composable/useFetchOptions";

const router: Router = useRouter();
const route = useRoute();
const token = route.query.token;
const newPassword = ref("");
const toastMessage: Ref<string> = ref("");
const isToastVisible = ref(false);

const closeToast = () => {
  isToastVisible.value = false;
};

function setnewpassword() {
  useCustomFetch<string>("/user/setnewpassword", {
    method: "POST",
    body: newPassword.value,
  })
    .then(function (response) {
      router.push("/login");
    })
    .catch(function (err) {
      toastMessage.value = err.response._data;
      isToastVisible.value = true;
    });
}
</script>

<template>
  <AlertPopup
    :label="toastMessage"
    :isVisible="isToastVisible"
    @close="closeToast"
  />
  <div>
    <div class="flex items-center justify-center min-h-screen bg-blue-100">
      <div class="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <h1 class="text-3xl font-bold text-center text-gray-700 mb-8">
          Enter new Password
        </h1>
        <Form @submit="setnewpassword">
          <div>
            <Field
              name="newPassword"
              type="password"
              class="px-4 py-2 text-base border-b-2 border-slate-500 focus:outline-none bg-white text-slate-800 w-full"
              v-model="newPassword"
              rules="required|min:6"
            />
            <ErrorMessage
              name="newPassword"
              class="text-red-600 text-sm mt-1"
            />
          </div>

          <div class="py-2">
            <Button name="Submit" />
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
