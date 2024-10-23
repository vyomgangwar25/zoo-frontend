<script lang="ts" setup>
import { ref } from "vue";
import { useRoute, type Router } from "vue-router";
import { useCustomFetch } from "~/composable/useFetchOptions";
import AlertPopup from "~/components/AlertPopup.vue";
const router : Router = useRouter();
 
const route = useRoute();
const token = route.query.token;

const newPassword = ref("");
const toastMessage :Ref<string> = ref('');
const isToastVisible = ref(false);
const closeToast=()=>{
  isToastVisible.value=false
}
 
const setPassword = async () => {
  if(!newPassword.value)
{
  toastMessage.value="please enter password";
  isToastVisible.value = true;
  return;
}
  try {
    const response :any= await useCustomFetch("/setnewpassword", {
      method: "POST",

      body: JSON.stringify({
        newPassword: newPassword.value,
      }),
    });
 
    router.push("/login");
  } catch (err:any) {
    toastMessage.value = err.response._data;
    isToastVisible.value = true;
  }
};
</script>

<template>
     <AlertPopup :label="toastMessage" :isVisible="isToastVisible" @close="closeToast" />
  <div>
    <div class="flex items-center justify-center min-h-screen bg-blue-100">
      <div class="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <h1 class="text-3xl font-bold text-center text-gray-700 mb-8">
          Enter new Password
        </h1>
        <form @submit.prevent="setPassword">
          <div>
            <label for=""> NewPassword </label>
            <input
              class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              v-model="newPassword"
              placeholder="Enter new Password"
            />
          </div>
          <div class="py-2">
            <Button name="new password" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
