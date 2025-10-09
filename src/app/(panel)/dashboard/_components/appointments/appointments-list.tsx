"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"

interface AppointmentsListProps {
    times: string[]
}

export function AppointmentsList({ times }: AppointmentsListProps) {

    const searchParams = useSearchParams()
    const date = searchParams.get("date") || ""

    const {} = useQuery({
        queryKey: ["get-appointments", date],
        queryFn: async () => {
            let activeDate = date;
            if (!activeDate) {
                const today = format(new Date(), 'yyyy-MM-dd');
                activeDate = today;
            }

            const url = `${process.env.NEXT_PUBLIC_URL}/api/clinic/appointments?date=${activeDate}`
            const response = await fetch(url)

            const json = await response.json()

            if (!response?.ok) {
                return []
            }

            console.log(json)

            return json;
        }
    })
    



    return (
        <Card >
            <CardHeader className="flex flex-row items-center justify-between space-y-4 pb-4">
                <CardTitle className="text-xl md:text-2xl font-bold">
                    Agedamentos
                </CardTitle>    
                <button>SELECIONAR DATA</button>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[calc(100vh-20rem)] lg:h-[calc(100vh-15rem)] pr-4">
                    <div className="space-y-2">
                        {times.length === 0 && (
                            <p className="text-sm text-gray-500">Nenhum agendamento encontrado.</p> 
                        )}
                        {times.map((slot) => {
                            return (
                                <div key={slot} className="flex items-center py-2 border-t last:border-b">
                                    <div key={slot} className="w-16 text-sm font-semibold">  
                                        {slot} 
                                    </div>
                                    <div>
                                        Disponível
                                    </div>
                                </div>                            
                            )
                        })}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}