<script lang="ts" setup>
import { useRoleStore } from "~/store/useRoleStore";
import { useCustomFetch } from "~/composable/useFetchOptions";
import type { AnimalData } from "~/types/AnimalData";
import type { fetchAnimal } from "~/types/FetchAnimal";
 
const toastMessage = ref("");
const isToastVisible = ref(false);
const closeToast = () => {
  isToastVisible.value = false;
};

const roleStore = useRoleStore();
const route = useRoute();
const AnimalId = ref();
const isModalOpen = ref(false);
 

function updatemodalOpen(animalId:BigInteger,animal:any) {
  isModalOpen.value = true;
    AnimalId.value = animalId;
    updateData.value.name = animal.name;
    updateData.value.gender = animal.gender;
 
  comparewithOriginal.value = { ...updateData.value };
}
const hasDataChanged = () => {
  return (
    JSON.stringify(updateData.value) !== JSON.stringify(comparewithOriginal.value)
  );
};
const updateAnimal = async () => {
  if (!hasDataChanged()) {
    return;
  }
      useCustomFetch<string>(`/animal/update/${AnimalId.value}`,
      {
        method: "PUT",
        body: JSON.stringify(updateData.value),
      }).
      then(function(response){
      toastMessage.value = response;
      fetchanimaldata();
    }).
   catch (function(err) {
    toastMessage.value = err.response._data;
  })
  isToastVisible.value = true;
  isModalOpen.value = false;
};

const update = [
  {
    label: "name",
    type: "text",
    placeholder: "Name",
    rules:"required|alpha_spaces"
  },
  {
    label: "gender",
    type: "text",
    placeholder: "Gender",
    rules:"required"
  },
];

const updateData = ref({
  name: "",
  gender: "",
});
const comparewithOriginal = ref({
  name: "",
  gender: "",
});

const isAnimalRegistrationModal = ref(false);
function handleSubmit() {
     useCustomFetch<string>("/animal/create", {
      method: "POST",
      body: createAnimalData.value,
    }).then(function(response){
      toastMessage.value = response;
    isToastVisible.value = true;
    fetchanimaldata();
    }). catch (function(err) {
    console.log(err);
  })
  isAnimalRegistrationModal.value = false;
  createAnimalData.value.name="";createAnimalData.value.gender="";createAnimalData.value.dob="";
};

const createAnimal = [
  {
    label: "name",
    type: "text",
    placeholder: "Enter name of animal",
    rules:"required|alpha_spaces"
  },
  {
    label: "gender",
    type: "text",
    placeholder: "Enter gender",
    rules:"required|alpha_spaces"
  },
  {
    label: "dob",
    type: "date",
    placeholder: "Enter dob",
    rules:"required"
  },
];
const createAnimalData = ref({
  name: "",
  gender: "",
  dob: "",
  zooid: route.query.zooId as string,
});

//delete modal
const isactive = ref(false);
const animalIdOk = ref();

const deletemodalopen = (animalId: BigInteger) => {
 
  animalIdOk.value = animalId;
  isactive.value = true;
};
function deleteanimal (){
  useCustomFetch(`/animal/delete/${animalIdOk.value}`, {
      method: "DELETE",
    }).then(function(){
      items.value = items.value.filter(
      (item) => item.animal_id !== animalIdOk.value
    );
    if (items.value.length === 0 && pageno.value > 0) {
      pageno.value--;
      fetchanimaldata();
    }
    }). catch (function(error) {
    console.error("Error deleting animal:", error);
  })
  isactive.value = false;
};

const closedeleteModal = () => {
  isactive.value = false;
};

//transfer animal state
const isTransferModelOpen = ref(false);
const TransferAnimalId = ref();
const selectedZooId = ref(0);

