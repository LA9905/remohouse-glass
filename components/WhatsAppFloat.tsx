const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '+56992624600'
const DEFAULT_MSG = encodeURIComponent('¡Hola! Quiero cotizar un espejo a medida. 🙌')

export default function WhatsAppFloat() {
  const href = `https://wa.me/${encodeURIComponent(PHONE)}?text=${DEFAULT_MSG}`
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="whatsapp-float"
      title="Escríbenos por WhatsApp"
    >
      {/* Icono WhatsApp (inline) */}
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" className="text-white">
        <path fill="currentColor" d="M19.1 17.4c-.3-.1-1.7-.8-1.9-.9s-.4-.1-.6.1c-.2.3-.7.9-.8 1-.1.1-.3.1-.5 0-1-.4-1.9-1-2.6-1.8-.2-.2-.3-.4 0-.7s.6-.7.7-.9c.1-.2.1-.3 0-.5s-.5-1.3-.7-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.7.7-1.1 1.6-1.1 2.6 0 .9.3 1.8.9 2.6 1 1.4 2.4 2.5 4.1 3.1.5.2 1 .3 1.5.4.6.1 1.1.1 1.5.1.5 0 1-.3 1.4-.7.4-.5.6-1.1.6-1.7c0-.1 0-.2-.2-.2z"/>
        <path fill="currentColor" d="M27 5a13 13 0 0 0-20 15.3L5 27l6.9-1.8A13 13 0 1 0 27 5zm-1.9 19.1A10.9 10.9 0 1 1 25.1 7a10.9 10.9 0 0 1 0 17.1z"/>
      </svg>
    </a>
  )
}