"use client";

import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandWhatsapp,
  IconBrandX,
} from "@tabler/icons-react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clipboard,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { motion, type Variants } from "motion/react";
import { useState } from "react";
import EditorPanel from "@/components/EditorPanel";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PERSONAL_DATA } from "@/db/cv";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

// Treat the data as optionally-present so removed/blank fields are handled.
const data = PERSONAL_DATA as unknown as Record<string, string | undefined>;
const has = (value?: string) => Boolean(value?.trim());

type Channel = {
  label: string;
  display: string;
  value: string;
  href: string;
  icon: React.ElementType;
  tone: string;
  external: boolean;
};

// Build the channel list, skipping anything without a value.
const channels: Channel[] = [
  has(data.email) && {
    label: "Email",
    display: data.email as string,
    value: data.email as string,
    href: `mailto:${data.email}`,
    icon: Mail,
    tone: "text-cyan-300",
    external: false,
  },
  has(data.phone) && {
    label: "Phone",
    display: data.phone as string,
    value: data.phone as string,
    href: `tel:${data.phone}`,
    icon: Phone,
    tone: "text-emerald-300",
    external: false,
  },
  has(data.linkedin) && {
    label: "LinkedIn",
    display: "professional profile",
    value: data.linkedin as string,
    href: data.linkedin as string,
    icon: IconBrandLinkedin,
    tone: "text-sky-300",
    external: true,
  },
  has(data.github) && {
    label: "GitHub",
    display: "source workspace",
    value: data.github as string,
    href: data.github as string,
    icon: IconBrandGithub,
    tone: "text-zinc-200",
    external: true,
  },
  has(data.telegram) && {
    label: "Telegram",
    display: "direct message",
    value: data.telegram as string,
    href: data.telegram as string,
    icon: IconBrandTelegram,
    tone: "text-cyan-300",
    external: true,
  },
  has(data.whatsapp) && {
    label: "WhatsApp",
    display: "quick chat",
    value: data.whatsapp as string,
    href: data.whatsapp as string,
    icon: IconBrandWhatsapp,
    tone: "text-emerald-300",
    external: true,
  },
  has(data.instagram) && {
    label: "Instagram",
    display: "behind the build",
    value: data.instagram as string,
    href: data.instagram as string,
    icon: IconBrandInstagram,
    tone: "text-fuchsia-300",
    external: true,
  },
  has(data.twitter) && {
    label: "X / Twitter",
    display: "short updates",
    value: data.twitter as string,
    href: data.twitter as string,
    icon: IconBrandX,
    tone: "text-zinc-200",
    external: true,
  },
].filter(Boolean) as Channel[];

const fieldClass =
  "h-10 border-white/10 bg-white/[0.03] text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:border-cyan-300/50 focus-visible:ring-cyan-300/20";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
type FormErrors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = { name: "", email: "", subject: "", message: "" };

