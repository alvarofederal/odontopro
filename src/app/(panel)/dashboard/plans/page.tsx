import getSesion from '@/lib/getSession'
import { redirect } from "next/navigation"
import { GridPlans } from "./_components/grid-plans"


export default async function Plans() {
  const session = await getSesion()

  if (!session) {
    redirect("/")
  }

    return (
        <section>
            <div>
                <GridPlans />
            </div>            
        </section>
    )
}