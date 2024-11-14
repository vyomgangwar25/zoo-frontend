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
    <div class="pagination-controls">
      <button class="btn" @click="DecreaseButton">Previous</button>
      <button
        v-for="number in totalPages"
        :key="number"
        @click="setSelectedNumber(number)"
        class="btn mx-2"
      >
        {{ number }}
      </button>
      <button class="btn" @click="IncreaseButton">next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";


import { useCustomFetch } from "~/composable/useFetchOptions";
import Shimmer from "vue3-loading-shimmer";
import "~/assets/css/user.css";

const router = useRouter();
const pageno = ref(0);
const totalPages = ref(0);
const items = ref([]);
const pagesize = 3;

const setSelectedNumber = (number) => {
  pageno.value = number - 1;
  console.log(`Selected Page: ${pageno.value}`);
  fetchUser();
};
const IncreaseButton = () => {
  if (pageno.value < totalPages.value - 1) {
    pageno.value = pageno.value + 1;
  }
  fetchUser();
};
const DecreaseButton = () => {
  if (pageno.value > 0) {
    pageno.value = pageno.value - 1;
    fetchUser();
  }
};

const fetchUser = async () => {
  try {
    const response = await useCustomFetch(
      `/extractuser?page=${pageno.value}&pagesize=${pagesize}`,
      {
        method: "GET",
      } 
    );
    console.log(response);
    items.value = response.users;
    //console.log(response.totalUsers);

    totalPages.value = Math.ceil(response.totalUsers / pagesize);
    //console.log(response.totalUsers.value);
  } catch (err) {
    console.log("Error fetching users:", err);
  }
};

//delete user api

const deleteUser = async (userId) => {
 

  try {
    const response = await useCustomFetch(`http://localhost:8080/deleteUser/${userId}`, {
      method: "DELETE",
     
    });
  
      console.log(response)
      
      items.value = items.value.filter((item) => item.id !== userId);
      if (items.value.length === 0 && pageno.value > 0) {
        pageno.value--;
        fetchUser();
      

    
    }
  } catch (err) {
    console.error("Error deleting user:", err);
  }
};

onMounted(() => {
  fetchUser();
});
</script>
<style scoped></style>
