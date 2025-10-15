import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'

const formSchema = z.object({
  name: z.string().min(1, { message: "O nome do serviço é obrigatório" }).max(100, { message: "O nome do serviço deve ter no máximo 50 caracteres" }),
  price: z.string().min(1, { message: "O preço do serviço é obrigatório" }).max(8, { message: "O preço do serviço deve ter no máximo 8 caracteres" }),
  hours: z.string().max(1, { message: "O campo horas deve ter no máximo 1 caracteres" }),
  minutes: z.string().max(2, { message: "O campo minutos deve ter no máximo 2 caracteres" }),
})

export interface UseDialogServiceFormProps {
  initialValues?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  }
}

export type DialogServiceFormData = z.infer<typeof formSchema>;

export function useDialogServiceForm({ initialValues }: UseDialogServiceFormProps) {
  return useForm<DialogServiceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: "",
      price: "",
      hours: "",
      minutes: ""
    }
  })
}