
export type PlanDetailProps = {
    maxServices: number;
}

export type PlansProps = {
    BASIC: PlanDetailProps;
    PROFESSIONAL: PlanDetailProps;
}

export const PLANS: PlansProps = {
    BASIC: {
        maxServices: 3,
    },
    PROFESSIONAL: {
        maxServices: 50,    
    },
}

export const subscriptionPlans = [
    {
        id: 'BASIC',
        name: 'Básico',
        oldPrice: "R$ 97,90",
        price: "R$ 27,90",
        description: 'Plano gratuito para começar',
        features: [
            `Até ${PLANS["BASIC"].maxServices} serviços`,
            'Agendamentos ilimitados',
            'Suporte',
            'Relatórios',
        ]
    },    {
        id: 'PROFESSIONAL',
        name: 'Profissional',
        oldPrice: "R$ 197,90",
        price: "R$ 97,90",
        description: 'Plano avançado',
        features: [
            `Até ${PLANS["PROFESSIONAL"].maxServices} serviços`,
            'Agendamentos ilimitados',
            'Suporte',
            'Relatórios',
        ]
    }
]