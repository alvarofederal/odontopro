import { NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';
import { manageSubscription } from '@/utils/manage-subscription';


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
            console.log("CANCELAMENTO DE ASSINATURA", payment);
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
            console.log("ATUALIZAÇÃO DE ASSINATURA", paymentIntent);
            // Ir ao banco de dados e atualizar a assinatura do usuário
            await manageSubscription(
                paymentIntent.id,
                paymentIntent.customer.toString(),
                false,
                true
            );

            break;
        case 'checkout.session.completed': 
            const checkoutSession = event.data.object as Stripe.Checkout.Session;
            console.log("SESSÃO DE CHECKOUT COMPLETADA", checkoutSession);
            // Ir ao banco de dados e ativar a assinatura do usuário

            break;
        default:
            console.log(`Evento não tratado: ${event.type}`);
            break;
    }

    return NextResponse.json({received: true});

}

