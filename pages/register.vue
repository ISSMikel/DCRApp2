<script lang="ts" setup>

const form = ref({
  email: '',
  username: '',
  password: '',
});

//Don't allow user to send request mutiple times
const isLoading = ref(false)

//Send form data to database
async function handleFormSubmit() {
  try {
    isLoading.value = true
    await useFetch("/api/auth/register", {
      method: "POST",
      body: form.value,

    });

    useRouter().push({
      name:"login"
    });

    // console.log(form.value)
  } catch (e:any) {
    console.log(e)
  } finally{
    isLoading.value = false
  }
}
</script>

<template>
  <div class="h-[80vh] flex items-center justify-center bg-gray-100">
    <div
      class="p-5 rounded-xl bg-white max-w-2xl flex-1 text-center border shadow-2xl"
    >
  <div>
    <h1 class="mb-4 text-xl font-bold">Register</h1>
    <form @submit.prevent="handleFormSubmit">
      <input v-model="form.email" class="w-full border p-2 rounded-lg mb-4" type="email" placeholder="Email" />
      <input v-model="form.username" class="w-full border p-2 rounded-lg mb-4" type="text" placeholder="FirstName.Lastname" />
      <input v-model="form.password" class="w-full border p-2 rounded-lg mb-4" type="password" placeholder="Password" />
      <button type="submit"
        :disabled="isLoading"
        class="bg-blue-500 hover:bg-blue-600 transition-all duration-200 w-full text-blue-50 rounded-lg p-2"
        :class="{
          'opcatiy-20 cursor-not-allowed': isLoading,
        }">
        Register
      </button>
    </form>
  </div>
  </div>
  </div>
</template>

<style></style>
