// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr:false,
 

  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
    
  },


 routeRules: {
    '/api/auth/**': {
        cors: true,
     },
},
  modules: ["@nuxtjs/tailwindcss", "nuxt-server-utils", "@sidebase/nuxt-auth","nuxt-lodash" ],

  build: {
    transpile: ['vue-toastification']
  },

  nuxtServerUtils: {
    mongodbUri: process.env.MONGODB_URI,
  },

  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: 'authjs'
    }
  }

});
