
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from "@/components/ui/card"
import { subscriptionPlans } from "@/utils/plans/index"

export function GridPlans() {
    return (
        <article>

            {subscriptionPlans.map((plan, index) => (
                <Card key={plan.id} className="flex flex-col w-full mx-auto">
                    {index === 1 && (
                            <div className="bg-emerald-500 w-full py-6 text-center rounded-t-xl">
                                <p className="font-semibold text-white">PROMOÇÃO EXCLUSIVA</p>
                            </div>
                        )
                    }
                    <CardHeader>
                        <CardTitle>{plan.name}</CardTitle>   
                        <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="mb-4 space-y-2">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="text-sm text-gray-700">• {feature}</li>
                            ))}
                        </ul>
                        <button className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Assinar Plano</button>
                    </CardContent>
                </Card>
            ))}
                
        </article>
    )
}