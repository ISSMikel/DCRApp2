import { Info } from "~/server/models/Info.modal";

export default defineEventHandler(async () =>{

    //Get Info Record
    try{
        const info = await Info.find();
        return info

    }catch (error){
     console.log(error)
}  
});