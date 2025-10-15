"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Subscription } from "@/generated/prisma";
import { subscriptionPlans } from "@/utils/plans";
import { createPortalCustomer } from "../_actions/create-portal-customer";
import { toast } from "sonner";

interface SubscriptionDetailProps {
  subscription: Subscription;
}

export function SubscriptionDetail({ subscription }: SubscriptionDetailProps) {

    const subscriptionInfo = subscriptionPlans.find(plan => plan.id === subscription.plan);

    async function handleManageSubscription() {
        const portal = await createPortalCustomer();

        if (portal.error) {
            toast.error("Ocorreu um erro ao criar o portal de assinatura");
            return;
        }

        window.location.href = portal.sessionId;
    }
    
    return (
        <Card className="w-full mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">Seu Plano Atual</CardTitle>
                <CardDescription>
                    Sua assinatura está <strong>ATIVA</strong>.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg md:text-xl">
                        {subscription.plan === "BASIC" ? "BASIC":"PROFISSIONAL"}
                    </h3>

                    <div className="bg-green-500 text-white w-fit px-4 py-1 rounded-md">
                        {subscription.status === "active" ? "ATIVO":"INATIVO"}
                    </div>
                </div>

                <ul className="list-disc list-inside space-y-2">
                    {subscriptionInfo && subscriptionInfo?.features.map((feature, index) => (
                        <li key={index} className="text-sm md:text-base mt-2">
                            {feature}
                        </li>
                    ))}
                </ul>

                <CardFooter className="mt-4">
                    <Button 
                        className="bg-black rounded-md"
                        onClick={handleManageSubscription}>
                        Gerenciar Assinatura
                    </Button>
                </CardFooter>
            </CardContent>

        </Card>
    );
}