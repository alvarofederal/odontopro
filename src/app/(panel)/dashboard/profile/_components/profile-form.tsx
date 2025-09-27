import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"

const profileSchema = z.object({
    name: z.string().min(1, {message: "O nome é obrigatório"}),
    adress: z.string().optional() ,
    phone: z.string().optional(),
    status: z.string(),
    timeZone: z.string().min(1, {message: "O Time zone é obrigatório"}),
})

export type ProfileFormData = z.infer<typeof profileSchema>;

export function userProfileForm() {
    return useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            adress: "",
            phone: "",
            status: "Ativo",
            timeZone: "",
        }
    })
}
