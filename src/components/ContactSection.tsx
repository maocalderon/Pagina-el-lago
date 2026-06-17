import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

import { siteConfig, whatsappUrl } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function ContactSection() {
  return (
    <section id="contacto" className="bg-lago-pearl py-20 sm:py-24 dark:bg-[#071827]">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Contacto"
            title="Hablemos de tu próxima visita"
            description="Reserva, pregunta por disponibilidad o comunícate directamente con el restaurante."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <Reveal>
            <a
              href={`tel:${siteConfig.phoneInternational}`}
              className="flex h-full items-center gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-premium dark:border-white/10 dark:bg-white/[0.07]"
            >
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-lago-ice text-lago-blue dark:bg-lago-aqua/10 dark:text-lago-aqua">
                <FiPhone size={24} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-500 dark:text-white/60">
                  Teléfono
                </span>
                <span className="mt-1 block text-xl font-bold text-lago-navy dark:text-white">
                  {siteConfig.phone}
                </span>
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.06}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-full items-center gap-5 rounded-lg border border-emerald-200 bg-emerald-50 p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-premium dark:border-emerald-300/20 dark:bg-emerald-400/10"
            >
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-emerald-500 text-white">
                <FaWhatsapp size={27} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-emerald-700 dark:text-emerald-100/75">
                  WhatsApp
                </span>
                <span className="mt-1 block text-xl font-bold text-emerald-800 dark:text-emerald-50">
                  {siteConfig.phone}
                </span>
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/[0.07]">
              <p className="text-sm font-semibold text-slate-500 dark:text-white/60">
                Redes Sociales
              </p>
              <div className="mt-4 flex gap-3">
                <a
                  href={siteConfig.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-lago-navy text-white transition hover:-translate-y-0.5 hover:bg-lago-blue"
                >
                  <FaFacebookF size={18} />
                </a>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-lago-blue text-white transition hover:-translate-y-0.5 hover:bg-lago-deep"
                >
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
