import { NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';
import { manageSubscription } from '@/utils/manage-subscription';
import { Plan } from '@/generated/prisma';
import { revalidatePath } from 'next/cache';


export async function POST(request: Request) {

    const signature = request.headers.get('stripe-signature');

    if(!signature) {
        return NextResponse.error();
    }

    console.log("WEBHOOK INICIANDO...");

    const text = await request.text();
    
    const event = stripe.webhooks.constructEvent(
        text, 
        signature, 
        process.env.STRIPE_SECRET_WEBHOOK_KEY as string,
    );

    switch(event.type) {
        case "customer.subscription.deleted": 
            const payment = event.data.object as Stripe.Subscription;

            // Ir ao banco de dados e deletar a assinatura do usuário
            await manageSubscription(
                payment.id,
                payment.customer.toString(),
                false,
                true
            );
            break;
        case 'customer.subscription.updated': 
            const paymentIntent = event.data.object as Stripe.Subscription;
            // Ir ao banco de dados e atualizar a assinatura do usuário
            await manageSubscription(
                paymentIntent.id,
                paymentIntent.customer.toString(),
                false,
            );

            revalidatePath('/dashboard/plans');

            break;
        case 'checkout.session.completed': 
            const checkoutSession = event.data.object as Stripe.Checkout.Session;
            // Ir ao banco de dados e ativar a assinatura do usuário
            const type = checkoutSession.metadata?.type ? checkoutSession?.metadata?.type : "BASIC";

            if(checkoutSession.subscription && checkoutSession.customer) {

                await manageSubscription(
                    checkoutSession.subscription?.toString(),
                    checkoutSession.customer?.toString(),
                    true,
                    false,
                    type as Plan
                );
            }

            revalidatePath('/dashboard/plans');

            break;
        default:
            console.log(`Evento não tratado: ${event.type}`);
            break;
    }

    return NextResponse.json({received: true});

}

