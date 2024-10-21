<script lang="ts" setup>
import { ref } from "vue";
import { useRoute, type Router } from "vue-router";
import { useCustomFetch } from "~/composable/useFetchOptions";
const router : Router = useRouter();
 
const route = useRoute();
const token = route.query.token;

const newPassword = ref("");
 
const setPassword = async () => {
  try {
    const response = await useCustomFetch("/setnewpassword", {
      method: "POST",

      body: JSON.stringify({
        newPassword: newPassword.value,
      }),
    });
    alert(response);
    router.push("/login");
  } catch (err) {
    console.log("error in seting new password -->", err);
  }
};
</script>

<template>
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
