import { FaFish, FaHandsHelping, FaUsers } from "react-icons/fa";
import type { IconType } from "react-icons";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const values: Array<{
  icon: IconType;
  title: string;
  description: string;
}> = [
  {
    icon: FaFish,
    title: "Especialidad marina",
    description:
      "Una propuesta centrada en pescados y mariscos frescos, preparada con criterio y cuidado."
  },
  {
    icon: FaHandsHelping,
    title: "Servicio cercano",
    description:
      "Atención amable, precisa y pensada para que cada visita se sienta especial."
  },
  {
    icon: FaUsers,
    title: "Ambiente familiar",
    description:
      "Un lugar ideal para compartir celebraciones, almuerzos y encuentros en Cúcuta."
  }
];

export function AboutSection() {
  return (
    <section id="nosotros" className="bg-lago-pearl py-20 sm:py-24 dark:bg-[#071827]">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Sobre Nosotros"
            title="Tradición, frescura y hospitalidad junto a la mesa"
            description="Restaurante El Lago es un restaurante reconocido en Cúcuta por su especialidad en pescados y mariscos frescos. Nuestro compromiso es brindar una experiencia gastronómica excepcional, combinando ingredientes de calidad, excelente servicio y un ambiente ideal para compartir en familia."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <Reveal key={value.title} delay={index * 0.08}>
                <article className="h-full rounded-lg border border-slate-200 bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-premium dark:border-white/10 dark:bg-white/[0.07]">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-md bg-lago-ice text-lago-blue dark:bg-lago-aqua/10 dark:text-lago-aqua">
                    <Icon size={25} />
                  </div>
                  <h3 className="text-xl font-bold text-lago-navy dark:text-white">
                    {value.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600 dark:text-white/70">
                    {value.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
