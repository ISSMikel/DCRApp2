import { Info } from "~/server/models/Info.modal";


export default defineEventHandler(async (event) => {
    //Get data from body
    const body = await readBody(event);


    //Create Info Record 
    try{
        await Info.create(body);
        return {message:"Info Record Created Bk"};
    }catch (e){
        throw createError({
            message: "Record was not created Bk",
        });
    }
})