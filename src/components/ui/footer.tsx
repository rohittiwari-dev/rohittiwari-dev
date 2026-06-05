import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandWhatsapp,
  IconBrandX,
} from "@tabler/icons-react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { PERSONAL_DATA } from "../../db/cv";

const navLinks = [
  { href: "/", label: "page.tsx" },
  { href: "/about", label: "about.md" },
  { href: "/projects", label: "projects.json" },
  { href: "/contact", label: "contact.env" },
];

const socials = [
  {
    href: PERSONAL_DATA.github,
    label: "GitHub",
    icon: IconBrandGithub,
    hover: "hover:border-white/30 hover:text-white",
  },
  {
    href: PERSONAL_DATA.linkedin,
    label: "LinkedIn",
    icon: IconBrandLinkedin,
    hover: "hover:border-sky-400/40 hover:text-sky-400",
  },
  {
    href: PERSONAL_DATA.twitter,
    label: "X",
    icon: IconBrandX,
    hover: "hover:border-zinc-300/40 hover:text-zinc-100",
  },
  {
    href: PERSONAL_DATA.telegram,
    label: "Telegram",
    icon: IconBrandTelegram,
    hover: "hover:border-cyan-300/40 hover:text-cyan-300",
  },
  {
    href: PERSONAL_DATA.whatsapp,
    label: "WhatsApp",
    icon: IconBrandWhatsapp,
    hover: "hover:border-emerald-300/40 hover:text-emerald-300",
  },
  {
    href: PERSONAL_DATA.instagram,
    label: "Instagram",
    icon: IconBrandInstagram,
    hover: "hover:border-fuchsia-300/40 hover:text-fuchsia-300",
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-auto w-full border-t border-white/10 bg-black/50 backdrop-blur-xl">
      {/* accent hairline */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/50 to-transparent" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-8 md:grid-cols-[1.5fr_1fr_1.2fr]">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex size-9 items-center justify-center overflow-hidden ">
              <img
                src="/icon.png"
                alt={PERSONAL_DATA.initials}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-mono text-sm font-semibold text-zinc-100">
                {PERSONAL_DATA.name}
              </span>
              <span className="font-mono text-[11px] text-zinc-500">
                {PERSONAL_DATA.headline}
              </span>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-7 text-zinc-400">
            {PERSONAL_DATA.bio}
          </p>
          <div className="flex w-fit items-center gap-2 border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 font-mono text-[11px] text-emerald-200">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
            </span>
            available-for-new-builds
          </div>
        </div>

        {/* Navigate */}
        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            navigate
          </span>
          <ul className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 font-mono text-sm text-zinc-400 transition-colors hover:text-cyan-200"
                >
                  <span className="text-zinc-600 transition-colors group-hover:text-cyan-400">
                    /
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            connect
          </span>
          <a
            href={`mailto:${PERSONAL_DATA.email}`}
            className="group inline-flex w-fit items-center gap-2 text-sm text-zinc-300 transition-colors hover:text-white"
          >
            <Mail
              size={15}
              className="text-zinc-500 transition-colors group-hover:text-cyan-300"
            />
            {PERSONAL_DATA.email}
            <ArrowUpRight
              size={13}
              className="text-zinc-600 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-300"
            />
          </a>
          <div className="inline-flex w-fit items-center gap-2 text-sm text-zinc-400">
            <MapPin size={15} className="text-zinc-500" />
            {PERSONAL_DATA.location}
          </div>

          <div className="mt-1 flex flex-wrap gap-2">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className={`flex size-9 items-center justify-center border border-white/10 bg-white/[0.03] text-zinc-400 transition-colors ${social.hover}`}
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 font-mono text-[11px] text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>
            &copy; {new Date().getFullYear()} {PERSONAL_DATA.name}. All rights
            reserved.
          </span>
          <span className="flex items-center gap-2">
            <span className="text-emerald-400">●</span>
            built with Next.js &middot; Tailwind &middot; Motion
          </span>
        </div>
      </div>
    </footer>
  );
}
