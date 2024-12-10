<template>
  <!-- <nav class="bg-gray-600">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <a href="/" class="text-white text-4xl font-bold mr-3">{{ title }}</a>
        </div>
        <div class="hidden md:block relative">
          <div class="ml-10 flex items-baseline space-x-6">
            <NuxtLink
              v-for="(link, index) in links"
              :key="index"
              :to="link.href"
              class="border border-white text-white bg-transparent hover:bg-white hover:text-black font-bold py-2 px-4 rounded-md"
            >
              {{ link.text }}
            </NuxtLink>

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
                    @click="navigateTo('/login')"
                    class="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    Login
                  </li>
                  <li
                    @click="handleLogout"
                    class="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    Logout
                  </li>
                  <li
                    @click="navigateTo('/ForgetPassword')"
                    class="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    Forgot Password
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav> -->
</template>

<!-- <script setup>
import { ref } from "vue";
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
const navigateTo = (path) => {
  showDropdown.value = false;

  router.push(path);
};

defineProps({
  title: {
    type: String,
    default: "ZOO",
  },
  links: {
    type: Array,
    default: () => [
      { text: "Home", href: "/" },
      { text: "Login", href: "/login" },
      { text: "Signup", href: "/registration" },
    ],
  },
});
</script> -->

<style scoped>
.dropdown {
  display: none;
}
</style>
