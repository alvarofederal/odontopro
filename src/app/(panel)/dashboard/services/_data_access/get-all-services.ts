"use server"

import prisma from "@/lib/prisma"
import { toast } from "sonner"

export async function getAllServices({ userId }: { userId: string }) {
    if (!userId) {
        return toast.error("Falha ao buscar serviços.")
    }

    try {
        const services = await prisma.service.findMany({
            where: {
                userId: userId,
                status: true
            }
        })

        return {
            data: services
        }
    } catch (error) {
        return toast.error("Falha ao buscar serviços.")
    }
}
