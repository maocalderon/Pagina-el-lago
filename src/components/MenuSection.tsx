import { FiExternalLink, FiFileText } from "react-icons/fi";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { MENU_URL } from "@/config/site";

export function MenuSection() {
  return (
    <section id="menu" className="bg-white py-20 sm:py-24 dark:bg-[#06111f]">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Menú Digital"
            title="Carta oficial de Restaurante El Lago"
            description="Consulta nuestra carta en PDF con la propuesta gastronómica del restaurante, manteniendo la página principal limpia y enfocada en la experiencia."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center rounded-lg border border-slate-200 bg-lago-pearl p-7 text-center shadow-premium sm:p-10 dark:border-white/10 dark:bg-white/[0.06]">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-md bg-lago-ice text-lago-blue dark:bg-lago-aqua/10 dark:text-lago-aqua">
              <FiFileText size={31} />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-lago-navy dark:text-white">
              Menú en PDF
            </h3>
            <p className="mt-3 max-w-xl leading-7 text-slate-600 dark:text-white/70">
              La carta se mantiene en un archivo independiente para que puedas
              actualizarla fácilmente sin cargar platos dentro de la página
              principal.
            </p>
            <a
              href={MENU_URL}
              target="_blank"
              rel="noreferrer"
              className="primary-button mt-7"
            >
              <FiExternalLink size={18} />
              Ver Menú
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
