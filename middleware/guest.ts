export default defineNuxtRouteMiddleware((to, from) => {

    const {status} = useAuth();

    // console.log(status.value)

    if(status.value === 'authenticated'){

        return navigateTo({
            name:"index"
        });
    }
});