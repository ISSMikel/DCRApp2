import { Info } from "~/server/models/Info.modal";

export default defineEventHandler(async (event) => {

    const query = getQuery(event);

    console.log(query)

    // const tempToday = new Date(query.selectedDate)


    // var tomorrow = new Date(tempToday.setDate(tempToday.getDate() + 1))

    // console.log(tomorrow)

    try {

        const info = await Info.find(
            {
                "dateOfReceipt": new Date(query.selectedDate)
                // "dateOfLetter": { $gt: new Date(query.selectedDate), $lt: new Date(tomorrow) }

            })

        return info
    } catch (e) {
        console.log(e);
    }
});

