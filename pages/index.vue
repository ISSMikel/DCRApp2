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
    { text: "FROM WHOM RECEIVED", value: "fromWhomReceived", width: 200 },
    { text: "SUBJECT", value: "subject", width: 350 },
    { text: "FILE NUMBER", value: "InfoUrl", width: 200 },
    { text: "REMARKS / COMMENTS", value: "remarksComments", width: 200 },
])

let items = ref([
]);







async function infoActivity1() {
    //Get All Info data from Database
    let response = await useFetch('/api/info')

    useForEach(response.data.value, function (n) {
        // console.log(n)
        n.formattedDateLetters = n. dateOfLetters ? new Date(n.dateOfLetters).toLocaleDateString('en-GB', { timeZone: 'UTC' }): 'N/A'
        n.formattedDateReceipt = n.dateOfReceipt ? new Date(n.dateOfReceipt).toLocaleDateString('en-GB', { timeZone: 'UTC' }): 'N/A'
    })

    // console.log(response.data)

    items.value = response.data.value

}

infoActivity1()

//Get All Info data from Database By Selected Date
let selectedDate = new Date().toISOString().split('T')[0]

// console.log(selectedDate)



async function infoActivity() {

    let response2 = await useFetch(`/api/info/index3/?selectedDate=${selectedDate}`, {
        method: "GET"
    })

    useForEach(response2.data.value, function (n) {
        // console.log(n)
        n.formattedDateLetters = new Date(n.dateOfLetters).toLocaleDateString('en-GB', { timeZone: 'UTC' })
        n.formattedDateReceipt = new Date(n.dateOfReceipt).toLocaleDateString('en-GB', { timeZone: 'UTC' })
    })


    items.value = response2.data.value

    console.log(response2.data.value)

}







</script>

<template>
    <!-- <Navbar /> -->
    <div class="grid grid-cols-8 gap-x-5 py-5 px-10 ">

        <div class="flex col-span-2">
            <label for="selectedDate" class="w-52 pt-2  mr-5  font-semibold ">Date Of Receipt</label>
            <input type="date" v-model="selectedDate" class="rounded-lg w-full p-2 border border-black"
                name="selectedDate" />
        </div>
        <div class="flex">
            <button
                class=" w-2/3 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 mr-2 border border-blue-500 rounded-lg"
                @click="infoActivity()">Retrieve Info</button>
            <button class=" bg-blue-600 hover:bg-blue-500 text-white font-bold py-2  border border-blue-500 rounded-lg"
                @click="infoActivity1()">
                <svg height="20px" width="40px" text-colour-white version="1.1" id="Capa_1"
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 303.597 303.597"
                xml:space="preserve" fill="#1566d1">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path style="fill:#fcfdfd;"
                        d="M57.866,268.881c25.982,19.891,56.887,30.403,89.369,30.402h0.002c6.545,0,13.176-0.44,19.707-1.308 c39.055-5.187,73.754-25.272,97.702-56.557c14.571-19.033,24.367-41.513,28.329-65.01c0.689-4.084-2.064-7.954-6.148-8.643 l-19.721-3.326c-1.964-0.33-3.974,0.131-5.595,1.284c-1.621,1.153-2.717,2.902-3.048,4.864 c-3.019,17.896-10.49,35.032-21.608,49.555c-18.266,23.861-44.73,39.181-74.521,43.137c-4.994,0.664-10.061,1-15.058,1 c-24.757,0-48.317-8.019-68.137-23.191c-23.86-18.266-39.18-44.73-43.136-74.519c-3.957-29.787,3.924-59.333,22.189-83.194 c21.441-28.007,54.051-44.069,89.469-44.069c24.886,0,48.484,7.996,68.245,23.122c6.55,5.014,12.43,10.615,17.626,16.754 l-36.934-6.52c-1.956-0.347-3.973,0.101-5.604,1.241c-1.631,1.141-2.739,2.882-3.085,4.841l-3.477,19.695 c-0.72,4.079,2.003,7.969,6.081,8.689l88.63,15.647c0.434,0.077,0.869,0.114,1.304,0.114c1.528,0,3.031-0.467,4.301-1.355 c1.63-1.141,2.739-2.882,3.084-4.841l15.646-88.63c0.721-4.079-2.002-7.969-6.081-8.69l-19.695-3.477 c-4.085-0.723-7.97,2.003-8.689,6.082l-6.585,37.3c-7.387-9.162-15.87-17.463-25.248-24.642 c-25.914-19.838-56.86-30.324-89.495-30.324c-46.423,0-89.171,21.063-117.284,57.787C6.454,93.385-3.878,132.123,1.309,171.178 C6.497,210.236,26.583,244.933,57.866,268.881z">
                    </path>
                </g>
            </svg>
            
            </button>
        </div>

    </div>

    <div class="flex  justify-center bg-gray-100 ">
        <div class="p-5 rounded-xl bg-white m-5 flex-1 text-center border shadow-2xl">
            <div>
                <h1 class="mb-5 text-2xl font-bold">Search DCR Info </h1>
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
                <EasyDataTable :headers="headers" :items="items" table-class-name="customize-table"  header-text-direction="center" :rows-per-page="10"
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

<style lang="scss" scoped>
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
}</style>