import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AppointmentWithService } from "./appointments-list";
import { formatCurrency } from "@/utils/formatCurrency";
import { format } from "date-fns";

interface DialogAppointmentProps {
    appointment: AppointmentWithService | null
}

export function DialogAppointment({ appointment }: DialogAppointmentProps) {

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Detalhes do agendamento
                </DialogTitle>
                <DialogDescription>
                    Veja todos os detalhes do agendamento
                </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
                {appointment &&  (
                    <article >
                        <p><span className="font-semibold">Data/Hora do agendamento: </span>{new Intl.DateTimeFormat('pt-BR', {
                            timeZone: 'UTC',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        }).format(new Date(appointment.apointmentDate))} - {appointment.time}</p>
                        <p className="mb-2"><span className="font-semibold">Paciente: </span>{appointment.name}</p>

                        <section className="bg-gray-100 mt-4 p-2 rounded-md">
                            <p><span className="font-semibold">Serviço: </span> {appointment.service.name}</p>
                            <p><span className="font-semibold">Valor da consulta: </span>{formatCurrency(appointment.service.price / 100)}</p>
                        </section>
                        
                        <section className="bg-gray-100 mt-4 p-2 rounded-md">
                            <h1 className="font-bold"><strong>Contatos do paciente</strong></h1>
                            <p><span className="font-semibold">Telefone:</span> {appointment.phone}</p>
                            <p><span className="font-semibold">E-mail:</span> {appointment.email}</p>
                        </section>
                    </article>   
                )}
            </div>
        </DialogContent>
    )
}