"use server"

import { auth } from "@/lib/auth";
import { PlansDetailInfo } from "./get-plans";
import prisma from "@/lib/prisma";

// BASIC - PROFESSIONAL - EXPIRED - TRIAL < 3 DIAS

export type PLAN_PROP = "BASIC" | "PROFESSIONAL" | "EXPIRED" | "TRIAL";

interface ResultPermissionProp {
    hasPermission: boolean;
    planId: PLAN_PROP;
    expirado: boolean;
    plan: PlansDetailInfo | null;
}

interface CanPlanPermissions {
    type: string;
}

export async function canPermission({ type }: CanPlanPermissions): Promise<ResultPermissionProp> {
    const session = await auth();

    if (!session?.user?.id) {
        return {
            hasPermission: false,
            planId: "EXPIRED",
            expirado: true,
            plan: null
        }
    }
    const subscription = prisma.subscription.findFirst({
        where: {
            userId: session?.user?.id,
        }
    });

    switch (type) {
        case "services": 

            return {
                hasPermission: false,
                planId: "EXPIRED",
                expirado: true,
                plan: null
            }
        
        default:
            return {
                hasPermission: false,
                planId: "EXPIRED",
                expirado: true,
                plan: null
            }
    }
    
}