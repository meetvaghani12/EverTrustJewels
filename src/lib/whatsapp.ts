import { WHATSAPP_NUMBER } from "./constants";
import { Diamond } from "@/types/diamond";

export function getWhatsAppLink(diamond?: Diamond): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!diamond) {
    return `${base}?text=${encodeURIComponent("Hi, I'm interested in your diamond collection. Could you help me?")}`;
  }
  const message = `Hi, I'm interested in the ${diamond.title} (ID: ${diamond.id}). Could you share more details and pricing?`;
  return `${base}?text=${encodeURIComponent(message)}`;
}
