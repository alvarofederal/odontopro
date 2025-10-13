"use server"

import { Plan } from '@/generated/prisma';
import { auth } from '@/lib/auth';

interface SubscriptionProps {
    type: Plan;
}

export async function createSubscription({type}: SubscriptionProps) {
    
    const session = await auth();
    const userId = session?.user?.id;

    if(!userId) {
        return {
            sessionId: "",
            error: "Falha ao ativar plano."
        }
    }

    console.log("SERVER ACTION: ATIVAR PLANO ",type);

    return {
        session: 123,
    }
}
