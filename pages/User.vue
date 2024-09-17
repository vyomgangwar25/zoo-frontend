<template>
  <div class="container">
    <div class="header">List of users that are stored in the database are:</div>
    <div v-if="loading">
      
      <Shimmer class="whatever" />
      <Shimmer class="whatever" />
      <Shimmer class="whatever" />
    </div>
    <div v-else>
      <ul class="user-list">
        <li v-for="item in items" :key="item.id" class="user-item">
          <div class="user-info">
            <span class="label">Name is:</span>
            <span class="value">{{ item.userName }}</span>
          </div>
          <div class="user-info">
            <span class="label">Email is:</span>
            <span class="value">{{ item.email }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Shimmer from "vue3-loading-shimmer";
const router = useRouter();

const items = ref([]);
const loading = ref(true); 

const fetchUser = async () => {
  const token = localStorage.getItem("SavedToken");
  console.log(token);

  if (!token) {
    alert("no token found");
    router.push("/login");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/ExtractUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log("Failed to fetch the data of users from the database");
      return;
    }

    const data = await response.json();
    console.log(data);
    items.value = data;
  } catch (err) {
    console.log("Error in fetching Users:", err);
  } finally {
    loading.value = false;  
  }
};

onMounted(() => {
  fetchUser();
});
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}

.header {
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-weight: bold;
}

.user-list {
  list-style-type: none;
  padding: 0;
}

.user-item {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-info {
  margin-bottom: 8px;
}

.label {
  font-weight: bold;
  margin-right: 5px;
}

.value {
  color: #333;
}

.icon {
  margin-left: 5px;
  vertical-align: middle;
}

.whatever {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;  
  height: 200px;
  width: 200px;
  border-radius: 0.5rem;
  margin: 10px; 
}
</style>