//dropdown api
const zooList: Ref<{ id: BigInteger; name: string }[]> = ref([]);
const transferModalOpen = async (zooid: BigInteger,trasnferAnimalId: BigInteger) => {
  isTransferModelOpen.value = true;
  TransferAnimalId.value = trasnferAnimalId;
  try {
    const response: any = await useCustomFetch(`/animal/zoolist`, {
      method: "GET",
      query: {
        zooId: zooid,
      },
    });
    console.log(response);
    zooList.value = response;
  } catch (err) {
    console.error(err);
  }
};

// close transfer modal
const closeTransferModal = () => {
  isTransferModelOpen.value = false;
};
//transfer api
function transferAnimal(id: BigInteger) {
 
     useCustomFetch<string>(`/animal/transfer`, {
      method: "PUT",
      query: {
        animalid: TransferAnimalId.value,
        zooid: id,
      },
    }).then(function(response){
      console.log(response);
    toastMessage.value = response;
    isToastVisible.value = true;
    isTransferModelOpen.value = false;
    fetchanimaldata();

    }).catch (function(err:any){
    console.error(err);
  })
};

const totalPages = ref(0);
const items: Ref< AnimalData[]> = ref([]);
const pagesize = 3;
const pageno = ref(0);
const zooid: Ref<number> = ref(0);
const loading = ref(false);
function fetchanimaldata () {
  loading.value = true;
  
    useCustomFetch<fetchAnimal>(`/animal/list/${zooid.value}?page=${pageno.value}&pagesize=${pagesize}`,
      {
        method: "GET",
      }
    ).then(function(response){
      console.log(response)
    items.value = response.animaldata || [];
    totalPages.value = Math.ceil(response.animalcount / pagesize);
    }).catch (function(err) {
    console.error(err)}).
   finally(function(){
    loading.value = false;
   }) 
};
const selectedPage=ref(1);
const diasblePgaeNo = ref(0);
const setSelectNo = (no: number) => {
  selectedPage.value=no;
  if (diasblePgaeNo.value === no - 1) {
    diasblePgaeNo.value = no - 1;
    return;
  }
  pageno.value = Number(no) - 1;
  fetchanimaldata();
  diasblePgaeNo.value = no - 1;
};
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
onMounted(() => {
  zooid.value = Number(route.query.zooId);
  fetchanimaldata();
});
const zooname=route.query.zooname;
</script>
<template>
  <AlertPopup
    :label="toastMessage"
    :isVisible="isToastVisible"
    @close="closeToast"
  />
  <div class="container mx-auto p-4">
    <div class="text-2xl font-bold flex justify-center items-center mb-3">
      Welcome to {{ zooname }}
    </div>
    <div>
      
    </div>

    <div :class="items.length == 0 ? 'flex items-center justify-center' : 'flex items-center justify-between'">
      <div v-if="items.length !== 0" class="header text-2xl font-bold">
        <h1>List of Animals in the Zoo</h1>
      </div>
      <div>
        <button
          @click="() => { isAnimalRegistrationModal = true }"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4" >
          Add Animal
        </button>
      </div>

      <!---------------------------------------------------ADD Animal Modal------------------------------------->

      <CustomModal
        :isactive="isAnimalRegistrationModal"
        @success="handleSubmit"
        @close="(event) => (isAnimalRegistrationModal = event)"
        :modalType="'form'"
        :formField="createAnimal"
        :formData="createAnimalData">
        <template #form-modal-content-heading>
          Animal Registraction form
        </template>
        <template #form-success-button> Submit</template>
      </CustomModal>
    </div>

    <div class="p-6 bg-gray-200 rounded-lg mt-5">
      <div
        v-if="loading"
        class="text-2xl bold flex justify-center aligb-center py-10"
      >
        Loading...
      </div>
      <div
        v-else-if="items.length === 0"
        class="text-2xl bold flex justify-center aligb-center py-10"
      >
        No animals present
      </div>
      <div class="space-y-4" v-else>
        <div
          v-for="animal in items"
          class="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center"
        >
          <div class="flex-grow">
            <div class="text-lg font-semibold">Name: {{ animal.name }}</div>
            <div class="text-gray-500">
              <span class="font-medium">Gender: {{ animal.gender }}</span>
            </div>
            <div class="text-gray-500">
              <span class="font-medium"
                >DOB: {{ animal.dob.split("T")[0] }}</span
              >
            </div>
          </div>
          <ul class="flex ">
            <li title="delete">
          <CustomIcon
            v-if="roleStore.role === 'admin'"
            @clicked="deletemodalopen(animal.animal_id)"
            name="heroicons:x-mark" 
            iconcolour=" text-red-700"
            iconbg=" bg-gray-100"
            iconhover=" hover:bg-gray-500 hover:text-white ml-2"/>
          </li>
          <li title="update">
          <CustomIcon
            @clicked="updatemodalOpen(animal.animal_id, animal)"
            name="heroicons:pencil-square-solid"
            iconcolour=" text-blue-700"
            iconbg=" bg-gray-100"
            iconhover=" hover:bg-gray-500 hover:text-white ml-2"/>
          </li>
          <li title="transfer">
          <CustomIcon
            @clicked="transferModalOpen(route.query.zooId as any, animal.animal_id)"
            name="heroicons:arrow-right-on-rectangle-20-solid"
            iconcolour=" text-blue-700"
            iconbg=" bg-gray-100"
            iconhover=" hover:bg-gray-500 hover:text-white ml-2"/>
          </li>
           <li title="history">
          <CustomIcon
            v-if="roleStore.role === 'admin'"
            @clicked="navigateTo(`/AnimalTransferHistory?animalId=${animal.animal_id}`)"
            name="material-symbols:history-2"
            iconcolour=" text-blue-700"
            iconbg=" bg-gray-100"
            iconhover=" hover:bg-gray-500 hover:text-white ml-2"/>
          </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      v-if="items.length !== 0"
      class="pagination-controls flex justify-center space-x-4 my-4">
      <button
        class="btn px-4 py-2 rounded"
        :class="pageno > 0 ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer': 'bg-gray-300 text-gray-500 cursor-not-allowed'" @click="decreaseButton">
        Previous
      </button>
      <button
        class="btn bg-white-100 text-black-200 border-2 px-4 py-2 rounded hover:bg-white-500" v-for="number in totalPages" :key="number" :class="pageno+1==number? 'btn bg-red-500 text-white px-4 py-2 hover:bg-red-600 ':'' "  @click="setSelectNo(Number(number))"> {{ number }} </button>
      <button
        class="btn px-4 py-2 rounded"
        :class="pageno < totalPages - 1 ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'" @click="increaseButton">
        Next
      </button>
    </div>
  </div>
  <!------------------------------------------------------------Update  Modal  ------------------------------------------------------>
  <CustomModal
    :isactive="isModalOpen"
    @success="updateAnimal"
    @close="(event) => (isModalOpen = event)"
    :modalType="'form'"
    :formField="update"
    :formData="updateData">
    <template #form-modal-content-heading> Update Animal Data </template>
    <template #form-success-button> Update </template>
  </CustomModal>

  <!----------------------------------------------------------DELETE MODAL------------------------------------------------------------>
  <CustomModal
    :isactive="isactive"
    @success="deleteanimal"
    @close="closedeleteModal"
    :modalType="'delete'">
    <template #delete-modal-content-heading>
      Are you sure you want to delete this animal
    </template>
  </CustomModal>

  <!-----------------------------------------------------------------Transfer Modal------------------------------------------------------>
  <CustomModal
    :isactive="isTransferModelOpen"
    @success="
    (selectedZooId) => {transferAnimal(selectedZooId);}"
    @close="closeTransferModal"
    :modalType="'transfer'"
    :zoolist="zooList">
    <template #delete-modal-content-heading> Animal Transfer </template>
  </CustomModal>
</template>
