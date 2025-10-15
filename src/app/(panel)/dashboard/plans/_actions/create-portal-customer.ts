"use server"

import { auth } from "@/lib/auth"
import { stripe } from "@/utils/stripe"
import prisma from "@/lib/prisma"

export async function createPortalCustomer(){
    const session = await auth()
    if (!session?.user?.id) {
        return {
            sessionId: "",
            error: "Usuário não encontrado"
        }
    }

    const user = await prisma.user.findFirst({
        where: {
            id: session?.user?.id
        }
    })

    if (!user) {
        return {
            sessionId: "",
            error: "Usuário não encontrado"
        }
    }

    const sessioId = user.stripeCustomerId
    if (!sessioId) {
        return {
            sessionId: "",
            error: "Usuário não encontrado"
        }
    }

    try {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: sessioId,
            return_url: process.env.STRIPE_SUCCESS_URL as string,
        })

        return {
            sessionId: portalSession.url,
        }
    } catch (error) {
        console.log("ERRO AO CRIAR PORTAL: ", error)
        return {
            sessionId: "",
            error: "Usuário não encontrado"
        }
    }
}