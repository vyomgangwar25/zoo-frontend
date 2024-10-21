<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRoleStore } from "~/store/useRoleStore";
import { useCustomFetch } from "~/composable/useFetchOptions";
import DeleteModalVue from "~/components/DeleteModalVue.vue";
import  AlertPopup from "~/components/AlertPopup.vue"
 
const toastMessage :Ref<string> = ref('');
const isToastVisible = ref(false);
const closeToast=()=>{
  isToastVisible.value=false
}
 
const roleStore = useRoleStore();
const route = useRoute();
const AnimalId = ref();
const isModalOpen = ref(false);
 

function openModal(animalId:BigInteger) {
  isModalOpen.value = true;
  AnimalId.value = animalId;
  const animalToEdit = items.value.find((zoo) => zoo.animal_id === animalId);  
  if (animalToEdit) {
  formData.value.name = animalToEdit.name;
  formData.value.gender = animalToEdit.gender;
}  
}
const updateAnimalData = async () => {
    try {
    const response = await useCustomFetch(`/updateanimal/${AnimalId.value}`, {
      method: "PUT",
      body: JSON.stringify(formData.value),
    });
    toastMessage.value = response;
    fetchanimaldata();
  } catch (err) {
    toastMessage.value = err.response._data;     
  }
  isToastVisible.value = true;
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
  const isAnimalRegistrationModal=ref(false);
const handleSubmit = async () => {
  if (!formData2.value.name || !formData2.value.gender ||!formData2.value.dob) {
     toastMessage.value = "Please fill all the details."
    isToastVisible.value = true;
    return;
  }
  try {
    const response = await useCustomFetch("/animalregistration", {
      method: "POST",
      body: JSON.stringify(formData2.value),
    });
   
    toastMessage.value = response;
    isToastVisible.value = true;
    fetchanimaldata();
  } catch (err) {
    console.log(err);
  }
  isAnimalRegistrationModal.value=false
};

const formFields2 = [
  {
    label: "name",
    type: "text",
    placeholder: "Enter name of animal",
    errorMessage: "Name not valid",
    regex: "/^.+$/",
  },
  {
    label: "gender",
    type: "text",
    placeholder: "Enter gender",
    errorMessage: "Enter gender",
    regex: "/^.+$/",
  },
  {
    label: "dob",
    type: "date",
    placeholder: "Enter dob",
    errorMessage: "please enter dob",
    regex: "/^.+$/",
  },
];
const formData2 = ref({
  name: "",
  gender: "",
  dob: "",
  zooid: route.query.zooId as string,
});

//delete modal
const isactive = ref(false);
const animalIdOk = ref();

const modalopen2 = (animalId:BigInteger) => {
  animalIdOk.value = animalId;
  isactive.value = true;
};
const Okmodal = async () => {
  try {
    const response = await useCustomFetch(`/deleteanimal/${animalIdOk.value}`, {
      method: "DELETE",
    });
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

//transfer animal state
const isTransferModelOpen = ref(false);
const TransferAnimalId = ref();
const selectedZooId = ref(0);

//dropdown api
const zooList: Ref<{ id: BigInteger; name: string }[]> = ref([]);

const transferModalOpen = async (zooid :BigInteger, trasnferAnimalId:BigInteger) => {
  isTransferModelOpen.value = true;
  TransferAnimalId.value = trasnferAnimalId;
  try {
    const response :any= await useCustomFetch(`/getdropdowndata`, {
      method: "GET",
      query: {
        zooId: zooid,
      },
    });
    console.log(response );
    zooList.value = response.filteredZoos;
  } catch (err) {
    console.error(err);
  }
};

// close transfer modal
const closeTransferModal = () => {
  isTransferModelOpen.value = false;
};
//transfer api
const transferAnimal = async (id:BigInteger) => {
  try {
    const response = await useCustomFetch(`/transferanimal`, {
      method: "PUT",
      query: {
        animalid: TransferAnimalId.value,
        zooid: id,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("SavedToken")}`,
      },
    });
    toastMessage.value = response;
    isToastVisible.value = true;
    isTransferModelOpen.value = false;
    fetchanimaldata();
  } catch (err) {
    console.error(err);
  }
};

const totalPages = ref(0);
const items :Ref<{zooname:string; animalcount:BigInteger; animal_id:BigInteger; dob:string; gender:string; name:string; zoo_id:BigInteger; id:BigInteger}[]>= ref([]);
 
const pagesize = 3;
const pageno = ref(0);
const zooid :Ref<number>= ref(0);
const zooname :Ref<string>= ref("");

const fetchanimaldata = async () => {
  try {
    const response:any = await useCustomFetch(`/extractanimal/${zooid.value}?page=${pageno.value}&pagesize=${pagesize}`,
      {
        method: "GET",
      }
    );
     console.log(response)
    items.value = response.animaldata || [];
    totalPages.value = Math.ceil(response.animalcount / pagesize);
    zooname.value = response.zooname;
  } catch (err) {
    console.error(err);
  }
};
const setSelectNo=(no:Number)=>{
  pageno.value=Number(no)-1;
  fetchanimaldata();
}
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
    zooid.value = Number(route.query.zooId)
  fetchanimaldata();
});
</script>

<template>
  <AlertPopup :label="toastMessage" :isVisible="isToastVisible" @close="closeToast" />
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
        items.length == 0  ? 'flex items-center justify-center' : 'flex items-center justify-between'  ">
      <div v-if="items.length !== 0" class="header text-2xl font-bold">
        <h1>List of Animals in the Zoo</h1>
      </div>
      <div>
        <button
          @click=" () => {  isAnimalRegistrationModal = true;
            } "
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
        >
          Add Animal
        </button>
      </div>

      <!---------------------------------------------------ADD Animal Modal------------------------------------->

      <DeleteModalVue
        :isactive=" isAnimalRegistrationModal"
        @success="handleSubmit"
        @close="(event) => ( isAnimalRegistrationModal = event)"
        :modalType="'form'"
        :formField="formFields2"
        :formData="formData2"
      >
        <template #form-modal-content-heading>
          Animal Registraction form
        </template>
        <template #form-success-button> Submit</template>
      </DeleteModalVue>
    </div>

    <div class="p-6 bg-gray-200 rounded-lg mt-5">
      <div v-if="items.length === 0" class="text-2xl bold flex justify-center aligb-center py-10">
        loading.....
      </div>
      <ul class="space-y-4" v-else>
        <li  v-for="animal in items"
          class="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center">
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
            name="heroicons:x-mark"
            iconcolour=" text-red-700"
            iconbg=" bg-gray-100"
            iconhover=" hover:bg-gray-500 hover:text-white ml-2"
          />

          <CustomIcon
            @clicked="openModal(animal.animal_id)"
            name="heroicons:arrow-path"
            iconcolour=" text-blue-700"
            iconbg=" bg-gray-100"
            iconhover=" hover:bg-gray-500 hover:text-white ml-2"
          />

          <CustomIcon
            @clicked="transferModalOpen(route.query.zooId as any, animal.animal_id)"
            name="heroicons:arrow-right-on-rectangle-20-solid"
            iconcolour=" text-blue-700"
            iconbg=" bg-gray-100"
            iconhover=" hover:bg-gray-500 hover:text-white ml-2"
          />
        </li>
      </ul>
    </div>

    <div
      v-if="items.length !== 0"
      class="pagination-controls flex justify-center space-x-4 my-4">
      <button v-if="pageno>0"
        class="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        @click="decreaseButton">
        Previous
      </button>
      <button  class="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" v-for="number in totalPages" :key="number"  @click="setSelectNo(Number(number))">{{ number }}</button>
      <button v-if="pageno < totalPages-1"
        class="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        @click="increaseButton">
        Next
      </button>
    </div>
  </div>
  <!------------------------------------------------------------Update  Modal  ------------------------------------------------------>

  <DeleteModalVue
    :isactive="isModalOpen"
    @success="updateAnimalData"
    @close="(event) => (isModalOpen = event)"
    :modalType="'form'"
    :formField="formFields"
    :formData="formData">
    <template #form-modal-content-heading> Update Animal Data </template>
    <template #form-success-button> Update </template>
  </DeleteModalVue>

  <!----------------------------------------------------------DELETE MODAL------------------------------------------------------------>

  <DeleteModalVue
    :isactive="isactive"
    @success="Okmodal"
    @close="closeModal2"
    :modalType="'delete'">
    <template #delete-modal-content-heading>
      Are you sure you want to delete this animal
    </template>
  </DeleteModalVue>

  <!-----------------------------------------------------------------Transfer Modal------------------------------------------------------>

  <DeleteModalVue
    :isactive="isTransferModelOpen"
    @success=" (selectedZooId) => {
      transferAnimal(selectedZooId);
      }"
    @close="closeTransferModal"
    :modalType="'transfer'"
    :zoolist="zooList" >
    <template #delete-modal-content-heading> Animal Transfer </template>
  </DeleteModalVue>
</template>
