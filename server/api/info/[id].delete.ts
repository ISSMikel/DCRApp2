import { Info } from "~/server/models/Info.modal";

export default defineEventHandler(async (event) =>{
    //Get data from body
    
    const body = await readBody(event);

    //Get ID from params
    const id = event.context.params?.id;

    //Update Info Record
    try{
        const info = await Info.findByIdAndDelete(id, body);
        return info
    }catch (e){
        throw createError({
            message: "Record was not deleted Bk",
        });
    }
});