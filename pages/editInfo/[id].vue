<script lang="ts" setup>

import { useToast } from 'vue-toastification'
const toast = useToast()

//Add Middleware 
definePageMeta({
    middleware: "auth",
});

const route = useRoute()


let  {data}  = await useFetch(`/api/info/${route.params.id}`, {
  method: "GET",
})
// console.log(data.value.dateOfLetters)
let temLetterDate = data.value.dateOfLetters ? new Date(data.value.dateOfLetters).toISOString().split('T'): new Date
let temReceiptDate = data.value.dateOfReceipt ? new Date(data.value.dateOfReceipt).toISOString().split('T'): new Date

data.value.formattedDateLetters = temLetterDate[0]
data.value.formattedDateReceipt = temReceiptDate[0]

// console.log(data.value.formattedDateLetters)

// console.log(data)





//Don't allow user to send request mutiple times
const isLoading = ref(false)

//Send form data to database
async function handleNewInfoSubmit() {

  try {
    isLoading.value = true
  await useFetch(`/api/info/${route.params.id}`, {
      method: "PUT",
      body: {
        fileNumber: data.value.fileNumber,
        subject: data.value.subject,
        fromWhomReceived: data.value.fromWhomReceived,
        dateOfLetters: data.value.formattedDateLetters,
        dateOfReceipt: data.value.formattedDateReceipt,
        remarksComments: data.value.remarksComments,
        areaOfFiling: data.value.areaOfFiling,
      },
      
    })
    useRouter().push({
      name: "viewInfoUpdate",
    })

    toast.success('Record Updated')

  } catch (e: any) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
}


  


//Send form data to database
async function handleDelInfoSubmit() {

try {
  isLoading.value = true
 await useFetch(`/api/info/${route.params.id}`, {
    method: "DELETE"})
    useRouter().push({
      name: "index",
    })
toast.error('Record Deleted')
} catch (e: any) {
  console.log(e)
} finally {
  isLoading.value = false
}
}




</script>

<template>

  <form @submit="handleNewInfoSubmit">
    <div class="flex justify-center py-5">
      <div class="p-5 rounded-xl bg-white max-w-2xl flex-1 text-center border shadow-2xl">
      <div
        class="grid grid-cols-3 place-items-center ">
        <div class=" col-span-3">
          <h1 class=" mb-10 text-2xl font-bold">DCR Info Form</h1>
        </div>

        <div class="font-bold text-lg ">
          <label class="text-left" for="fileNumber">File Number</label>
        </div>
        <div class="col-span-2">
          <input type="text" class="border border-black p-2 rounded-lg mb-4 w-96 " v-model="data.fileNumber"
            aria-describedby="emailHelp" name="fileNumber">
        </div>
        <div class="font-bold text-lg">
          <label for="subject">Subject</label>
        </div>
        <div class="col-span-2">
          <input type="text" class="border border-black p-2 rounded-lg mb-4 w-96" v-model="data.subject"
            aria-describedby="emailHelp" name="subject">
        </div>
        <div class="font-bold text-lg">
          <label for="subject">From Whom Received</label>
        </div>
        <div class="col-span-2">
          <input type="text" class="border border-black p-2 rounded-lg mb-4 w-96" v-model="data.fromWhomReceived"
            aria-describedby="emailHelp" name="fromWhomReceived">
        </div>
        <div class="font-bold text-lg">
          <label for="areaOfFiling">Area of Filing</label>
        </div>
        <div class="col-span-2">
          <select class="w-96 border border-black p-2 rounded-lg mb-4" v-model="data.areaOfFiling"
            aria-label="Default select example" name="areaOfFiling">
            <option value="letters">Letters</option>
              <option value="invitation">Invitation</option>
              <option value="temp_file">Temp File</option>
              <option value="main_file">Main File</option>
              <option value="cabinet_file">Cabinet File</option>
              <option value="note_for_cabinet">Note for Cabinet</option>
              <option value="draft_note_for_cabinet">DRAFT Note for Cabinet</option>
              <option value="ministerial_minutes">Ministerial Minutes</option>
              <option value="performance_appraisals">Performance Appraisals (PAR)</option>
              <option value="Prime_ministers_mails">Prime ministers' mails</option>
              <option value="registry_mails">Registry Mails</option>
              <option value="contractual_agreement">Contractual Agreement</option>
              <option value="memo">Memo</option>
              <option value="private_confidential">Private/Confidential</option>
              <option value="national_security_council_secretariat">National Security Council Secretariat (NSCS) </option>
              <option value="applications_form">Applications/Form</option>
              <option value="miscellaneous">Miscellaneous</option>
              <option value="travel_expenses_voucher">Travel Expenses Voucher</option>
          </select>
        </div>
        <div class="font-bold text-lg">
          <label for="dateOfLetters"> Date of Letter</label>
        </div>
        <div class="col-span-2">
          <input type="date" class="border border-black p-2 rounded-lg mb-4 " v-model="data.formattedDateLetters"
            aria-describedby="emailHelp" name="dateOfLetters">
        </div>
        <div class="font-bold text-lg">
          <label for="dateOfReceipt">Date of Receipt</label>
        </div>
        <div class="col-span-2">
          <input type="date" class="border border-black p-2 rounded-lg mb-4 " v-model="data.formattedDateReceipt"
            aria-describedby="emailHelp" name="dateOfReceipt">
        </div>
        <div class="font-bold text-lg">
          <label for="remarksComments">Remarks/Comments</label>
        </div>
        <div class="col-span-2">
          <textarea type="text" class="border border-black p-2 rounded-lg mb-4 w-96 h-20" v-model="data.remarksComments"
            aria-describedby="emailHelp" name="remarksComments" />
        </div>
        </div>
        <div class="flex justify-around">
          
          <button @click="handleDelInfoSubmit()" type="submit" :disabled="isLoading"
            class="bg-red-500 hover:bg-red-600 transition-all duration-200  text-blue-50 rounded-lg p-2" :class="{
              'opcatiy-20 cursor-not-allowed': isLoading
            }">
            <NuxtLink to="/"></NuxtLink>
            Delete
          </button>
          <button type="submit" :disabled="isLoading"
              class="bg-orange-800 hover:bg-orange-700 transition-all duration-200  text-white rounded-lg p-2" :class="{
                'opcatiy-20 cursor-not-allowed': isLoading
              }">
              <NuxtLink to="/">Back</NuxtLink>
            </button>
          <button @click="handleNewInfoSubmit()" type="submit" :disabled="isLoading"
            class="bg-blue-500 hover:bg-blue-600 transition-all duration-200  text-blue-50 rounded-lg p-2" :class="{
              'opcatiy-20 cursor-not-allowed': isLoading
            }">
            Update
          </button>
        </div>

      </div>
      <div class="p-5 rounded-xl bg-white max-w-sm max-h-24 text-center border shadow-2xl">
        <div class="font-bold text-lg ">
            <label class="text-left">Symbols</label>
          </div>
          <div class="col-span-2 mb-2">
            <label> ü é ó € £ ˷ é ã ç ş ˜</label>
          </div>
      </div>
    </div>
  </form> 
</template>

<style>
h1 {
  text-align: center;
}
</style>


