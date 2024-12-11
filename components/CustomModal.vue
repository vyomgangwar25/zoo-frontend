<script lang="ts" setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import AlertPopup from "@/components/AlertPopup.vue";

const selectedZooId = ref<number>();
const toastMessage = ref<string>("");
const isToastVisible = ref(false);

const emits = defineEmits(["success", "close"]);

const props = defineProps<{
  isactive: boolean;
  modalType: "form" | "delete" | "transfer";
  zoolist?: Array<{
    id: BigInteger;
    name: string;
  }>;
  formField?: Array<{
    label: string;
    type: string;
    placeholder: string;
    rules: string;
  }>;
  formData?: {
    name: string;
    [x: string]: string;
  };
}>();

const closeToast = () => {
  isToastVisible.value = false;
};

const emitFormSuccess = () => {
  emits("success");
};

const emitTransfer = () => {
  if (selectedZooId.value) 
    emits("success", selectedZooId.value);
};
</script>

<template>
  <AlertPopup
    :label="toastMessage"
    :isVisible="isToastVisible"
    @close="closeToast"
  />
  <div
    v-if="isactive"
    class="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
      <p v-if="modalType == 'delete'" class="text-sm text-gray-500 mb-4">
        <slot name="delete-modal-content-heading" />
      </p>

      <!-- Transfer Modal -->
      <div v-if="modalType == 'transfer'" class="text-sm text-gray-500 mb-4">
        <slot name="delete-modal-content-heading" />
        <div class="mb-4">
          <Form @submit="emitTransfer">
            <Field
              name="selectedZooId"
              as="select"
              id="selectedZooId"
              v-model="selectedZooId"
              class="block w-64 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              rules="required"
            >
              <option disabled value="">Select Zoo</option>
              <option
                v-for="(item, index) in zoolist"
                :key="index"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </Field>
            <ErrorMessage
              name="selectedZooId"
              class="text-red-600 text-sm mt-1"
            />
            <div class="flex justify-end space-x-2">
              <button
                class="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-500"
              >
                Transfer
              </button>
              <button
                @click="emits('close')"
                class="px-4 py-2 bg-gray-100 text-gray-900 text-sm rounded hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </Form>
        </div>
      </div>

      <Form v-if="modalType == 'form'" @submit="emitFormSuccess">
        <div class="flex justify-between items-center pb-4 border-b">
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

        <div class="py-4">
          <div
            v-for="field in formField"
            :key="field.label"
            class="flex flex-col mb-4"
          >
            <label
              :for="field.label"
              class="block text-sm font-medium text-gray-700"
              >{{ field.label }}</label
            >
            <Field
              :name="field.label"
              :type="field.type"
              v-model="props.formData![field.label]"
              :placeholder="field.placeholder"
              class="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              :rules="field.rules"
            />
            <ErrorMessage :name="field.label" class="text-red-600 text-sm" />
          </div>
        </div>

        <div class="flex justify-end space-x-2">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <slot name="form-success-button"></slot>
          </button>
        </div>
      </Form>

      <div v-if="modalType !== 'form'" class="flex justify-end space-x-2">
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
      </div>
    </div>
  </div>
</template>
