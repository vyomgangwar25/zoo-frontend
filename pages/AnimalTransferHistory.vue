<template>
    <div class="p-4 flex flex-col items-center w-full"> 
      <h1 class="font-bold text-2xl flex justify-start mb-4">Details of Animal</h1>
  
      <div class="p-6 bg-gray-200 rounded-lg w-1/2">
        <div class="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div class="flex-1">
            <span class="font-medium">Name:</span> {{ animalName }}
            <div class="text-gray-500">
              <span class="font-medium">Gender:</span> {{ animalgender }}
            </div>
            <div class="text-gray-500">
              <span class="font-medium">DOB:</span> {{ animalDOB }}
            </div>
          </div>
  
          <div class="w-24 h-24 ml-6">
            <img
              src="https://m.media-amazon.com/images/M/MV5BNWU5Zjk4NDUtMjEzNy00MmEzLThhNGUtOTJiNzRjN2RmNmU5XkEyXkFqcGc@._V1_.jpg"
              class="w-full h-full object-cover rounded-lg"
              alt="Animal Image"
            />
          </div>
        </div>
      </div>
  
      <div class="flex justify-center mt-2" v-if="items.length <= 1"> 
        <h1 class="bold text-2xl">No history found</h1>  
      </div>
      
      <div v-else class="w-full">
        <h1 class="font-bold text-2xl flex justify-center mt-6">Animal Transfer History</h1>
        
        <!-- Updated table styling -->
        <table class="w-1/2 mt-5 border mx-auto">
          <thead>
            <tr class="bg-gray-200">
              <th class="border border-gray-300 px-4 py-2 text-left">S.No</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Animal Name</th>
              <th class="border border-gray-300 px-4 py-2 text-left">From Zoo</th>
              <th class="border border-gray-300 px-4 py-2 text-left">To Zoo</th>
              <th class="border border-gray-300 px-4 py-2 text-left">User</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items.slice(1)" :key="index" class="hover:bg-gray-100">
              <td class="border border-gray-300 px-4 py-2">{{ index + 1 }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ item.animalName }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ item.fromzoo }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ item.tooZoo }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ item.userName }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useCustomFetch } from '~/composable/useFetchOptions';
  const route = useRoute();
  
  const items = ref([]);
  const animalName = ref("");   
  const animalgender = ref("");  
  const animalDOB = ref("");  
  
  const handleSubmit = async () => {
    try {
      const response = await useCustomFetch(`/history/${route.query.animalId}`, {
        method: "GET",
      });
      console.log(response);
      items.value = response; 
      animalName.value = response[0].animalname;
      animalgender.value = response[0].gender;
      animalDOB.value = response[0].dob;
    } catch (err) {
      console.error(err);
    }
  };
  
  onMounted(() => {
    handleSubmit();
  });
  </script>
  
  <style scoped>
  </style>
  