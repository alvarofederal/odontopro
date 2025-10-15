import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface UseProfileFormProps {
  name: string | null;
  address: string | null;
  phone: string | null;
  status: boolean;
  timeZone: string | null;
}

const profileSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }).max(100, { message: "O nome deve ter no máximo 100 caracteres" }),
  address: z.string().max(200, { message: "O endereço deve ter no máximo 200 caracteres" }).optional(),
  phone: z.string().max(11, { message: "O telefone deve ter no máximo 11 caracteres" }).optional(),
  status: z.string(),
  timeZone: z.string().min(1, { message: "O time zone é obrigatório" }),
})

export type ProfileFormData = z.infer<typeof profileSchema>;

export function useProfileForm({ name, address, phone, status, timeZone }: UseProfileFormProps) {
  return useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: name || "",
      address: address || "",
      phone: phone || "",
      status: status ? "active" : "inactive",
      timeZone: timeZone || ""
    }
  })
}