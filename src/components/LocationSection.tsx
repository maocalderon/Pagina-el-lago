import { FiMapPin, FiNavigation } from "react-icons/fi";

import { mapsDirectionsUrl, mapsEmbedUrl, siteConfig } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function LocationSection() {
  return (
    <section className="bg-white py-20 sm:py-24 dark:bg-[#06111f]">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Ubicación"
            title="Estamos en Urbanización La Primera"
            description="Encuentra Restaurante El Lago en Cúcuta, Norte de Santander."
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-lg bg-lago-radial p-7 text-white shadow-premium">
              <div>
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-md bg-white/10 text-lago-aqua">
                  <FiMapPin size={25} />
                </div>
                <h3 className="text-2xl font-bold">Dirección</h3>
                <p className="mt-4 text-lg leading-8 text-white/80">
                  {siteConfig.addressLine1}
                  <br />
                  {siteConfig.addressLine2}
                  <br />
                  {siteConfig.city}
                </p>
              </div>

              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="primary-button mt-8 bg-white text-lago-navy hover:bg-lago-aqua hover:text-lago-navy"
              >
                <FiNavigation size={18} />
                Cómo Llegar
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="min-h-[380px] overflow-hidden rounded-lg border border-slate-200 shadow-premium dark:border-white/10">
              <iframe
                title="Mapa de Restaurante El Lago"
                src={mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[380px] w-full"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
