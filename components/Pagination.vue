<template>
  <div class="space-x-2">
    <button
      class="btn px-4 py-2 rounded"
      :class="
        pageno > 1
          ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      "
      @click="DecreaseButton"
    >
      Previous
    </button>
    <button
      class="btn bg-white-100 text-black px-4 py-2 rounded border-2 hover:bg-white-500"
      v-for="number in props.totalPages"
      :class="
        pageno === number
          ? 'btn bg-red-500 text-white px-4 py-2 hover:bg-red-600 '
          : ''
      "
      @click="setSelectNo(number)"
    >
      {{ number }}
    </button>
    <button
      class="btn px-4 py-2 rounded"
      :class="
        pageno < props.totalPages
          ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      "
      @click="IncreaseButton"
    >
      Next
    </button>
  </div>
</template>

<script lang="ts"  setup>
const emit = defineEmits(["PageChange"]);

const selectedpage = ref(1);
const diasblePgaeNo = ref(1);

const props =  defineProps<{
  totalPages: number,
  initialPage: number,
}>();

const pageno = ref(props.initialPage);

const setSelectNo = (number:number) => {
  selectedpage.value = number;

  if (diasblePgaeNo.value === number) {
    diasblePgaeNo.value = number;
    return;
  }

  pageno.value = number;

  emit("PageChange", number);

  diasblePgaeNo.value = number;
};

const IncreaseButton = () => {
  if (pageno.value < props.totalPages) {
    pageno.value = pageno.value + 1;
    setSelectNo(pageno.value);
  }
};
const DecreaseButton = () => {
  if (pageno.value > 1) {
    pageno.value = pageno.value - 1;

    setSelectNo(pageno.value);
  }
};
</script>

<style></style>
