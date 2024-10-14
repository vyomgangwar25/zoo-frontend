<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCustomFetch } from "~/composable/useFetchOptions";

const AnimalId = ref("");
const name = ref("");
const gender = ref("");
const isModalOpen = ref(false);

function openModal(animalId) {
  isModalOpen.value = true;
  AnimalId.value = animalId;
}

const updateAnimalData = async () => {
  const data = {
    name: name.value,
    gender: gender.value,
  };

  try {
    const response = await useCustomFetch(`/updateanimal/${AnimalId.value}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    alert(response);
    fetchanimaldata();
  } catch (err) {
    alert("Failed to update animal data.");
  }
  isModalOpen.value = false;
};

//delete modal
const isactive = ref(false);
const animalIdOk = ref();
const modalopen2 = (animalId) => {
  animalIdOk.value = animalId;
  console.log(animalIdOk.value);
  isactive.value = true;
};
const Okmodal = async () => {
  try {
    const response = await useCustomFetch(`/deleteanimal/${animalIdOk.value}`, {
      method: "DELETE",
    });
    alert(response);
    items.value = items.value.filter(
      (item) => item.animal_id !== animalIdOk.value
    );
    if (items.value.length === 0 && pageno.value > 0) {
      pageno.value--;
      fetchanimaldata();
    }
  } catch (error) {
    console.error("Error deleting animal:", error);
  }
  isactive.value = false;
};

const closeModal2 = () => {
  isactive.value = false;
};

const totalPages = ref(0);
const items = ref([]);
const pagesize = 3;
const pageno = ref(0);
const zooid = ref("");
const zooname = ref("");

const route = useRoute();

const decreaseButton = () => {
  if (pageno.value > 0) {
    pageno.value = pageno.value - 1;
    fetchanimaldata();
  }
};

const increaseButton = () => {
  if (pageno.value < totalPages.value - 1) {
    pageno.value = pageno.value + 1;
    fetchanimaldata();
  }
};

const fetchanimaldata = async () => {
  try {
    const response = await useCustomFetch(
      `/extractanimal/${zooid.value}?page=${pageno.value}&pagesize=${pagesize}`,
      {
        method: "GET",
      }
    );
    console.log(response);
    items.value = response.animaldata || [];
    totalPages.value = Math.ceil(response.animalcount / pagesize);
    zooname.value = response.zooname;
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  zooid.value = route.query.zooId;
  fetchanimaldata();
});
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="text-2xl font-bold flex justify-center items-center mb-3">
      Welcome to {{ zooname }} Zoo
    </div>
    <div>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus,
        totam laboriosam sequi mollitia cum tempore molestiae voluptatum
        deserunt molestias. A vero praesentium quod quos culpa eaque
        consequatur, quas aperiam nesciunt?
      </p>
    </div>
    <div class="flex justify-between">
      <div class="header text-2xl font-bold mb-6 mt-9">
        <h1>List of Animals in the Zoo</h1>
      </div>
      <div
        :class="
          items.length === 0
            ? 'flex justify-center mb-4'
            : 'flex justify-end mb-4 '
        "
      >
        <button
          @click="
            navigateTo({
              path: '/AnimalRegistration',
              query: { zooId: route.query.zooId },
            })
          "
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
        >
          Add Animal
        </button>
      </div>
    </div>

    <div>
      <div v-if="items.length == 0"></div>
      <ul class="space-y-4" v-else>
        <li
          v-for="animal in items"
          :key="animal.id"
          class="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center"
        >
          <div class="flex-grow">
            <div>id:{{ animal.animal_id }}</div>
            <div class="text-lg font-semibold">Name: {{ animal.name }}</div>
            <div class="text-gray-500">
              <span class="font-medium">Gender: {{ animal.gender }}</span>
            </div>
            <div class="text-gray-500">
              <span class="font-medium">DOB: {{ animal.dob }}</span>
            </div>
          </div>
          <Icon
            name="heroicons:trash"
            class="text-4xl cursor-pointer hover:text-red-700 mr-2"
            @click="modalopen2(animal.animal_id)"
          />
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
            @click="openModal(animal.animal_id)"
          >
            Update
          </button>

          <button
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            @click="
              navigateTo({
                path: '/AnimalTransfer',
                query: {
                  animalId: animal.animal_id,
                  zooId: animal.zoo_id,
                },
              })
            "
          >
            Transfer Animal
          </button>
        </li>
      </ul>
    </div>

    <div
      v-if="items.length > 0"
      class="pagination-controls flex justify-center space-x-4 my-4"
    >
      <button
        class="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        @click="decreaseButton"
      >
        Previous
      </button>
      <button
        class="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        @click="increaseButton"
      >
        Next
      </button>
    </div>
  </div>

  <!------------------------------------------------------------ Modal  ------------------------------------------------------>
  <div
    v-if="isModalOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg w-96">
      <div class="flex justify-between items-center pb-4 border-b">
        <h3 class="text-lg font-semibold">Update Animal Data</h3>
        <button
          @click="isModalOpen = false"
          class="text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
      <div class="py-4">
        <div class="flex flex-col">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <CustomInput
            type="text"
            v-model="name"
            placeholder="Enter name"
            :regex="/^.+$/"
            errorMessage="Please enter a name."
          />
        </div>
        <div class="flex flex-col">
          <label for="gender" class="text-gray-700 font-medium mb-2"
            >Gender</label
          >
          <CustomInput
            type="text"
            v-model="gender"
            placeholder="Enter gender"
            :regex="/^.+$/"
            errorMessage="Please enter gender."
          />
        </div>
      </div>
      <div class="flex justify-end pt-4">
        <button
          @click="updateAnimalData"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          updated
        </button>
      </div>
    </div>
  </div>

  <!--------------------------------------------DELETE MODAL-------------------------->
  <div
    v-if="isactive"
    class="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
      <p class="text-sm text-gray-500 mb-4">
        Are you sure you want to remove this item?
      </p>
      <div class="flex justify-end space-x-2">
        <button
          @click="Okmodal"
          class="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-500"
        >
          Ok
        </button>
        <button
          @click="closeModal2"
          class="px-4 py-2 bg-gray-100 text-gray-900 text-sm rounded hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
