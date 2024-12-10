<template>
  <div>
    <button
      class="btn px-4 py-2 rounded"
      :class="
        pageno > 0
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
      :key="number"
      :class="
        pageno + 1 == number
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
        pageno < props.totalPages - 1
          ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      "
      @click="IncreaseButton"
    >
      Next
    </button>
  </div>
</template>

<script lang="ts" setup>

 
const pageno = ref(0);
const selectedpage = ref(1);
const diasblePgaeNo = ref(0);
 
// function fetchzoodata() {
//   loading.value = true;
//   useCustomFetch<fetchzoo>("/zoo/list", {
//     method: "GET",
//     params: {
//       page: pageno.value,
//       pagesize: pagesize,
//     },
//   })
//     .then(function (response) {
//       // console.log(response)
//       items.value = response.zoodata;
//       totalPages.value = Math.ceil(response.totalzoo / pagesize);
//     })
//     .catch(function (err) {
//       console.error(err);
//     })
//     .finally(function () {
//       loading.value = false;
//     });
// }

const props=defineProps({
  totalPages:Number,
  pageno:Number
   
})
const setSelectNo = (number: number) => {
  selectedpage.value = number;
  if (diasblePgaeNo.value === number - 1) {
    diasblePgaeNo.value = number - 1;
    return;
  }
  pageno.value = number - 1;
  //fetchzoodata();
  diasblePgaeNo.value = number - 1;
};

const IncreaseButton = () => {
  if (pageno.value < props.totalPages.value - 1) {
    console.log(pageno.value )
    pageno.value = pageno.value + 1;
    //fetchzoodata();
  }
};
const DecreaseButton = () => {
  if (pageno.value > 0) {
    console.log(pageno.value )
    pageno.value = pageno.value - 1;
    //fetchzoodata();
  }
};
 
</script>

<style></style>
