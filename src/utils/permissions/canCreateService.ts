"use server"

import { Subscription } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { Session } from "next-auth";
import { getPlan } from "./get-plans";
import { PLANS } from "../plans";

export async function canCreateService(subscription: Subscription | null, session: Session | null) {
    try {
        const serviceCount = await prisma.service.count({
            where: {
                userId: session?.user?.id,
            }
        });
        if (subscription && subscription.status === "active") {
            const plan = subscription.plan;
            const planLimits = await getPlan(plan);

            return {
                hasPermission: planLimits.maxServices ===null || serviceCount < planLimits.maxServices,
                planId: "EXPIRED",
                expired: false,
                plan: PLANS[subscription.plan],
            };
        }

        
    } catch (error) {
        
    }

    return true;
}