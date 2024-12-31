<script lang="ts" setup>
import { useRoleStore } from "~/store/useRoleStore";
import { useCustomFetch } from "~/composable/useFetchOptions";
import type { AnimalData } from "~/types/AnimalData";
import type { fetchAnimal } from "~/types/FetchAnimal";
 
const toastMessage = ref("");
const isToastVisible = ref(false);
const isCheckModal=ref(true)
 
const roleStore = useRoleStore();
const route = useRoute();
const AnimalId = ref();
const isModalOpen = ref(false);
 
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
function updateModalOpen(animalId:number,animal:any) {
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
      fetchAnimalData();
    }).
   catch (function(err) {
    toastMessage.value = err.response._data;
  })
  isToastVisible.value = true;
  isModalOpen.value = false;
};


const isAnimalRegistrationModal = ref(false);
function handleSubmit() {
     useCustomFetch<string>("/animal/create", {
      method: "POST",
      body: createAnimalData.value,
    }).then(function(response){
    toastMessage.value = response;
    isToastVisible.value = true;
    fetchAnimalData();
    }).catch (function(err) {
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
    rules:"required"
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

const deleteModalOpen = (animalId: number) => {
 
  animalIdOk.value = animalId;
  isactive.value = true;
};
function deleteAnimal (){
  useCustomFetch(`/animal/delete/${animalIdOk.value}`, {
      method: "DELETE",
    }).then(function(){
      items.value = items.value.filter(
      (item) => item.animal_id !== animalIdOk.value
    );
    if (items.value.length === 0 && pageno.value > 1) {
      pageno.value--;
      fetchAnimalData();
    }
    }). catch (function(error) {
    console.error("Error deleting animal:", error);
  })
  isactive.value = false;
};

const closeDeleteModal = () => {
  isactive.value = false;
};

//transfer animal state
const isTransferModelOpen = ref(false);
const TransferAnimalId = ref();
const selectedZooId = ref(0);

//dropdown api
const zooList: Ref<{ id: BigInteger; name: string }[]> = ref([]);
const transferModalOpen = async (zooid: BigInteger,trasnferAnimalId: number) => {
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
    toastMessage.value = response;
    isToastVisible.value = true;
    isTransferModelOpen.value = false;
    fetchAnimalData();

    }).catch (function(err:any){
    console.error(err);
  })
};

const totalPages = ref(0);
const items: Ref< AnimalData[]> = ref([]);
const pagesize = 3;
const pageno = ref(1);
const zooid: Ref<number> = ref(0);
const loading = ref(false);
function fetchAnimalData () {
  loading.value = true;
     
    useCustomFetch<fetchAnimal>(`/animal/list/${zooid.value}?page=${pageno.value-1}&pagesize=${pagesize}`,
      {
        method: "GET",
      }
    ).then(function(response){
     
    items.value = response.animaldata || [];
    totalPages.value = Math.ceil(response.animalcount / pagesize);
    }).catch (function(err) {
    console.error(err)}).
   finally(function(){
    loading.value = false;
   }) 
};
 
const handlePageChange=(page:number)=>{
  pageno.value=page;
  fetchAnimalData();
}

onMounted(() => {
  zooid.value = Number(route.query.zooId);
  fetchAnimalData();
});
const zooname=route.query.zooname;
</script>
<template>
  <AlertPopup :label="toastMessage" :isVisible="isToastVisible"  @close="isToastVisible= false" />
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
          Animal Registration form
        </template>
        <template #form-success-button> Submit</template>
      </CustomModal>
    </div>

    <div class="p-6 bg-gray-200 rounded-lg mt-5">
      <div v-if="loading" class="text-2xl bold flex justify-center aligb-center py-10">
        Loading...
      </div>
      <div v-else-if="items.length === 0" class="text-2xl bold flex justify-center aligb-center py-10">
        No animals present
      </div>
      <div class="space-y-4" v-else>
        <div v-for="animal in items" class="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center" >
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
            v-if="roleStore.role === '2'"
            @clicked="deleteModalOpen(animal.animal_id)"
            name="heroicons:x-mark" 
            iconcolour=" text-red-700"/>
          </li>
          <li title="update">
          <CustomIcon
            @clicked="updateModalOpen(animal.animal_id, animal)"
            name="heroicons:pencil-square-solid"
            iconcolour=" text-blue-700"/>
          </li>
          <li title="transfer">
          <CustomIcon
            @clicked="transferModalOpen(route.query.zooId as any, animal.animal_id)"
            name="heroicons:arrow-right-on-rectangle-20-solid"
            iconcolour=" text-blue-700"/>
          </li>
           <li title="history">
          <CustomIcon
            v-if="roleStore.role === '2'"
            @clicked="navigateTo(`/AnimalTransferHistory?animalId=${animal.animal_id}`)"
            name="material-symbols:history-2"
            iconcolour=" text-blue-700"/>
          </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      v-if="items.length !== 0"
      class="pagination-controls flex justify-center space-x-4 my-4">
      
      <Pagination :totalPages="totalPages"  :initialPage="pageno" @PageChange=" handlePageChange"  />
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
    @success="deleteAnimal"
    @close="closeDeleteModal"
    :modalType="'delete'"
    :isCheckModal="isCheckModal" >
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
