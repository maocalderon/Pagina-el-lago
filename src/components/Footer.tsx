import { FaFacebookF, FaInstagram } from "react-icons/fa";

import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-lago-navy py-10 text-white">
      <div className="section-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-bold">© 2026 Restaurante El Lago</p>
          <p className="mt-2 text-sm leading-6 text-white/60">
            {siteConfig.addressLine1}, {siteConfig.addressLine2}
            <br />
            Teléfono: {siteConfig.phone}
          </p>
        </div>

        <div className="flex gap-3">
          <a
            href={siteConfig.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/20 text-white transition hover:bg-white/10"
          >
            <FaFacebookF size={17} />
          </a>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/20 text-white transition hover:bg-white/10"
          >
            <FaInstagram size={19} />
          </a>
        </div>
      </div>
    </footer>
  );
}
