<script setup>
const isModalOpen = ref(false);
const zooid = ref("");
const name = ref("");
const location = ref("");
const size = ref("");

const openModal = (id) => {
  isModalOpen.value = true;
  zooid.value = id;
  console.log(zooid.value);
};

const updateZooData = async () => {
  const data = {
    name: name.value,
    location: location.value,
    size: size.value,
  };
  try {
    const response = await useCustomFetch(`/updatezoo/${zooid.value}`, {
      method: "PUT",
      body: data,
    });
    alert(response);
    fetchzoodata();
  } catch (error) {
    console.log(error);
  }
  isModalOpen.value = false;
};

const router = useRouter();
import { useCustomFetch } from "~/composable/useFetchOptions";
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
  console.log("clicked id is--->", { id });
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
        @click="navigateTo('/ZooRegistration')"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Zoo
      </button>
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

          <CustomIcon
            @clicked="animalRegister(item.id)"
            name="heroicons:plus"
            iconcolour=" text-green-700"
            iconbg=" bg-gray-100"
            iconhover=" hover:bg-gray-500 hover:text-white ml-2"
          />
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
            @clicked="deleteZoo(item.id)"
            name="heroicons:x-mark"
            iconcolour=" text-red-700"
            iconbg=" bg-gray-100"
            iconhover=" hover:bg-gray-500 hover:text-white ml-2"
          />
        </li>
      </ul>
    </div>

    <!---------------------modal--------------------------------->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg w-96">
        <div class="flex justify-between items-center pb-4 border-b">
          <h3 class="text-lg font-semibold">Update Zoo Data</h3>
          <button
            @click="isModalOpen = false"
            class="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
        <div class="py-4">
          <div class="flex flex-col">
            <label for="" class="block text-sm font-medium text-gray-700"
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
          <div>
            <label for="">Location</label>
            <CustomInput
              type="text"
              v-model="location"
              placeholder="Enter location"
              :regex="/^.+$/"
              errorMessage="Please enter a location."
            />
          </div>
          <div>
            <label for="">Size</label>
            <CustomInput
              type="text"
              v-model="size"
              placeholder="Enter size "
              :regex="/^.+$/"
              errorMessage="Please enter size."
            />
          </div>
        </div>
        <div class="flex justify-end pt-4">
          <button
            @click="updateZooData"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            updated
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="items.length != 0"
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
