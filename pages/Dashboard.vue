<template>
  <div class="flex h-screen bg-gray-300">
    <main class="flex-1 p-6">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-4">
          Welcome to the Dashboard{{ " " + roleStore.name }}
        </h1>
        <h1 class="text-2xl font-bold mb-4">
          Email id is{{ " " + roleStore.email }}
        </h1>
      </div>
      <div class="flex justify-center"></div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoleStore } from "~/store/useRoleStore";

const roleStore = useRoleStore();
const router = useRouter();
const name = ref("");
const email = ref("");

const logout = () => {
  localStorage.removeItem("SavedToken");
  const cookie = useCookie("SavedToken");
  cookie.value = "";
  router.push("/login");
  alert("User Logout successfully!!");
};
</script>
