import { FaWhatsapp } from "react-icons/fa";

import { whatsappUrl } from "@/config/site";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp Restaurante El Lago"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-premium transition hover:-translate-y-1 hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-300/40"
    >
      <FaWhatsapp size={29} />
    </a>
  );
}
