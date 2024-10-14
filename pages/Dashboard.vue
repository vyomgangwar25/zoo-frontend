<template>
  <div class="flex h-screen bg-gray-300">
    <!-- <aside class="w-64 bg-gray-800 text-white flex flex-col">
      <div class="p-4 text-center font-bold text-xl bg-gray-900">Dashboard</div>
      <nav class="flex-1 mt-4">
        <ul class="space-y-2">
          <li>
            <nuxt-link
              to="/"
              class="block px-4 py-2 text-gray-300 hover:bg-gray-700"
              >Home</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              to="/User"
              class="block px-4 py-2 text-gray-300 hover:bg-gray-700"
              >Users</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              to="/ExtractZooData"
              class="block px-4 py-2 text-gray-300 hover:bg-gray-700"
              >Zoo</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              to="#"
              class="block px-4 py-2 text-gray-300 hover:bg-gray-700"
            >
              Animals
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <div class="p-4 border-t border-gray-700 text-center">
        <button @click="logout" class="text-gray-300 hover:bg-gray-700">
          Logout
        </button>
      </div>
    </aside> -->

    <main class="flex-1 p-6">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-4">
          Welcome to the Dashboard{{ " " + name }}
        </h1>
        <h1 class="text-2xl font-bold mb-4">Email id is{{ " " + email }}</h1>
      </div>
      <div class="flex justify-center"></div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { useCustomFetch } from "~/composable/useFetchOptions";
const router = useRouter();
const name = ref("");
const email = ref("");
const removeToken = async () => {
  console.log(localStorage.getItem("SavedToken"));
  try {
    const response = await useCustomFetch("/validate_token", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("SavedToken")}`,
      },
    });
    console.log(response);
    name.value = response.name;
    email.value = response.userEmail;
  } catch (err) {
    alert(err);
    router.push("/login");
  }
};

onMounted(() => {
  removeToken();
});

const logout = () => {
  localStorage.removeItem("SavedToken");
  const cookie = useCookie("SavedToken");
  cookie.value = "";
  router.push("/login");
  alert("User Logout successfully!!");
};
</script>
