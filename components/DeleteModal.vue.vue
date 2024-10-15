<template>
  <div
    v-if="isactive"
    class="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
      <p v-if="modalType == 'delete'" class="text-sm text-gray-500 mb-4">
        <slot name="delete-modal-content-heading" />
      </p>

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
            v-model="formData[`${field.label}`]"
            :placeholder="field.placeholder"
            :regex="field.regex"
          />
        </div>
      </div>

      <div class="flex justify-end space-x-2">
        <button
          v-if="modalType == 'delete'"
          @click="emits('success')"
          class="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-500"
        >
          Ok
        </button>
        <button
          v-if="modalType == 'delete'"
          @click="emits('close')"
          class="px-4 py-2 bg-gray-100 text-gray-900 text-sm rounded hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          v-if="modalType == 'form'"
          @click="emits('success')"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <slot name="form-success-button"></slot>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  isactive: boolean;
  modalType: "form" | "delete";
  formField?: [
    {
      label: string;
      type: string;
      placeholder: string;
      errorMessage: string;
      regex: string;
    }
  ];
  formData: {
    name: string;
    gender: string;
    [x: string]: string;
  };
}>();
const emits = defineEmits(["success", "close"]);
</script>
