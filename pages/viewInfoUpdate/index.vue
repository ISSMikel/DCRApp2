<script lang="ts" setup>
//Add Middleware 
definePageMeta({
    middleware: "auth",
});


let searchValue = ref("")
let searchField = ref("")

const headers = ref([
    // { text: "File Numbers", value: "fileNumber", width: 50 },
    { text: "DATE OF RECEIPT", value: "formattedDateReceipt", width: 10 },
    { text: "DATE OF LETTERS", value: "formattedDateLetters", width: 10 },
    { text: "FROM WHOM RECEIVED", value: "fromWhomReceived", width: 10 },
    { text: "SUBJECT", value: "subject", width: 350 },
    { text: "FILE NUMBER", value: "InfoUrl", width: 200 },
    { text: "REMARKS / COMMENTS", value: "remarksComments", width: 200 },
])

let items = ref([
]);

//Get All Info data from Database
let response = await useFetch('/api/info/index2')

// console.log(response.data.value)
let r1 = []

useForEach(response.data.value, function (n) {
    // console.log(n)
    n.formattedDateLetters = n. dateOfLetters ? new Date(n.dateOfLetters).toLocaleDateString('en-GB', { timeZone: 'UTC' }): 'N/A'
    n.formattedDateReceipt = n.dateOfReceipt ? new Date(n.dateOfReceipt).toLocaleDateString('en-GB', { timeZone: 'UTC' }): 'N/A'
})

// console.log(response.data)

items = response.data


</script>
<template>
    <div class="flex  justify-center bg-gray-100 ">
        <div class="p-5 rounded-xl bg-white m-5 flex-1 text-center border shadow-2xl">
            <div>
                <h1 class="mb-5 text-2xl font-bold">Recently Updated Info </h1>
            </div>

            <div class="text-right mb-1 pt-4 px-5">
                <!--   <span class="font-bold">Search Field: </span>
                <select class="rounded border border-black pb-2" type="text" v-model="searchField">
                    <option value="">All</option>
                    <option>dateOfLetters</option>
                    <option>dateOfReceipt</option>
                </select> -->
                <span class="font-bold">Search: </span>
                <input class="rounded border border-black pb-2" type="text" v-model="searchValue">
            </div>
            <div>
                <EasyDataTable :headers="headers" :items="items" table-class-name="customize-table" :rows-per-page="10"
                    border-cell :search-value="searchValue" :search-field="searchField">
                    <template #item-InfoUrl="{ _id, fileNumber }">
                        <div class="flex ">
                            <a class="hover:bg-blue-500" :href="'editInfo/' + _id">{{ fileNumber }}</a>
                            <!-- <div v-if="!callLoad">
                            </div> -->
                        </div>
                    </template>
                </EasyDataTable>
            </div>





        </div>
    </div>
</template>

<style>
h1 {
    text-align: center;
}

.customize-table {
    --easy-table-border: 1px solid #445269;
    --easy-table-row-border: 1px solid #445269;
    --easy-table-column-border: 1px solid #445269;

    --easy-table-header-font-size: 16px;
    --easy-table-header-height: 50px;
    --easy-table-header-font-color: white;
    --easy-table-header-background-color: #10676d;

    --easy-table-body-row-font-size: 16px;
    /* --easy-table-body-row-hover-font-color: blue; */
    --easy-table-body-row-hover-background-color: #8bb8f1;
}
</style>