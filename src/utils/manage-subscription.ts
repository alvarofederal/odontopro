import { Plan } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { stripe } from "@/utils/stripe";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";

/*
*Salvar, atualizar e deletar informações das assinaturas (subscription) no banco de dados, sincronizando com o Stripe
*
* @async
* @function manageSubscription
* @param {string} stripeCustomerId - ID do cliente no Stripe
* @param {string} customerId - ID do cliente no sistema
* @param {string} subscriptionId - ID da assinatura no Stripe
* @param {boolean} createAction - Indica se é uma ação de criação de assinatura
* @param {boolean} deleteAction - Indica se é uma ação de deleção de assinatura
* @param {Plan} [type] - Tipo de plano (necessário para criação)
* @returns {Promise<void>}
*/

export async function manageSubscription(
    subscriptionId: string,
    customerId: string,
    createAction: boolean = false,
    deleteAction: boolean = false,
    type?: Plan,

) {

    const findUser = await prisma.user.findFirst({
        where: {
            stripeCustomerId: customerId
        }
    });

    if(!findUser) {
        return Response.json({error: "Falha ao realizar assinatura"}, {status: 400});
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const subscriptionData = {
        id: subscription.id,
        userId: findUser.id,
        status: subscription.status,
        priceId: subscription.items.data[0].price.id,
        plan: type ?? "BASIC",
    }

    if(subscriptionId && deleteAction) {
        await prisma.subscription.delete({
            where: {
                id: subscriptionId,
            }
        });

        return;
    }

    if(createAction) {
        try {
            await prisma.subscription.create({
                data: subscriptionData
            });  
        } catch (error) {
            console.log("ERRO AO SALVAR A ASSINATURA NO BANCO DE DADOS");
            console.log(error);
        }

    } else {
        try {
            const findSubscription = await prisma.subscription.findFirst({
                where: {
                    id: subscriptionId
                }
            });
            
            if(!findSubscription) {
                console.log("ASSINATURA NÃO ENCONTRADA NO BANCO DE DADOS");
                return;
            }

            await prisma.subscription.update({
                where: {
                    id: findSubscription.id
                },
                data: {
                    status: subscription.status,
                    priceId: subscription.items.data[0].price.id,
                }
            });

        } catch (error) {
            console.log("ERRO AO ATUALIZAR A ASSINATURA NO BANCO DE DADOS");
        }
    }

}