import React from 'react'

type FooterProps = {
  className?: string
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-[#E5E5E3] ${className}`}>
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Top grid */}
        <div className="grid gap-16 md:grid-cols-3">
          {/* BRAND */}
          <div className="max-w-sm">
            <h3 className="mb-6 font-serif text-4xl tracking-wide text-black">DORIANTE</h3>

            <p className="mb-10 text-base leading-7 text-black/80">
              An art hotel experience on the shores of Lago d&apos;Orta, where elegance and
              creativity inspire slow living.
            </p>

            <address className="not-italic text-base font-semibold leading-7 text-black">
              Via del Lago, 12
              <br />
              28016 Orta San Giulio,
              <br />
              Italy
            </address>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="mb-6 text-lg font-semibold text-black">Contact</h4>

            <ul className="space-y-4 text-base text-black/80">
              <li>
                <a href="tel:+390322905678" className="hover:text-black transition">
                  +39 0322 90 5678
                </a>
              </li>
              <li>
                <a href="mailto:welcome@doriante.it" className="hover:text-black transition">
                  welcome@doriante.it
                </a>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="mb-6 text-lg font-semibold text-black">Follow Us</h4>

            <div className="flex items-center gap-6 text-black">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="hover:opacity-70 transition">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
                </svg>
              </a>

              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="hover:opacity-70 transition">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.7-1.6 1.5V12H16l-.5 3h-2.1v7A10 10 0 0022 12z" />
                </svg>
              </a>

              {/* TikTok */}
              <a href="#" aria-label="TikTok" className="hover:opacity-70 transition">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 1c.6 3.2 2.7 5.3 5.5 5.5v3.1c-1.9.1-3.7-.6-5.5-1.7V15c0 3.7-3 6.8-6.8 6.8S3 18.7 3 15.1 6 8.3 9.8 8.3c.4 0 .8 0 1.2.1v3.4c-.4-.1-.8-.2-1.2-.2-1.9 0-3.4 1.6-3.4 3.5s1.5 3.5 3.4 3.5 3.4-1.6 3.4-3.5V1h3.3z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="hover:opacity-70 transition">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5a2.5 2.5 0 11.02 5 2.5 2.5 0 01-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-24 text-center text-base font-semibold text-black">
          © 2025 Doriante Art Hotel. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
