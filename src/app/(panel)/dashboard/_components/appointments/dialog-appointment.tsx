import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AppointmentWithService } from "./appointments-list";


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
                        <p><strong>Cliente:</strong> {appointment.name}</p>
                        <p><strong>Serviço:</strong> {appointment.service.name}</p>
                        <p><strong>Valor:</strong> {appointment.service.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        <p><strong>Telefone:</strong> {appointment.phone}</p>

                        <p><strong>Data:</strong> {new Date(appointment.apointmentDate).toLocaleDateString()}</p>
                    </article>   
                )}
            </div>
        </DialogContent>
    )
}