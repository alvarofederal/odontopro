"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { Prisma } from "@/generated/prisma"
import { Button } from "@/components/ui/button"
import { Eye, X } from "lucide-react"
import { cancelAppointment } from "../../_actions/cancel-appointment"
import { toast } from "sonner"

type AppointmentWithService = Prisma.ApointmentGetPayload<{
    include: { 
        service: true 
    }
}>


interface AppointmentsListProps {
    times: string[]
}

export function AppointmentsList({ times }: AppointmentsListProps) {

    const searchParams = useSearchParams()
    const date = searchParams.get("date") || ""
    const queryClient = useQueryClient()


    const { data, isLoading, refetch } = useQuery({
        queryKey: ["get-appointments", date],
        queryFn: async () => {
            let activeDate = date;
            if (!activeDate) {
                const today = format(new Date(), 'yyyy-MM-dd');
                activeDate = today;
            }

            const url = `${process.env.NEXT_PUBLIC_URL}/api/clinic/appointments?date=${activeDate}`
            const response = await fetch(url)

            const json = await response.json() as AppointmentWithService[]

            if (!response?.ok) {
                return []
            }

            console.log(json)

            return json;
        },
        staleTime: 20000, // 20 segundos
        refetchInterval: 60000, // 1 minuto
    })

    // Montar occupantMap slot > appointment
    // Se um Appointment começa no time (15:00) e tem requiredSlots 2
    // occupantMap[15:00, appointment], occupantMap[15:30, appointment]
    // Depois, ao renderizar, se o slot tiver appointment, mostrar os dados do appointment
    // Se não tiver, mostrar como disponível 

    const occupantMap: Record<string, AppointmentWithService> = {}

    if (data && data.length > 0) {
        for (const appointment of data) {

            const requiredSlots = Math.ceil(appointment.service.duration / 30);

            const startIndex = times.lastIndexOf(appointment.time);
            
            if (startIndex !== -1) {
                for (let i = 0; i < requiredSlots; i++) {

                    const slotIndex = startIndex + i;

                    if (slotIndex < times.length) {
                        occupantMap[times[slotIndex]] = appointment
                    }
                }
            }
        }   
    }

    async function handleAppointmentDelete(appointmentId: string) {
        const response = await cancelAppointment({ appointmentId: appointmentId })
        if (response.error) {
            toast.error(response.error)
            return;
        }

        queryClient.invalidateQueries({
            queryKey: ["get-appointments", date]
        })
        refetch()
        toast.success(response.data)

    }
    
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
                        {isLoading ? (
                            <p className="text-sm text-gray-500">Carregando agenda...</p>
                        ) : (
                         times.map((slot) => {

                            const occupant = occupantMap[slot]

                            if (occupant) {
                                return (
                                    <div key={slot} className="flex items-center py-2 border-t last:border-b">
                                        <div className="w-16 text-sm font-semibold">{slot}</div>
                                        <div>
                                            <p className="font-medium">Paciente: {occupant.name}</p> 
                                            <p className="text-sm text-gray-500">Procedimento: {occupant.service.name}</p>
                                            <p className="text-sm text-gray-500">Contato: {occupant.phone} </p>
                                        </div>
                                        <div className="ml-auto">
                                            <div className="flex">
                                                <Button 
                                                    variant="ghost"
                                                    size="icon">
                                                    <Eye className="w-4 h-4"/>
                                                </Button>
                                                <Button 
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleAppointmentDelete(occupant.id)}>
                                                    <X className="w-4 h-4"/>
                                                </Button>
                                            </div>
                                        </div> 
                                    </div>  
                                )
                            }

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
                        })   
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}