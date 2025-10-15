"use server"

import { Plan } from "@/generated/prisma"
import { PlansProps } from "@/utils/plans/index"

export interface PlansDetailInfo {
    maxServices: number;
}

const PLANS_LIMITS: PlansProps = {
    BASIC: {
        maxServices: 3,
    },
    PROFESSIONAL: {
        maxServices: 50,    
    },
}

export function getPlan(planId: Plan) {
    return PLANS_LIMITS[planId];
}


