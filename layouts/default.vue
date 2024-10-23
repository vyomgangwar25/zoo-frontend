<script setup>
import { useRoleStore } from "~/store/useRoleStore";
import { useCustomFetch } from "~/composable/useFetchOptions";
const roleStore = useRoleStore(); //access the store

const token = ref("");
const showDropdown = ref(false);
const router = useRouter();
 
const toggleDropdown = () => {  
  roleStore.toggleDropDown(); 
};
 

if (import.meta.client) {
  token.value = localStorage.getItem("SavedToken");
}

const handleLogout = () => {
  const cookie = useCookie("SavedToken", {
    maxAge : 0
  });
  cookie.value = "";
  localStorage.removeItem("SavedToken");
  roleStore.setState("", "", "");
  router.push("/login");
  roleStore.closeDropDown()
};
const dashboardApi = async () => {
 
  try {
    const response = await useCustomFetch("/validate_token", {
      method: "GET",
    });

    roleStore.setState(response.role, response.userEmail, response.name);
  } catch (err) {
    alert(err);
    router.push("/login");
  }
};


onBeforeMount(() => {
  if(token.value)
{
  dashboardApi();
}
});
</script>

<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <h1 class="text-white text-4xl font-bold">
          <nuxt-link to="/">Zoo</nuxt-link>
        </h1>
        <ul class="flex space-x-6">
          <li>
            <nuxt-link
              class="border border-white text-white bg-transparent hover:bg-white hover:text-black font-bold py-2 px-4 rounded-md"
              to="/"
              >Home</nuxt-link
            >
          </li>
          <template v-if="roleStore.role === '' && !token">
            <li>
              <nuxt-link
                class="border border-white text-white bg-transparent hover:bg-white hover:text-black font-bold py-2 px-4 rounded-md"
                to="/Login"
                >Login</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                class="border border-white text-white bg-transparent hover:bg-white hover:text-black font-bold py-2 px-4 rounded-md"
                to="/Registration"
                >SignUp</nuxt-link
              >
            </li>
          </template>
          <template v-else>
            <li>
              <nuxt-link
                class="border border-white text-white bg-transparent hover:bg-white hover:text-black font-bold py-2 px-4 rounded"
                to="/Dashboard"
                >Dashboard</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                class="border border-white text-white bg-transparent hover:bg-white hover:text-black font-bold py-2 px-4 rounded"
                to="/zoo/ExtractZooData"
              >
                Zoo Data
              </nuxt-link>
            </li>

            <div class="relative">
              <Icon
                name="heroicons:user-circle"
                class="text-white text-3xl ml-5 cursor-pointer"
                @click="toggleDropdown"
              />
              <div
                v-if="roleStore.showDropDown "
                
                class="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50"
              >
                <ul class="py-1">
                  <li
                    class="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    @click="navigateTo('/setpass')"
                  >
                    Update Password
                  </li>
                  <li
                    @click="handleLogout"
                    class="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </template>
        </ul>
      </div>
    </div>
  </nav>
  <slot />
</template>
