<script lang="ts" setup>
const selectedZooId : Ref<number> = ref(0);
const toastMessage :Ref<string> = ref('');
const isToastVisible = ref(false)
const validityCheck = ref<{ [key: string]: boolean }>({})
const props= defineProps<{
  isactive: boolean;
  modalType: "form" | "delete" | "transfer";
  
  zoolist?: Array<
    {
      id: BigInteger;
      name: string;
    }
  >;

  formField?: Array<
    {
      label: string;
      type: string;
      placeholder: string;
      errorMessage: string;
      regex: string;
    }
  >;
  formData?: {
    name: string;
    [x: string]: string;
  };
}>();

const closeToast=()=>{
  isToastVisible.value=false;
}

const emitFormSuccess = () => {
  const allValid = Object.values(validityCheck.value).every(valid => valid);
  if (allValid) {
    emits("success");  
  } else {
    toastMessage.value="Please fill out all fields correctly";
    isToastVisible.value=true;
  
  }
};


/**
 * This is transfer id 
 */
const emitTransfer = () => {
  if (selectedZooId.value) {
    emits("success", selectedZooId.value);
  } else {
    alert("Please select a zoo before transferring.");
  }
};
const emits = defineEmits(["success", "close"]);
</script>
<template>
 <AlertPopup :label="toastMessage" :isVisible="isToastVisible" @close="closeToast" />
  <div
    v-if="isactive"
    class="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
      <p v-if="modalType == 'delete'" class="text-sm text-gray-500 mb-4">
        <slot name="delete-modal-content-heading" />
      </p>

      <!-----------------------modaltype="transfer"----------------------->
   
      <div v-if="modalType == 'transfer'" class="text-sm text-gray-500 mb-4">
        <slot name="delete-modal-content-heading" />

        <div class="mb-4">
          <select
            id="zooSelect"
            v-model="selectedZooId" 
            class="block w-64 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          >
          <option disabled value="0" >Select Zoo</option>
             
            <option
              v-for="(item, index) in zoolist"
              :key="index"
              :value="item.id"
            >
              {{ item.name }}
              
            </option>
          </select>
        </div>
      </div>

      <div
        v-if="modalType == 'form'"
        class="flex justify-between items-center pb-4 border-b"
      >
        <h3 class="text-lg font-semibold">
          <slot name="form-modal-content-heading" />
        </h3>
        <button
          @click="emits('close', false)"
          class="text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>

      <div class="py-4" v-if="modalType == 'form'">
        <div v-for="field in formField" class="flex flex-col">
          <label
            :for="field.label"
            class="block text-sm font-medium text-gray-700"
            >{{ field.label }}</label
          >
          <CustomInput
            :type="field.type"
            v-model="props.formData![field.label]"
            :placeholder="field.placeholder"
            :regex="field.regex"
            :errorMessage="field.errorMessage"
             @validity="(validity) => { validityCheck[field.label] = validity; }"

          />
        </div>
      </div>

      <div class="flex justify-end space-x-2">
        <button
          v-if="modalType == 'transfer'"
          @click="emitTransfer"
          class="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-500"
        >
          Transfer
        </button>
        <button
          v-if="modalType == 'delete'"
          @click="emits('success')"
          class="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-500"
        >
          Ok
        </button>
        <button
          v-if="modalType == 'delete' || 'transfer'"
          @click="emits('close')"
          class="px-4 py-2 bg-gray-100 text-gray-900 text-sm rounded hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          v-if="modalType == 'form'"
          @click="emitFormSuccess"
         
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <slot name="form-success-button"></slot>
        </button>
      </div>
    </div>
  </div>
</template>