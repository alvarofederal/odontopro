
import { getReminders } from "../../_data_access/get-reminders"
import { ReminderList } from "./reminder-list"

export async function Reminders({userId}: {userId: string}){
    
    const reminders = await getReminders({userId: userId})

    console.log("Lembretes: ", reminders)
    
    return (
        <ReminderList reminder={reminders} />
    )
}