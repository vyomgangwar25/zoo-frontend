<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRoleStore } from "~/store/useRoleStore";
import { useCustomFetch } from "~/composable/useFetchOptions";
const roleStore = useRoleStore();

const AnimalId = ref("");
const isModalOpen = ref(false);

function openModal(animalId) {
  isModalOpen.value = true;
  AnimalId.value = animalId;
}

const updateAnimalData = async () => {
  try {
    const response = await useCustomFetch(`/updateanimal/${AnimalId.value}`, {
      method: "PUT",
      body: JSON.stringify(formData.value),
    });

    alert(response);
    fetchanimaldata();
  } catch (err) {
    alert("Failed to update animal data.");
  }
  isModalOpen.value = false;
};

const formFields = [
  {
    label: "name",
    type: "text",
    placeholder: "Name",
    errorMessage: "Name not valid",
    regex: "/^.+$/",
  },
  {
    label: "gender",
    type: "text",
    placeholder: "Gender",
    errorMessage: "Gender not valid",
    regex: "/^.+$/",
  },
];

const formData = ref({
  name: "",
  gender: "",
});

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

    <div
      :class="
        items.length == 0
          ? 'flex items-center justify-center'
          : 'flex items-center justify-between'
      "
    >
      <div v-if="items.length !== 0" class="header text-2xl font-bold">
        <h1>List of Animals in the Zoo</h1>
      </div>
      <div>
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

    <div class="p-6 bg-gray-200 rounded-lg mt-5">
      <div v-if="items.length == 0"></div>
      <ul class="space-y-4" v-else>
        <li
          v-for="animal in items"
          :key="animal.id"
          class="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center"
        >
          <div class="flex-grow">
            <div class="text-lg font-semibold">Name: {{ animal.name }}</div>
            <div class="text-gray-500">
              <span class="font-medium">Gender: {{ animal.gender }}</span>
            </div>
            <div class="text-gray-500">
              <span class="font-medium">DOB: {{ animal.dob }}</span>
            </div>
          </div>

          <CustomIcon
            v-if="roleStore.role === 'admin'"
            @clicked="modalopen2(animal.animal_id)"
            name="heroicons:trash"
            iconcolour=" text-blue-700"
            iconbg=" bg-gray-100"
            iconhover=" hover:bg-blue-500 hover:text-white ml-2"
          />

          <CustomIcon
            @clicked="openModal(animal.animal_id)"
            name="heroicons:arrow-path"
            iconcolour=" text-blue-700"
            iconbg=" bg-gray-100"
            iconhover=" hover:bg-blue-500 hover:text-white ml-2"
          />

          <CustomIcon
            @clicked="
              navigateTo({
                path: '/AnimalTransfer',
                query: {
                  animalId: animal.animal_id,
                  zooId: animal.zoo_id,
                },
              })
            "
            name="heroicons:arrow-right-on-rectangle-20-solid"
            iconcolour=" text-blue-700"
            iconbg=" bg-gray-100"
            iconhover=" hover:bg-blue-500 hover:text-white ml-2"
          />
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

  <DeleteModalVue
    :isactive="isModalOpen"
    @success="updateAnimalData"
    @close="(event) => (isModalOpen = event)"
    :modalType="'form'"
    :formField="formFields"
    :formData="formData"
  >
    <template #form-modal-content-heading> Update Animal Data </template>
    <template #form-success-button> Update </template>
  </DeleteModalVue>

  <!--------------------------------------------DELETE MODAL-------------------------->

  <DeleteModalVue
    :isactive="isactive"
    @success="Okmodal"
    @close="closeModal2"
    :modalType="'delete'"
  >
    <template #delete-modal-content-heading>
      Are you sure you want to delete this animal: 123
    </template>
  </DeleteModalVue>
</template>