export default function ContactPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  const canEmail = has(data.email);

  const copyValue = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied(null);
    }
  };

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Tell me who you are.";
    if (!form.email.trim()) next.email = "An email helps me reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "That email doesn't look right.";
    if (!form.message.trim()) next.message = "Add a short brief.";
    setErrors(next);
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length > 0 || !canEmail) {
      // Move focus to the first field that failed validation.
      const firstInvalid = (["name", "email", "message"] as const).find(
        (key) => found[key],
      );
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }
    const subject = encodeURIComponent(
      form.subject.trim() || `Project inquiry from ${form.name}`,
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:${data.email}?subject=${subject}&body=${body}`;
    setSent(true);
    window.setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 pb-20 sm:px-6 lg:px-8">
      {/* Header ----------------------------------------------------------- */}
      <motion.section
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl space-y-5 pt-10"
      >
        <Badge
          variant="outline"
          className="border-emerald-300/30 bg-emerald-300/10 text-emerald-100"
        >
          contact.env
        </Badge>
        <h1 className="text-4xl font-black uppercase leading-none text-white sm:text-6xl">
          Open a channel
          <span className="block animated-gradient-text">send the brief</span>
        </h1>
        <p className="text-sm leading-7 text-zinc-400">
          Share the feature, product idea, architecture question, or frontend
          redesign you want to move forward. Drop a note below, or reach out on
          any channel that suits you.
        </p>
      </motion.section>

      {/* Form + channels -------------------------------------------------- */}
      <motion.section
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]"
      >
        {/* Compose form */}
        <EditorPanel filename="message.compose" status="draft  unsent">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {sent ? (
              <div
                role="status"
                aria-live="polite"
                className="flex items-center gap-2 border border-emerald-300/30 bg-emerald-300/10 px-4 py-3 font-mono text-xs text-emerald-100"
              >
                <CheckCircle2 size={15} />
                Opening your mail client with the message prefilled…
              </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="font-mono text-[11px] uppercase tracking-wider text-zinc-400"
                >
                  name
                </Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Ada Lovelace"
                  autoComplete="name"
                  className={fieldClass}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name ? (
                  <p
                    id="name-error"
                    role="alert"
                    className="font-mono text-[10px] text-rose-300"
                  >
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="font-mono text-[11px] uppercase tracking-wider text-zinc-400"
                >
                  email
                </Label>
                <Input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@domain.com"
                  className={fieldClass}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email ? (
                  <p
                    id="email-error"
                    role="alert"
                    className="font-mono text-[10px] text-rose-300"
                  >
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="subject"
                className="font-mono text-[11px] uppercase tracking-wider text-zinc-400"
              >
                subject <span className="text-zinc-600">(optional)</span>
              </Label>
              <Input
                id="subject"
                value={form.subject}
                onChange={update("subject")}
                placeholder="Backend API for an EV charging dashboard"
                className={fieldClass}
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="message"
                className="font-mono text-[11px] uppercase tracking-wider text-zinc-400"
              >
                message
              </Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={update("message")}
                placeholder="Problem statement, rough scope, and any constraints already known…"
                className="min-h-36 border-white/10 bg-white/[0.03] text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:border-cyan-300/50 focus-visible:ring-cyan-300/20"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message ? (
                <p
                  id="message-error"
                  role="alert"
                  className="font-mono text-[10px] text-rose-300"
                >
                  {errors.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={!canEmail}
                className="group inline-flex w-full items-center justify-center gap-2 border border-cyan-300/40 bg-cyan-300/10 px-5 py-3 font-mono text-sm text-cyan-50 transition hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                <Send size={16} />
                send message
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </button>
              <p className="font-mono text-[10px] text-zinc-600">
                opens your email client — no data is stored
              </p>
            </div>
          </form>
        </EditorPanel>

        {/* Direct channels */}
        <div className="flex flex-col gap-6">
          <div className="glass-surface flex flex-col gap-4 p-6">
            <div className="flex items-center gap-3 font-mono text-xs text-cyan-200/75">
              <span className="h-px w-8 bg-cyan-300/60" />
              direct.channels — {channels.length}
            </div>

            {channels.length > 0 ? (
              <div className="flex flex-col divide-y divide-white/5">
                {channels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <div
                      key={channel.label}
                      className="group flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                    >
                      <a
                        href={channel.href}
                        target={channel.external ? "_blank" : undefined}
                        rel={channel.external ? "noreferrer" : undefined}
                        className="flex min-w-0 items-center gap-3"
                      >
                        <span className="grid size-9 shrink-0 place-items-center border border-white/10 bg-white/[0.04]">
                          <Icon size={16} className={channel.tone} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm text-zinc-100 transition-colors group-hover:text-white">
                            {channel.label}
                          </span>
                          <span className="block truncate font-mono text-[11px] text-zinc-500">
                            {channel.display}
                          </span>
                        </span>
                      </a>
                      <button
                        type="button"
                        onClick={() => copyValue(channel.label, channel.value)}
                        aria-label={`Copy ${channel.label}`}
                        className="grid size-8 shrink-0 place-items-center border border-white/10 bg-white/[0.04] text-zinc-400 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-100"
                      >
                        {copied === channel.label ? (
                          <Check size={14} />
                        ) : (
                          <Clipboard size={14} />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="font-mono text-xs text-zinc-500">
                No contact channels configured yet.
              </p>
            )}
          </div>

          {has(data.location) ? (
            <div className="glass-surface flex items-center gap-3 p-6">
              <span className="grid size-9 shrink-0 place-items-center border border-white/10 bg-white/[0.04]">
                <MapPin size={16} className="text-emerald-300" />
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                  based in
                </p>
                <p className="text-sm text-zinc-100">{data.location}</p>
              </div>
            </div>
          ) : null}
        </div>
      </motion.section>
    </div>
  );
}
