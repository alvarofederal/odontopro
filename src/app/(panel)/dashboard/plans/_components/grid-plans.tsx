
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { subscriptionPlans } from '@/utils/plans/index'

export function GridPlans() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
      {subscriptionPlans.map((plan, index) => (
        <Card key={plan.id}className={`border-2 border-primary ${index === 1 && "border-emerald-500"}`}>
            <CardHeader>
                <CardTitle className="text-2xl">{plan.name} {index === 1 && (<span className="font-semibold text-emerald-500">(RECOMENDADO)</span>)}</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/mês</span>
                </div>
                <ul className="mt-4 space-y-2">
                    {plan.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">• {feature}</li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                {index === 1 ? (
                    <Button className='w-full bg-emerald-500' >
                        Ativar assinatura
                    </Button>
                ):(
                    <Button className='w-full bg-black' >
                        Ativar assinatura
                    </Button>
                )}
            </CardFooter>
        </Card>
      ))}
    </section>
  )
}