<script lang="ts" setup>

definePageMeta({
  layout: 'login-page',
  middleware: "guest",
});

const form = ref({
  username: '',
  password: '',
});

const { signIn } = useAuth();

async function handleLogin() {
  try {
    await signIn("credentials", form.value);
    useRouter().push({
      name: "index",
    })
  } catch (e) { }

}

</script>
<template>
  <div class="h-[80vh] flex items-center justify-center">

    <div class="p-5 rounded-xl bg-white max-w-2xl flex-1 text-center border shadow-2xl">
      <div>
        <h1 class="text-3xl bold font-bold mt-5 mb-10">Digital Correspondence Register </h1>
      </div>
      <div>
        <h1 class="mb-4 text-xl font-bold">Login</h1>
        <form @submit.prevent="handleLogin">
          <input v-model="form.username" class="w-full border p-2 rounded-lg mb-4" type="text" placeholder="Firstname.Lastname" />
          <input v-model="form.password" class="w-full border p-2 rounded-lg mb-4" type="password"
            placeholder="Password" />
          <button type="submit"
            class="bg-blue-500 hover:bg-blue-600 transition-all duration-200 w-1/2 text-blue-50 rounded-lg p-2">
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
body {
  background-color: rgb(228, 238, 241);
}
</style>
