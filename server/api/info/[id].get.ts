import { Info } from "~/server/models/Info.modal";

export default defineEventHandler(async (event) =>{

    //Get ID from params
    const id = event.context.params?.id;


    //Update Info Record
    try{
        const info = await Info.findById(id);
        return info
    }catch (e){
        throw createError({
            message: "Record was not retrieved Bk",
        });
    }
});