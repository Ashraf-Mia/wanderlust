import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Input } from "@/components/ui/input"

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/bookings", label: "My Bookings" },
  { href: "/profile", label: "My Profile" },
] as const

const supportLinks = [
  { href: "/help", label: "Help Center" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
] as const

const socialLinks = [
  { label: "X (formerly Twitter)", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
] as const

const iconClassName = "h-[18px] w-[18px]"

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      aria-hidden="true"
      className={iconClassName}
    >
      <path d="M5 4.5 19 19.5M19 4.5 5 19.5" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={iconClassName}
    >
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M7.5 10.5V17" />
      <path d="M7.5 7.4v.01" />
      <path d="M12 17v-4a2.5 2.5 0 0 1 5 0v4" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={iconClassName}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17 7v.01" />
    </svg>
  )
}

const socialIcons = [XIcon, LinkedinIcon, InstagramIcon]

function Newsletter() {
  return (
    <div>
      <h3 className="text-sm font-medium uppercase tracking-wide text-white">
        Newsletter
      </h3>
      <p className="mt-3 max-w-xs text-sm text-zinc-400">
        Subscribe for exclusive travel deals and inspiration.
      </p>
      <div className="relative mt-4 max-w-xs">
        <Input
          type="email"
          placeholder="Enter email"
          aria-label="Email address"
          className="h-11 rounded-none border-0 bg-[#1E1E1E] pr-11 text-sm text-white placeholder:text-white/60 focus-visible:ring-1 focus-visible:ring-white/30"
        />
        <button
          type="button"
          aria-label="Subscribe"
          className="absolute right-1 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center text-white transition-colors hover:text-[#00A5CC]"
        >
          <ArrowUpRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 md:pt-24 lg:px-8">
        <div>
          <div className="text-6xl leading-none font-bold md:text-7xl">
            Wanderlast
          </div>
          <p className="mt-4 text-zinc-400 md:text-lg">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 md:mt-14 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <Newsletter />

          <nav aria-label="Quick links">
            <h3 className="text-sm font-medium uppercase tracking-wide text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white md:text-[15px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Support">
            <h3 className="text-sm font-medium uppercase tracking-wide text-white">
              Support
            </h3>
            <ul className="mt-4 space-y-3.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white md:text-[15px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide text-white">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3.5">
              <li>
                <a
                  href="tel:786901622"
                  className="text-sm text-zinc-400 transition-colors hover:text-white md:text-[15px]"
                >
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wandarland.com"
                  className="text-sm text-zinc-400 transition-colors hover:text-white md:text-[15px]"
                >
                  info@wandarland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center md:mt-14">
          <p className="text-sm text-zinc-500">
            © 2026 Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {socialLinks.map((social, index) => {
              const Icon = socialIcons[index]
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-white transition-colors hover:text-[#00A5CC]"
                >
                  <Icon />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
