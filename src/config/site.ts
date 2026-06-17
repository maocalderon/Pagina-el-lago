export const MENU_URL =
  process.env.NEXT_PUBLIC_MENU_URL || "/menu/carta-el-lago-final.pdf";

export const siteConfig = {
  name: "Restaurante El Lago",
  specialty: "Pescados y Mariscos",
  city: "Cúcuta, Norte de Santander, Colombia",
  addressLine1: "Urbanización La Primera",
  addressLine2: "Calle 8N #18E-35",
  addressFull:
    "Urbanización La Primera, Calle 8N #18E-35, Cúcuta, Norte de Santander",
  phone: "3506321235",
  phoneInternational: "+573506321235",
  instagram: "https://www.instagram.com/restauranteellago/",
  facebook: "https://www.facebook.com/ellagocucuta/",
  whatsappMessage:
    "Hola, deseo obtener información sobre Restaurante El Lago."
};

export const whatsappUrl = `https://wa.me/57${siteConfig.phone}?text=${encodeURIComponent(
  siteConfig.whatsappMessage
)}`;

export const mapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  siteConfig.addressFull
)}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  siteConfig.addressFull
)}&output=embed`;
