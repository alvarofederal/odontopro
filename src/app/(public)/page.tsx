import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Professionals } from "./_components/professionals";
import { getProfessionals } from "./_data_access/get-professionals";

export const revalidate = 120; // revalidate this page every 60 seconds

export default async function Home() {

  const professionals = await getProfessionals();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
        <div>
          <Hero />
          <Professionals professionals={professionals || []} />
          <Footer />
        </div>
    </div>
  )
}