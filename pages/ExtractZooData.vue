<script setup>
import { useRoleStore } from "~/store/useRoleStore";
import { useCustomFetch } from "~/composable/useFetchOptions";
import DeleteModalVue from "~/components/DeleteModalVue.vue";
const roleStore = useRoleStore();
const router = useRouter();
const isModalOpen = ref(false);
const zooid = ref("");

const formFields = [
  {
    label: "name",
    type: "text",
    placeholder: "Enter Name",
    errorMessage: "Name not valid",
    regex: "/^.+$/",
  },
  {
    label: "location",
    type: "text",
    placeholder: "Enter Location",
    errorMessage: "Location not valid",
    regex: "/^.+$/",
  },
  {
    label: "size",
    type: "text",
    placeholder: "Enter size",
    errorMessage: "Size not valid",
    regex: "/^.+$/",
  },
];

const formData = ref({
  name: "",
  location: "",
  size: "",
});

const openModal = (id) => {
  isModalOpen.value = true;
  zooid.value = id;
  console.log(zooid.value);
};

const updateZooData = async () => {
  try {
    const response = await useCustomFetch(`/updatezoo/${zooid.value}`, {
      method: "PUT",
      body: formData.value,
    });
    alert(response);
    fetchzoodata();
  } catch (error) {
    console.log(error);
  }
  isModalOpen.value = false;
};

const isZooRegistrationModal = ref(false);
const formFields2 = [
  {
    label: "name",
    type: "text",
    placeholder: "Enter Name",
    errorMessage: "Name not valid",
    regex: "/^.+$/",
  },
  {
    label: "location",
    type: "text",
    placeholder: "Enter Location",
    errorMessage: "Location not valid",
    regex: "/^.+$/",
  },
  {
    label: "size",
    type: "text",
    placeholder: "Enter size",
    errorMessage: "Size not valid",
    regex: "/^.+$/",
  },
];

const formData2 = ref({
  name: "",
  location: "",
  size: "",
});

const zooRegistraction = async () => {
  try {
    const response = await useCustomFetch("/zoo", {
      method: "POST",
      body: JSON.stringify(formData2.value),
    });
    alert("zoo registration done!! ");
  } catch (err) {
    console.log(err);
  }
  isZooRegistrationModal.value = false;
};

const totalPages = ref(0);
const items = ref([]);
const pagesize = 3;
const pageno = ref(0);
const IncreaseButton = () => {
  if (pageno.value < totalPages.value - 1) {
    pageno.value = pageno.value + 1;
  }
  fetchzoodata();
};
const DecreaseButton = () => {
  if (pageno.value > 0) {
    pageno.value = pageno.value - 1;
    fetchzoodata();
  }
};
const fetchzoodata = async () => {
  try {
    const response = await useCustomFetch("/extractzoo", {
      method: "GET",
      params: {
        page: pageno.value,
        pagesize: pagesize,
      },
    });
    console.log(response);

    items.value = response.zoodata;
    totalPages.value = Math.ceil(response.totalzoo / pagesize);
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  fetchzoodata();
});

//delete api
const deleteZoo = async (id) => {
  console.log("Deleting zoo with id:", id);
  try {
    const response = await useCustomFetch(
      `http://localhost:8080/deletezoo/${id}`,
      {
        method: "DELETE",
      }
    );

    alert("Zoo delete successfully");
    items.value = items.value.filter((item) => item.id !== id);
  } catch (error) {
    console.log(error);
  }
};

//view animal api
const viewAnimal = (id) => {
  router.push({
    path: "/ExtractAnimalData",
    query: { zooId: id },
  });
};

const animalRegister = (id) => {
  console.log("clicked id is-->", { id });
  router.push({
    path: "/AnimalRegistration",
    query: { zooId: id },
  });
};
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="header text-2xl font-bold mb-6">
      List of Zoos stored in the database:
    </div>
    <div
      :class="
        items.length === 0
          ? 'flex justify-center mb-4'
          : 'flex justify-end mb-4'
      "
    >
      <button
        @click="
          () => {
            isZooRegistrationModal = true;
          }
        "
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Zoo
      </button>

      <!--------------------------------------AddZooModal----------------------------------------------------------------->
      <DeleteModalVue
        :isactive="isZooRegistrationModal"
        @success="zooRegistraction"
        @close="(event) => (isZooRegistrationModal = event)"
        :modalType="'form'"
        :formField="formFields2"
        :formData="formData2"
      >
        <template #form-modal-content-heading> Add Zoo </template>
        <template #form-success-button> Add </template>
      </DeleteModalVue>
    </div>

    <div class="p-6 bg-gray-200 rounded-lg">
      <div
        v-if="items.length === 0"
        class="text-2xl bold flex justify-center aligb-center py-10"
      >
        loading.....
      </div>
      <ul class="space-y-4">
        <li
          v-for="(item, index) in items"
          :key="item.id"
          class="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center"
        >
          <div class="flex-grow">
            <div class="text-lg font-semibold">Name:{{ item.name }}</div>
            <div class="text-gray-500">
              <span class="font-medium">Location:</span> {{ item.location }}
            </div>
            <div class="text-gray-500">
              <span class="font-medium">Size:</span> {{ item.size }} acres
            </div>
          </div>

          <!-- <CustomIcon
            @clicked="animalRegister(item.id)"
            name="heroicons:plus"
            iconcolour=" text-green-700"
            iconbg=" bg-gray-100"
            iconhover=" hover:bg-gray-500 hover:text-white ml-2"
          /> -->
          <CustomIcon
            @clicked="openModal(item.id)"
            name="heroicons:arrow-path"
            iconcolour=" text-blue-700"
            iconbg=" bg-gray-100"
            iconhover=" hover:bg-gray-500 hover:text-white ml-2"
          />

          <CustomIcon
            @clicked="viewAnimal(item.id)"
            name="heroicons:eye"
            iconcolour=" text-blue-700"
            iconbg=" bg-gray-100"
            iconhover=" hover:bg-gray-500 hover:text-white ml-2"
          />

          <CustomIcon
            v-if="roleStore.role === 'admin'"
            @clicked="deleteZoo(item.id)"
            name="heroicons:x-mark"
            iconcolour=" text-red-700"
            iconbg=" bg-gray-100"
            iconhover=" hover:bg-gray-500 hover:text-white ml-2"
          />
        </li>
      </ul>
    </div>

    <!---------------------Update modal--------------------------------->

    <DeleteModalVue
      :isactive="isModalOpen"
      @success="updateZooData"
      @close="(event) => (isModalOpen = event)"
      :modalType="'form'"
      :formField="formFields"
      :formData="formData"
    >
      <template #form-modal-content-heading> Update Zoo Data </template>
      <template #form-success-button> Update </template>
    </DeleteModalVue>

    <div
      v-if="items.length !== 0"
      class="pagination-controls flex justify-center space-x-4 my-4"
    >
      <button
        class="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        @click="DecreaseButton"
      >
        Previous
      </button>
      <button
        class="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        @click="IncreaseButton"
      >
        Next
      </button>
    </div>
  </div>
</template>
