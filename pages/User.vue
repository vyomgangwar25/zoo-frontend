<template>
  <div class="container">
    <div class="header mb-4">
      List of users that are stored in the database:
    </div>

    <div v-if="items.length === 0">
      <Shimmer class="whatever" />
      <Shimmer class="whatever" />
      <Shimmer class="whatever" />
    </div>

    <div v-else>
      <ul class="user-list">
        <li v-for="item in items" :key="item.id" class="user-item mb-4">
          <div class="flex justify-between items-center">
            <div>
              <div class="user-info">
                <span class="label font-bold">Name:</span>
                <span class="value ml-1">{{ item.userName }}</span>
              </div>
              <div class="user-info">
                <span class="label font-bold">Email:</span>
                <span class="value ml-1">{{ item.email }}</span>
              </div>
            </div>

            <Icon
              name="heroicons-solid:trash"
              class="text-4xl cursor-pointer hover:text-red-700"
              @click="deleteUser(item.id)"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
//  definePageMeta({
//   layout: 'custom'
// })
import { ref, onMounted } from "vue";

import { useCustomFetch } from "~/composable/useFetchOptions";
import Shimmer from "vue3-loading-shimmer";
import "~/assets/css/user.css";
const router = useRouter();

const items = ref([]);

const fetchUser = async () => {
  const token = localStorage.getItem("SavedToken");

  if (!token) {
    alert("No token found");
    router.push("/login");
    return;
  }

  try {
    const response = await useCustomFetch("/extractuser", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("SavedToken")}`,
      },
    });

    items.value = response;
  } catch (err) {
    console.log("Error fetching users:", err);
  }
};

//delete user api

const deleteUser = async (userId) => {
  const token = localStorage.getItem("SavedToken");

  try {
    const response = await fetch(`http://localhost:8080/deleteUser/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      alert("User is not allowed to delete the data from database");
      //router.push("/login")
    } else {
      items.value = items.value.filter((item) => item.id !== userId);
      alert("User delete successfully!!");
    }
  } catch (err) {
    console.error("Error deleting user:", err);
  }
};

onMounted(() => {
  fetchUser();
});
</script>
