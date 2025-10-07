
import { getReminders } from "../../_data_access/get-reminders"

export async function Reminders({userId}: {userId: string}){
    
    const reminders = await getReminders({userId: userId})

    console.log("Lembretes: ", reminders)
    
    return (

        <div>LEMBRETES</div>
    )
}