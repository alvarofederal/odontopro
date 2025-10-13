"use server"

import { Plan } from '@/generated/prisma';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { stripe } from '@/utils/stripe';

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
    
    const findUser = await prisma.user.findFirst({
        where: {
            id: userId
        }
    });

    if(!findUser) {
        return {
            sessionId: "",
            error: "Falha ao ativar plano."
        }
    }

    let customerId = findUser.stripeCustomerId;

    if(!customerId) {

        const stripeCostumer = await stripe.customers.create({
            email: findUser.email || undefined,
        });

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                stripeCustomerId: stripeCostumer.id
            }
        });

        customerId = stripeCostumer.id;
    }

    //CRIA CHECKOUT
    try {
        
        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ["card"],
            billing_address_collection: "required",
            line_items: [
                { price: type === "BASIC" ? process.env.STRIPE_PLAN_BASIC : process.env.STRIPE_PLAN_PRO,
                  quantity: 1,
                },
            ],
            metadata: { 
                type: type
            },
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL,
        })

        return {
            sessionId: stripeCheckoutSession.id,
            url: stripeCheckoutSession.url,
        }

    } catch (error) {
        console.log("ERROR AO CRIAR CHECKOUT")
        console.log(error);
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
