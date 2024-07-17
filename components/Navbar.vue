<script lang="ts" setup>

const { data, signOut } = useAuth();

async function handleLogout() {
    await signOut();

}


</script>

<template>
  <div class="sticky">
    <div class=" rounded-2xl" >
        <ul class="bg-teal-800">
            <li class="ml-10"><a href="/">Home</a></li>
            <li class="ml-10"><a href="viewInfoUpdate">Updated Records</a></li>
            <div class="flex  bg-teal-800 justify-end mr-5">
                <div>
                    <h1 class="text-white text-base font-bold pt-4 mr-10">
                        Welcome: {{ (data?.user as any)?.username.toUpperCase().split(".")[0] + " " + (data?.user as
                            any)?.username.toUpperCase().split(".")[1] }}</h1>
                </div>
                <button type="button"
                    class="bg-red-500 hover:bg-red-600 transition-all duration-200 text-red-50 rounded-lg py-2 px-5 mt-2 mb-2
                    hover:translate-1 hover:scale-110"
                    @click="handleLogout">
                    Logout
                </button>
            </div>
        </ul>
    </div>
    <div class="grid grid-cols-12 bg-teal-600">
        <div class="col-span-11">
        <h1 class="text-3xl bold font-bold mt-5">Digital Correspondence Register </h1></div>

        <div class="">
        <button class="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2 mt-4 mr-5
    hover:translate-1 hover:scale-110  duration-200">
            <NuxtLink to="/createInfo">Add-Record</NuxtLink>
        </button>
        </div>

    </div>
    </div>
</template>

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
}

.content {
  max-width: 500px;
  margin: auto;
}
</style>