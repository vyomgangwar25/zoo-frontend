<script lang="ts" setup>
import { useRoleStore } from "~/store/useRoleStore";
import { useCustomFetch } from "~/composable/useFetchOptions";
import type { User } from "~/types/UserData";

const roleStore = useRoleStore(); //access the store

const token = ref("");
const showDropdown = ref(false);
const router = useRouter();
const items: Ref<User> = ref({} as User);

const toggleDropdown = () => {
  roleStore.toggleDropDown();
};

if (import.meta.client) {
  token.value = useCookie("SavedToken").value as string;
}

const handleLogout = () => {
  const cookie = useCookie("SavedToken", {
    maxAge: 0,
  });
  cookie.value = "";
  roleStore.setState("", "", "", 0);
  router.push("/login");
};
const handleSetPass = () => {
  router.push("/setpass");
};

const handleProfile = () => {
  navigateTo(`/Profile?id=${roleStore.id}`);
};
const dashboardApi = async () => {
  try {
    const response: any = await useCustomFetch("/user/userinfo", {
      method: "GET",
    });
    console.log(response)
    items.value = response;
    roleStore.setState(
      items.value.role,
      items.value.email,
      items.value.username,
      items.value.id
    );
  } catch (err) {
    alert(err);
    router.push("/login");
  }
};
onMounted(() => {
  if (token.value) {
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
                v-if="roleStore.showDropDown"
                class="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50"
              >
                <ul class="py-1">
                  <li
                    class="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    @click="handleSetPass"
                  >
                    Update Password
                  </li>
                  <li
                    class="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    @click="handleProfile"
                  >
                    profile
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
