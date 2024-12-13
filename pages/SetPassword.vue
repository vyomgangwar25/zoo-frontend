<script lang="ts" setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { useRoute, type Router } from "vue-router";
import { useCustomFetch } from "~/composable/useFetchOptions";

const router: Router = useRouter();
const route = useRoute();

const oldpassword = ref("");
const newPassword = ref("");
const token = useCookie("SavedToken");
const toastMessage: Ref<string> = ref("");
const isToastVisible = ref(false);

const closeToast = () => {
  isToastVisible.value = false;
};

function setNewPassword() {
  useCustomFetch<string>("/user/setnewpassword", {
    method: "POST",
    body: JSON.stringify({
      oldpassword: oldpassword.value,
      newpassword: newPassword.value,
    }),
  })
    .then(function (response) {
      router.push("/login");
    })
    .catch(function (err) {
      toastMessage.value = err.response._data;
      isToastVisible.value = true;
      // oldpassword.value = "", newPassword.value = "";
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
          Change Password
        </h1>
        <Form @submit="setNewPassword">
          <div class="mb-4" v-if="token">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Old Password</label
            >
            <Field
              name="oldpassword"
              type="password"
              class="px-4 py-2 text-base border-b-2 border-slate-500 focus:outline-none bg-white text-slate-800 w-full"
              v-model="oldpassword"
              rules="required|min:6"
            />
            <ErrorMessage
              name="oldpassword"
              class="text-red-600 text-sm mt-1"
            />
          </div>
          <div>
            <label
              for="New Password"
              class="block text-sm font-medium text-gray-700"
              >New Password</label
            >
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
