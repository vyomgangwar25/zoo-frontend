<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Animal Transfer</h1>
    <h2 class="text-lg font-semibold mb-2">Zoo name: {{ zooname }}</h2>
    <h2 class="text-lg font-semibold mb-2">Zoo location: {{ zoolocation }}</h2>
    <h2 class="text-lg font-semibold mb-2">Animal name: {{ animalname }}</h2>
    <h2 class="text-lg font-semibold mb-2">Gender: {{ animalgender }}</h2>

    <div class="mb-4">
      <label for="zooSelect" class="block text-lg font-medium mb-2"
        >Select Zoo:</label
      >
      <select
        id="zooSelect"
        v-model="selectedZooId"
        class="block w-64 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
      >
        <option disabled value="">Select Zoo</option>
        <option v-for="(item, index) in items" :key="index" :value="item.id">
          {{ item.name }}
        </option>
      </select>
      <p class="mt-2 text-gray-600">You selected: {{ selectedZooId }}</p>
    </div>

    <button
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
      @click="transferAnimal"
    >
      Transfer
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCustomFetch } from "~/composable/useFetchOptions";

const route = useRoute();
const zooid = ref("");
const selectedZooId = ref("");
const animalId = ref(route.query.animalId);
const items = ref([]);
const animalname = ref("");
const animalgender = ref("");
const zooname = ref("");
const zoolocation = ref("");
const dropdowndata = async () => {
  try {
    const response = await useCustomFetch(`getdropdowndata/${zooid.value} `, {
      method: "GET",
      query: {
        animalid: animalId.value,
      },
    });
    console.log(response);
    items.value = response.filteredZoos;
    animalname.value = response.animaldata.name;
    animalgender.value = response.animaldata.gender;
    zooname.value = response.animaldata.zoo.name;
    zoolocation.value = response.animaldata.zoo.location;
  } catch (err) {
    console.error(err);
  }
};

// Transfer animal on button click
const transferAnimal = async () => {
  try {
    const response = await useCustomFetch(`/transferanimal`, {
      method: "PUT",
      query: {
        animalid: animalId.value,
        zooid: selectedZooId.value,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("SavedToken")}`,
      },
    });
    alert(response);
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  zooid.value = route.query.zooId;
  dropdowndata();
});
</script>

<style scoped></style>
