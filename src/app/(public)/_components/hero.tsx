import { Button } from "@/components/ui/button";
import Image from "next/image";
import doctorImg from '../../../../public/doctor-hero.png';

export function Hero() {
  return (
    <section className="bg-white">
        <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
            <main className="flex items-center justify-center">
                <article className="flex-[2] max-w-3xl space-y-8 flex flex-col justify-center">
                    <h1 className="text-4xl lg:6x1 font-bold max-w-2xl tracking-tight">
                        Encontre os melhores profissionais em um único lugar!
                    </h1>
                    <p className="text-base md:text-lg text-gray-600">
                        Nós somos uma plataforma para profissionais da saúde com foco em agilizar seu atendimento de forma simplificada e organizada.
                    </p>

                    <Button className="bg-emerald-500 hover:bg-emerald-400 w-fit px-6 font-semibold">
                        Encontre uma clínica
                    </Button>
                </article>

                <div className="hidden lg:block">
                    <Image 
                        src={doctorImg} 
                        alt="Foto ilustrativa de um dentista"
                        width={340}
                        height={400}
                        quality={100}
                        priority
                        className="object-contain"
                    />
                </div>
            </main>
        </div>
    </section>
  );
}