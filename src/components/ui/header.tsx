"use client";

import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PERSONAL_DATA } from "../../db/cv";
import { cn } from "../../lib/utils";
import MagneticElement from "../MagneticElement";

const navLinks = [
  {
    href: "/",
    label: "page.tsx",
    idle: "text-zinc-400 hover:text-cyan-200 hover:bg-cyan-400/10",
    active: "text-cyan-200 bg-cyan-400/10",
    bar: "bg-cyan-400",
  },
  {
    href: "/about",
    label: "about.md",
    idle: "text-zinc-400 hover:text-emerald-200 hover:bg-emerald-400/10",
    active: "text-emerald-200 bg-emerald-400/10",
    bar: "bg-emerald-400",
  },
  {
    href: "/projects",
    label: "projects.json",
    idle: "text-zinc-400 hover:text-fuchsia-200 hover:bg-fuchsia-400/10",
    active: "text-fuchsia-200 bg-fuchsia-400/10",
    bar: "bg-fuchsia-400",
  },
  {
    href: "/contact",
    label: "contact.env",
    idle: "text-zinc-400 hover:text-amber-200 hover:bg-amber-400/10",
    active: "text-amber-200 bg-amber-400/10",
    bar: "bg-amber-400",
  },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full font-mono text-sm">
      <nav className="relative flex flex-col items-center justify-between border-b border-white/10 bg-black/60 backdrop-blur-xl sm:flex-row">
        {/* Brand / prompt */}
        <div className="flex w-full items-center border-b border-white/10 sm:w-auto sm:border-b-0">
          <Link
            href="/"
            className="flex h-12 w-14 shrink-0 items-center justify-center transition-colors"
          >
            <div className="relative flex h-6 w-6 items-center justify-center overflow-hidden ">
              <img
                src="/icon.png"
                alt={PERSONAL_DATA.initials}
                className="h-full w-full object-cover"
              />
            </div>
          </Link>

          <div className="flex items-center px-4 text-xs text-zinc-500">
            ~/portfolio
            <span className="ml-1 animate-pulse text-emerald-400">_</span>
          </div>
        </div>

        {/* Routes */}
        <div className="flex w-full items-center overflow-x-auto sm:w-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <MagneticElement key={link.href} strength={10}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex items-center gap-2 whitespace-nowrap border-l border-white/10 px-5 py-3 transition-all",
                    isActive ? link.active : link.idle,
                  )}
                >
                  {link.href === "/" ? (
                    <>
                      <span className="text-zinc-600">{"<"}</span>
                      {link.label}
                      <span className="text-zinc-600">{">"}</span>
                    </>
                  ) : (
                    link.label
                  )}
                  <span
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-0.5 origin-left transition-transform duration-300",
                      link.bar,
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              </MagneticElement>
            );
          })}
        </div>

        {/* Social shortcuts */}
        <div className="hidden h-12 items-center lg:flex">
          <MagneticElement strength={15}>
            <a
              href={PERSONAL_DATA.github}
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center border-l border-white/10 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="GitHub"
            >
              <IconBrandGithub size={18} />
            </a>
          </MagneticElement>
          <MagneticElement strength={15}>
            <a
              href={PERSONAL_DATA.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center border-l border-white/10 text-zinc-400 transition-colors hover:bg-sky-500/10 hover:text-sky-400"
              aria-label="LinkedIn"
            >
              <IconBrandLinkedin size={18} />
            </a>
          </MagneticElement>
        </div>

        {/* Accent hairline */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      </nav>
    </header>
  );
}
