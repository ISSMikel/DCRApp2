import { Info } from "~/server/models/Info.modal";

export default defineEventHandler(async () =>{

    //Get Info Record
    try{
        const info = await Info.find().sort({createdAt: -1});
        return info

    }catch (error){
     console.log(error)
}  
});