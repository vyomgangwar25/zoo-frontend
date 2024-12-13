<script lang="ts" setup >
import { useRoleStore } from "~/store/useRoleStore";
import { useCustomFetch } from "~/composable/useFetchOptions";
import type { fetchzoo } from "~/types/FetchZoo";
import type { zoodata } from "~/types/ZooData";
 
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
    rules:"required|alpha_spaces"
  },
  {
    label: "location",
    type: "text",
    placeholder: "Enter Location",
    rules:"required|alpha_spaces"

  },
  {
    label: "size",
    type: "number",
    placeholder: "Enter size",
    rules:"required"
  },
  {
    label: "description",
    type: "text",
    placeholder: "Enter description",
    rules:"required"
  },
];

const formData = ref({
  name: "",
  location: "",
  size: "",
  description:""
});

const comparewithOriginal=ref({
  name:"",
  location:"",
  size:"",
  description:""
})
const openModal = (id:Number,item:any) => {
  isModalOpen.value = true;
  zooid.value  = id;

  formData.value.name = item.name;
  formData.value.location = item.location;
  formData.value.size = ""+item.size;
  formData.value.description=item.description;
 
comparewithOriginal.value = { ...formData.value };
}

const hasDataChanged = () => {
  return JSON.stringify(formData.value) !== JSON.stringify(comparewithOriginal.value);
};
 function updateZooData () {
  if (!hasDataChanged()) {
    return;
  }
   useCustomFetch<string>(`/zoo/update/${zooid.value}`, {
      method: "PUT",
      body: formData.value,
    }).then(function(response){
    toastMessage.value = response;
    isToastVisible.value = true;
    fetchzoodata();
    }).catch(function(error:any) {
    toastMessage.value = error.response._data;
       isToastVisible.value = true;
    console.log(error)
  })
  isModalOpen.value = false;
};

const isZooRegistrationModal = ref(false);
const  createZooFileds = [
  {
    label: "name",
    type: "text",
    placeholder: "Enter Name",
    rules: "required|alpha_spaces"
  },
  {
    label: "location",
    type: "text",
    placeholder: "Enter Location",
    rules: "required|alpha_spaces"
  },
  {
    label: "size",
    type: "number",
    placeholder: "Enter size",
    rules:"required"
  },
  {
     label:"description",
     type:"text",
     placeholder:"Enter description",
     rules:"required"
  }
];

const createZooData = ref({
  name: "",
  location: "",
  size: "",
  description:"",
});

function zooRegistration() { 
    useCustomFetch<string>("/zoo/create", {
      method: "POST",
      body: JSON.stringify(createZooData.value),
    }).then(function(response){
      toastMessage.value = response;
    isToastVisible.value = true;
    fetchzoodata();
    }).catch (function(err) {
    console.log(err);
  })
  createZooData.value.name=""; createZooData.value.location="";createZooData.value.size=""; createZooData.value.description="";
  isZooRegistrationModal.value = false;
};

const totalPages = ref(0);
const items:Ref<zoodata[]> = ref([]);
const pagesize = 3;
const pageno = ref(1);
 
const handlePageChange=(page:number)=>{
  pageno.value=page;
  fetchzoodata();

}

const loading=ref(false);
function fetchzoodata (){
  loading.value=true;
   if(pageno.value>0)
    useCustomFetch<fetchzoo>("/zoo/list", {
      method: "GET",
      params: {
        page: pageno.value-1, pagesize: pagesize,
      },
    }).then(function (response){ 
    items.value = response.zoodata;
    totalPages.value = Math.ceil(response.totalzoo / pagesize);
    }).catch (function(err) {
    console.error(err);
  }).
  finally(function(){
    loading.value=false;
  })
};

onMounted(() => {
  fetchzoodata();
});

//delete api

const isDeleteModalOpen = ref(false);
const deleteZooIdOk = ref();
const deleteModalOpen = (id:Number) => {
  deleteZooIdOk.value = id;
  isDeleteModalOpen.value = true;
};
function deleteZoo () {
 
    useCustomFetch<string>(`/zoo/delete/${deleteZooIdOk.value}`, {
      method: "DELETE",
    }).then(function(){
      items.value = items.value.filter((item) => item.id !== deleteZooIdOk.value);
    if (items.value.length === 0 && pageno.value > 1) {
      pageno.value--;
      fetchzoodata();
    }
    }).catch (function(error) {
      // toastMessage.value = error.response._data;
      // isToastVisible.value = true;
      console.log(error)
  })
  isDeleteModalOpen.value = false;
};
const deleteModalClose = () => {
  isDeleteModalOpen.value = false;
};

//view animal api
const viewAnimal = (id:Number,name:string) => {
  router.push({
    path: "/animal/AnimalData",
    query: { zooId: Number(id) , zooname:name},
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
      <CustomModal
        :isactive="isZooRegistrationModal"
        @success="zooRegistration"
        @close="(event) => (isZooRegistrationModal = event)"
        :modalType="'form'"
        :formField="createZooFileds"
        :formData="createZooData"
      >
        <template #form-modal-content-heading> Add Zoo </template>
        <template #form-success-button> Add </template>
      </CustomModal>
    </div>

    <div class="p-6 bg-gray-200 rounded-lg">
      <div v-if="loading" class="text-2xl bold flex justify-center aligb-center py-10">
       Loading...
    </div>
    <div v-else-if="items.length === 0" class="text-2xl bold flex justify-center aligb-center py-10">
      No zoo present
    </div>
      <div class="space-y-4">
        <ul v-for="(item, index) in items"  class="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center">
          <div class="w-24 h-24 mr-4">
            <img
              src="public/img1.jpg"
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
            <div class="text-gray-500">
              <span class="font-medium">Description:</span> {{ item.description}} 
            </div>
          </div>
         <li title="update">
          <CustomIcon
            @clicked="openModal(item.id ,item)"
            name="heroicons:pencil-square-solid"
            iconcolour=" text-blue-700"
          />
         </li>
          
          <li title="view">
          <CustomIcon
            @clicked="viewAnimal(item.id,item.name)"
            name="heroicons:eye"
            iconcolour=" text-blue-700" 
          />
        </li>
          <li title="delete">
            <CustomIcon
            v-if="roleStore.role === 'admin'"
            @clicked="deleteModalOpen(item.id)"
            name="heroicons:x-mark"
            iconcolour=" text-red-700"
            />
          </li>

        </ul>
      </div>
    </div>

    <!---------------------Update modal--------------------------------->

    <CustomModal
      :isactive="isModalOpen"
      @success="updateZooData"
      @close="(event) => (isModalOpen = event)"
      :modalType="'form'"
      :formField="formFields"
      :formData="formData"
    >
      <template #form-modal-content-heading> Update Zoo Data </template>
      <template #form-success-button> Update </template>
    </CustomModal>

    <!---------------------Delete modal--------------------------------->

    <CustomModal
      :isactive="isDeleteModalOpen"
      @success="deleteZoo"
      @close="deleteModalClose"
      :modalType="'delete'"
    >
      <template #delete-modal-content-heading>
        Are you sure you want to delete this zoo
      </template>
    </CustomModal>

    <div v-if="items.length !== 0" class=" flex justify-center space-x-4 my-4">
    <Pagination :totalPages="totalPages"  :initialPage="pageno" @PageChange=" handlePageChange"/>
    </div>
  </div>
</template>
