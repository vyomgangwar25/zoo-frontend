<script lang="ts" setup>
import { Form, Field } from "vee-validate";
import { useCustomFetch } from "~/composable/useFetchOptions";
import { useRoleStore } from "~/store/useRoleStore";

const route = useRoute();
const roleStore = useRoleStore();
const cookies = useCookie("SavedToken");
const isModalOpen = ref(false);
const router = useRouter();

const toastMessage: Ref<string> = ref("");
const isToastVisible = ref(false);

const closeToast = () => {
  isToastVisible.value = false;
};

//const items: Ref<{ token: string; role: string; email: string; name: string; id: number }[]> = ref([]);
const formFields = [
  {
    label: "name",
    type: "text",
    placeholder: "Name",
    rules: "required",
  },
  {
    label: "email",
    type: "email",
    placeholder: "email",
    rules: "required",
  },
];

const formData = ref({
  name: "",
  email: "",
});

const modalOpen = () => {
  isModalOpen.value = true;
  formData.value.name = roleStore.name;
  formData.value.email = roleStore.email;
};

const handleSubmit = async () => {
  try {
    const response = await useCustomFetch<string>(
      `/user/update/${route.query.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          username: formData.value.name,
          email: formData.value.email,
        }),
      }
    );
    toastMessage.value = response;
    isToastVisible.value = true;

    if (response && formData.value.email !== roleStore.email) {
      roleStore.setState("", "", "", 0);
      cookies.value = "";
      router.push("/login");
      return;
    }
    roleStore.setState(
      roleStore.role,
      formData.value.email,
      formData.value.name,
      roleStore.id
    );
    isModalOpen.value = false;
  } catch (err: any) {
    toastMessage.value = err.response._data.errormessage;
    isToastVisible.value = true;
  }
};
</script>

<template>
  <div>
    <AlertPopup
      :label="toastMessage"
      :isVisible="isToastVisible"
      @close="closeToast"
    />
    <div class="flex justify-center">
      <Icon
        name="heroicons:user-circle"
        class="text-white text-9xl ml-5 cursor-pointer bg-gray-400"
      />
    </div>

    <Form>
      <div class="mb-4">
        <div class="flex justify-center">
          <div class="flex items-center justify-center mb-4">
            <CustomIcon
              name="material-symbols:person-rounded"
              iconcolour=" text-gray-700"
            />
            <Field
              name="name"
              type="name"
              class="px-4 py-2 text-base border-b-2 border-slate-500 focus:outline-none bg-white text-slate-800 w-full"
              v-model="roleStore.name"
              rules="required"
              :disabled="true"
            />
          </div>
        </div>
        <div class="flex justify-center">
          <div class="flex items-center justify-center mb-4">
            <CustomIcon
              name="heroicons:envelope-20-solid"
              iconcolour=" text-gray-700"
            />
            <Field
              name="email"
              type="email"
              class="px-4 py-2 text-base border-b-2 border-slate-500 focus:outline-none bg-white text-slate-800 w-full"
              v-model="roleStore.email"
              rules="required|email"
              :disabled="true"
            />
          </div>
        </div>

        <div class="flex justify-center">
          <div class="flex items-center justify-center mb-4">
            <CustomIcon
              name="heroicons:information-circle-solid"
              iconcolour=" text-gray-700"
            />
            <Field
              name="role"
              type="text"
              class="px-4 py-2 text-base border-b-2 border-slate-500 focus:outline-none bg-white text-slate-800 w-full"
              v-model="roleStore.role"
              rules="required"
              :disabled="true"
            />
          </div>
        </div>
      </div>
    </Form>
    <div class="flex justify-center">
      <div class="flex items-center justify-center mb-4">
        <button
          type="submit"
          @click="modalOpen"
          class="bg-blue-500 text-white rounded p-2"
        >
          Update
        </button>
      </div>
    </div>
    <CustomModal
      :isactive="isModalOpen"
      @success="handleSubmit"
      @close="(event) => (isModalOpen = event)"
      :modalType="'form'"
      :formField="formFields"
      :formData="formData"
    >
      <template #form-modal-content-heading> Update User Data </template>
      <template #form-success-button> Update </template>
    </CustomModal>
  </div>
</template>
