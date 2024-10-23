<script lang="ts" setup >
import { useRoleStore } from "~/store/useRoleStore";
import { useCustomFetch } from "~/composable/useFetchOptions";
import DeleteModalVue from "~/components/DeleteModalVue.vue";
import  AlertPopup from "~/components/AlertPopup.vue"
 
 
const toastMessage  = ref('');
const isToastVisible = ref(false);
const closeToast=()=>{
  isToastVisible.value=false
}

const roleStore = useRoleStore();
const router = useRouter();
const isModalOpen = ref(false);
const zooid = ref();

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
    type: "number",
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

const openModal = (id:BigInteger) => {
  isModalOpen.value = true;
  zooid.value  = id;
  const zooToEdit = items.value.find((zoo) => zoo.id === id);  
  if (zooToEdit) {
  
  formData.value.name = zooToEdit.name;
  formData.value.location = zooToEdit.location;
  formData.value.size = ""+zooToEdit.size;
}
};

const updateZooData = async () => {
  try {
    const response:any = await useCustomFetch(`/updatezoo/${zooid.value}`, {
      method: "PUT",
      body: formData.value,
    });
    toastMessage.value = response;
    isToastVisible.value = true;
    fetchzoodata();
  } catch (error:any) {
    alert(error.response._data)
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

const zooRegistration = async () => {
  if ( !formData2.value.name || !formData2.value.location || !formData2.value.size )  {
    toastMessage.value = "Please fill all the details."
    isToastVisible.value = true;
    return;
  }
  try {
    const response = await useCustomFetch("/zoo", {
      method: "POST",
      body: JSON.stringify(formData2.value),
    });
    toastMessage.value = "zoo registration done!! ";
    isToastVisible.value = true;
    fetchzoodata();
  } catch (err) {
    console.log(err);
  }
  isZooRegistrationModal.value = false;
};

const totalPages = ref(0);
const items:Ref<{totalzoo:BigInteger; name:string;  location:string; size:BigInteger; id:BigInteger}[]> = ref([]);
const pagesize = 3;
const pageno = ref(0);
const diasblePgaeNo=ref(0);
   const setSelectNo=(number:number)=>{
    if(diasblePgaeNo.value=== number-1)
   {
    diasblePgaeNo.value=number-1;
    return;
   }
     pageno.value=number-1;
    fetchzoodata();
    diasblePgaeNo.value=number-1;
   }

const IncreaseButton = () => {
  if (pageno.value < totalPages.value - 1) {
    pageno.value = pageno.value + 1;
    fetchzoodata();
  }
};
const DecreaseButton = () => {
  if (pageno.value > 0) {
    pageno.value = pageno.value - 1;
    fetchzoodata();
  }
};
const fetchzoodata = async () => {
  try {
    const response :any = await useCustomFetch("/extractzoo", {
      method: "GET",
      params: {
        page: pageno.value, pagesize: pagesize,
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

const isDeleteModalOpen = ref(false);
const deleteZooIdOk = ref();
const deleteModalOpen = (id:BigInteger) => {
  deleteZooIdOk.value = id;
  isDeleteModalOpen.value = true;
};
const deleteZoo = async () => {
  try {
    const response = await useCustomFetch(`/deletezoo/${deleteZooIdOk.value}`, {
      method: "DELETE",
    });
    items.value = items.value.filter((item) => item.id !== deleteZooIdOk.value);
    if (items.value.length === 0 && pageno.value > 0) {
      pageno.value--;
      fetchzoodata();
    }
  } catch (error) {
    console.log(error);
  }
  isDeleteModalOpen.value = false;
};
const deleteModalClose = () => {
  isDeleteModalOpen.value = false;
};

//view animal api
const viewAnimal = (id:BigInteger) => {
  router.push({
    path: "/Animal/ExtractAnimalData",
    query: { zooId: Number(id) },
  });
};
</script>

<template>
  <AlertPopup :label="toastMessage" :isVisible="isToastVisible" @close="closeToast" />
  <div class="container mx-auto p-4">
    <div :class=" items.length === 0? 'flex justify-center mb-4' : 'flex justify-between mb-4' " >
      <div v-if="items.length !== 0" class="header text-2xl font-bold">
        List of Zoos stored in the database:
      </div>
      <button
        @click="() => {
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
        @success="zooRegistration"
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
        
          class="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center"
        >
          <div class="w-24 h-24 mr-4">
            <img
              src="https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,q_75,w_1200/v1/crm/houston/Asian-Elephant-0479-0654-783906ecce425e6_783908b6-f2dd-dbab-baaafeb9c82c3d70.jpg"
              class="w-full h-full object-cover rounded-lg"
            />
          </div>
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
            @clicked="openModal(item.id as any)"
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
            @clicked="deleteModalOpen(item.id)"
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

    <!---------------------Delete modal--------------------------------->

    <DeleteModalVue
      :isactive="isDeleteModalOpen"
      @success="deleteZoo"
      @close="deleteModalClose"
      :modalType="'delete'"
    >
      <template #delete-modal-content-heading>
        Are you sure you want to delete this zoo
      </template>
    </DeleteModalVue>

    <div
      v-if="items.length !== 0"
      class="pagination-controls flex justify-center space-x-4 my-4"
    >
    <button  class="btn px-4 py-2 rounded" :class="pageno > 0 ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'" @click="DecreaseButton">
        Previous
    </button>
      <button  class="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" v-for="number in totalPages" :key="number"  @click="setSelectNo(number)">{{ number }}</button>
      <button  class="btn px-4 py-2 rounded" :class="pageno <totalPages-1 ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'" @click="IncreaseButton">
        Next
      </button>
    </div>
  </div>
</template>
