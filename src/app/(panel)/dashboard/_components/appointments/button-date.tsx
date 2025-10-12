import { ChangeEvent, useState } from "react"
import { format } from "date-fns"
import { useRouter, useSearchParams } from "next/navigation"


export function ButtonPickerAppointment() {

    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'))
    const searchParams = useSearchParams()
    const date = searchParams.get("date") || "" || format(new Date(), 'yyyy-MM-dd')
    const router = useRouter()

    function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
        const newDate = e.target.value
        setSelectedDate(newDate)
        router.push(`/panel/dashboard/appointments?date=${newDate}`)
    }

    console.log({date, selectedDate})
    return (
        <input type="date" 
            id="start"
            className="border-2 px-2 py-1 rounded-md text-sm md:text-base"
            value={date}
            onChange={(e) => {handleDateChange}} />
    )
}