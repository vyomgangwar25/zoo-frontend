<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const handleLogout = () => {
  const cookie = useCookie("SavedToken");
  cookie.value = "";
  localStorage.removeItem("SavedToken");
  router.push("/login");
};

const navigateTo = (path: string) => {
  showDropdown.value = false;
  router.push(path);
};
</script>

<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <h1 class="text-white text-4xl font-bold">
          <nuxt-link to="/">Zoo</nuxt-link>
        </h1>
        <div class="flex items-center space-x-4">
          <ul class="flex space-x-6">
            <li>
              <nuxt-link
                class="border border-white text-white bg-transparent hover:bg-white hover:text-black font-bold py-2 px-4 rounded-md"
                to="/"
                >Home</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                class="border border-white text-white bg-transparent hover:bg-white hover:text-black font-bold py-2 px-4 rounded-md"
                to="/Dashboard"
                >Dashboard</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                class="border border-white text-white bg-transparent hover:bg-white hover:text-black font-bold py-2 px-4 rounded-md"
                to="/ExtractZooData"
                >Zoo data</nuxt-link
              >
            </li>
          </ul>
          <div class="relative">
            <Icon
              name="heroicons:user-circle"
              class="text-white text-3xl ml-5 cursor-pointer"
              @click="toggleDropdown"
            />
            <div
              v-if="showDropdown"
              class="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg"
            >
              <ul class="py-1">
                <li
                  @click="handleLogout"
                  class="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  Logout
                </li>
                <li
                  class="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  @click="navigateTo('/setpass')"
                >
                  updatepassword
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <slot />
</template>
