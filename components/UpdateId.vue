<template>
  <div v-if="props.isModalOpen" class="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75">
    <div class="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
      <Form @submit="emitSuccess">
        <div class="">
          <div class="mb-4 font-bold">Select Role Id </div>
          <div>
            <label for="name" class="mb-2 text-sm font-medium text-gray-700">User Name: </label>

            <div class="w-full">
              <Field name="username" id="username"
                class=" w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                v-model="props.username" :disabled="true" rules="required" />

            </div>
          </div>
        </div>

        <div class="mt-2">
          <label for="Role" class="text-sm font-medium text-gray-700">Role</label>
          <Field id="RoleId" name="RoleId"
            class="block w-64 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            as="select" v-model="selectedValue" rules="required">
            <option value="" disabled>Select Id</option>
            <option value="1">1(User)</option>
            <option value="2">2(Admin)</option>
          </Field>

          <ErrorMessage name="RoleId" class="text-red-600 text-sm mt-1" />
          <div class=" flex justify-end space-x-2">
            <button class="px-4 py-2 bg-gray-400 text-gray-900 text-sm rounded hover:bg-gray-500"
              type="submit">update</button>
            <button class="px-4 py-2 text-gray-900 text-sm rounded hover:bg-blue-500 bg-blue-400 " type="submit"
              @click="emitClose">Cancel</button>

          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Form, Field, ErrorMessage } from "vee-validate";
const emit = defineEmits(['success', 'close'])

const props = defineProps<{
  isModalOpen: boolean;
  username: string;
}>();

const selectedValue = ref("")
const emitSuccess = () => {

  emit('success', selectedValue.value)
}
const emitClose = () => {
  emit('close')
}

</script>
