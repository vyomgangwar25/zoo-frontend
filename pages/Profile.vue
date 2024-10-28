<script lang="ts" setup>

import { useCustomFetch } from '~/composable/useFetchOptions';
import { useRoleStore } from '~/store/useRoleStore'; 

const route=useRoute()
const roleStore = useRoleStore();
const cookies=useCookie("SavedToken")
const isModalOpen = ref(false);
const router=useRouter();
const name=ref(roleStore.name)
const email=ref(roleStore.email) 
const role=ref(roleStore.role)

const formFields = [
  {
    label: "name",
    type: "text",
    placeholder: "Name",
    regex:".*[a-zA-Z].*",
    errorMessage:"enter valid name",
  },
  {
    label: "email",
    type: "email",
    placeholder: "email",
    regex: "^[\\w.-]+@[a-zA-Z\\d.-]+\\.[a-zA-Z]{2,}$",
    errorMessage:"enter valid email address"
  },
];

const formData = ref({
  name: "",
  email: "",
});

const modalOpen=()=>{
  isModalOpen.value=true
  formData.value.name=roleStore.name;
  formData.value.email=roleStore.email
}
 

const handleSubmit=async()=>{
    const response= await useCustomFetch(`/updateuser/${route.query.id}`,{
        method: "PUT",
      body: JSON.stringify({
        username: formData.value.name,
        email:formData.value.email
      }),  
    })
 
    if(response && formData.value.email !== email.value)
    {
      roleStore.setState("","","",0);
      cookies.value="";
      router.push("/login")
      
    }
    isModalOpen.value=false;
    dashboardApi();
  
}

const dashboardApi = async () => {
 
 try {
   const response:any = await useCustomFetch("/validate_token", {
     method: "GET",
   });

   roleStore.setState(response.role, response.userEmail, response.name,response.id);
   name.value = roleStore.name;
   email.value = roleStore.email ;
   role.value=roleStore.role;
 } catch (err) {
   alert(err);
 
 }
};
onMounted(()=>{
    dashboardApi();
})
    
</script>

<template>
  <div>
    <div  class="flex justify-center">
    <Icon
      name="heroicons:user-circle"
      class="text-white text-9xl ml-5 cursor-pointer bg-gray-400"
    />
  </div>
 
     <div class=" flex justify-center">
    <div class="flex items-center justify-center mb-4">
      <CustomIcon name="material-symbols:person-rounded" iconcolour=" text-gray-700"/>
      <CustomInput
        type="text"
        placeholder="Enter your name"
        v-model="name"
        class="flex-1"
      />
    </div>
     </div>
  <div class="flex justify-center">
    <div class="flex items-center justify-center mb-4">
     <CustomIcon name="heroicons:envelope-20-solid" iconcolour=" text-gray-700"     />
      <CustomInput
        type="text"
        placeholder="Enter your email"
        v-model="email"
        class="flex-1"
      />
    </div>
  </div>
  <div class=" flex justify-center">
    <div class="flex items-center justify-center mb-4">
     <CustomIcon name="heroicons:information-circle-solid"   iconcolour=" text-gray-700"  />
      <CustomInput
        type="text"
        placeholder="Enter role"
        v-model="role"
        class="flex-1"
      />
    </div>
     </div>
     <div class=" flex justify-center">
    <div class="flex items-center justify-center mb-4">
      <button type="submit" @click="modalOpen" class="bg-blue-500 text-white rounded p-2">Update</button>
    </div>
     </div>
     <DeleteModalVue
    :isactive="isModalOpen"
    @success="handleSubmit"
    @close="(event) => (isModalOpen = event)"
    :modalType="'form'"
    :formField="formFields"
    :formData="formData">
    <template #form-modal-content-heading> Update User Data </template>
    <template #form-success-button> Update </template>
  </DeleteModalVue>
  
  </div>
</template>


