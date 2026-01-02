"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import {
  Scale,
  Gavel,
  ShieldCheck,
  Briefcase,
  Building2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  FileText,
  Landmark,
  BadgeCheck,
  Users,
  ScrollText,
} from "lucide-react";

// Single-file, previewable Next.js page (App Router).
// Drop into: app/page.tsx (or app/page.jsx)
// Requires: Tailwind CSS + framer-motion + lucide-react

const cx = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
      {children}
    </span>
  );
}

// Update GlassCard to accept all div props (including onMouseMove, etc.)
function GlassCard({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-3 flex items-center justify-center gap-2">
        <span className="h-px w-10 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <span className="text-xs font-semibold tracking-[0.25em] text-white/70">
          {eyebrow}
        </span>
        <span className="h-px w-10 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-balance text-sm leading-6 text-white/70 sm:text-base">
        {desc}
      </p>
    </div>
  );
}

function PakistanFlag({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Pakistan flag"
      role="img"
    >
      <rect width="48" height="32" rx="6" fill="#0B5D3B" />
      <rect width="12" height="32" rx="6" fill="#ffffff" />
      <path
        d="M31.6 9.2c-4.2 0-7.6 3.4-7.6 7.6 0 4.2 3.4 7.6 7.6 7.6 1.8 0 3.5-.6 4.8-1.7-1.1 2.2-3.4 3.7-6.1 3.7-3.8 0-6.9-3.1-6.9-6.9 0-3.8 3.1-6.9 6.9-6.9 2.7 0 5 1.5 6.1 3.7-1.3-1.1-3-1.8-4.9-1.8z"
        fill="#ffffff"
        opacity="0.95"
      />
      <path
        d="M35.8 13.1l1.2 3.1 3.3.2-2.6 2.0.9 3.2-2.8-1.7-2.8 1.7.9-3.2-2.6-2.0 3.3-.2 1.2-3.1z"
        fill="#ffffff"
      />
      <rect
        x="0.5"
        y="0.5"
        width="47"
        height="31"
        rx="5.5"
        stroke="rgba(255,255,255,0.18)"
      />
    </svg>
  );
}

function useParallax(strength = 14) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 90, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 90, damping: 18, mass: 0.6 });
  const tx = useTransform(sx, (v) => `${(v / 100) * strength}px`);
  const ty = useTransform(sy, (v) => `${(v / 100) * strength}px`);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 200 - 100;
    const py = ((e.clientY - r.top) / r.height) * 200 - 100;
    x.set(px);
    y.set(py);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return { onMove, onLeave, style: { translateX: tx, translateY: ty } } as const;
}

// ✅ Services list (lawful, website-safe). If you want Corporate/Commercial added back,
// tell me and I will add a separate category.
const services = [
  {
    icon: Briefcase,
    title: "Family Law & Matrimonial Matters",
    desc: "Complete legal support for family disputes, overseas & local Pakistani clients.",
    bullets: [
      "Divorce & Khula (Local & Overseas)",
      "Divorce deeds (mutual & one-sided) and court proceedings",
      "Child custody & permanent custody",
      "Guardianship certificates (child documents & travel)",
      "Maintenance / financial support cases (spouse & children)",
      "Domestic violence & financial abuse cases",
    ],
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=70",
  },
  {
    icon: Gavel,
    title: "Civil & Criminal Litigation",
    desc: "Representation before Pakistani courts with strong litigation strategy.",
    bullets: [
      "Civil litigation (suits, injunctions, recovery)",
      "Criminal litigation & trials",
      "Bail & protective bail (including for overseas clients)",
      "FIR-related legal assistance and safe landing support",
    ],
    img: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=1600&q=70",
  },
  {
    icon: Scale,
    title: "Property, Rent & Documentation",
    desc: "End-to-end property and tenancy legal services across Pakistan.",
    bullets: [
      "Property transfer assistance",
      "Property disputes & documentation",
      "Rent matters, ejectment & tenant issues",
      "Default in rent cases",
      "Search certificates (ownership & transaction history)",
    ],
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=70",
  },
  {
    icon: ShieldCheck,
    title: "Documentation, NADRA & Attestation",
    desc: "Legal documentation and attestation services for Pakistan & abroad.",
    bullets: [
      "Court marriage (local & overseas) — documentation support",
      "Marriage, divorce & death certificates",
      "Succession certificate cases (local & overseas)",
      "Police character certificates",
      "All NADRA works",
      "MOFA & embassy attestation",
    ],
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=70",
  },
] as const;

const laws = [
  {
    title: "Constitution of Pakistan (1973)",
    note: "Fundamental rights, governance, and constitutional remedies.",
  },
  { title: "Pakistan Penal Code (PPC)", note: "Core criminal offences and punishments." },
  {
    title: "Code of Criminal Procedure (CrPC)",
    note: "Criminal procedure: FIR to trial, bail, and investigation.",
  },
  {
    title: "Code of Civil Procedure (CPC)",
    note: "Civil litigation procedure, interim relief, execution.",
  },
  {
    title: "Qanun-e-Shahadat Order (Evidence)",
    note: "Rules of evidence for civil and criminal trials.",
  },
  {
    title: "Limitation Act",
    note: "Time limits for suits and legal actions—critical for filing strategy.",
  },
  {
    title: "Family Laws (overview)",
    note: "Divorce, khula, maintenance, guardianship, and custody frameworks.",
  },
  {
    title: "Guardian & Wards Act (overview)",
    note: "Guardianship and custody proceedings for minors.",
  },
  {
    title: "Contract Act",
    note: "Contract formation, enforceability, breach, and remedies.",
  },
  {
    title: "Transfer of Property Act",
    note: "Property transfers, rights, and title principles.",
  },
  {
    title: "Registration Act",
    note: "Document registration requirements and validity impacts.",
  },
  {
    title: "Specific Relief Act",
    note: "Injunctions, declarations, and specific performance.",
  },
  {
    title: "Arbitration Act (overview)",
    note: "Arbitration proceedings and enforcement of awards.",
  },
  {
    title: "Industrial & Labour Laws (overview)",
    note: "Employment disputes, workplace compliance, HR advisory.",
  },
  {
    title: "Electronic Transactions / Cybercrime framework (overview)",
    note: "E-contracts, digital evidence, and cyber disputes.",
  },
] as const;

const testimonials = [
  {
    name: "Overseas Client",
    role: "Documentation & Court Support",
    quote:
      "Very professional process. Clear guidance, timely updates, and complete documentation handling from abroad.",
  },
  {
    name: "Karachi Client",
    role: "Family Matter",
    quote:
      "They guided my case with care and clarity. Great communication and strong representation.",
  },
  {
    name: "Business Client",
    role: "Verification & Compliance",
    quote:
      "Verification reports were structured and easy to understand. Excellent support for HR decisions.",
  },
] as const;

const offices = [
  {
    city: "Karachi",
    area: "Shahrah-e-Faisal",
    hours: "Mon–Sat • 10:00–18:00",
    img: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1600&q=70",
  },
] as const;

function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-44 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.24),transparent_60%)] blur-3xl"
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-56 right-[-150px] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.24),transparent_60%)] blur-3xl"
        animate={{ x: [0, -12, 0], y: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[-180px] top-52 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.14),transparent_60%)] blur-3xl"
        animate={{ x: [0, 14, 0], y: [0, 10, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_45%,rgba(255,255,255,0.04))]" />
      <div className="absolute inset-0 bg-[radial-gradient(transparent_1px,rgba(0,0,0,0.5)_1px)] [background-size:18px_18px] opacity-40" />
    </div>
  );
}

function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Lightweight “tests” (development-only) to prevent accidental regressions.
if (process.env.NODE_ENV !== "production") {
  console.assert(offices.length === 1, "Expected exactly 1 office (Karachi)");
  console.assert(
    offices[0]?.city === "Karachi",
    "Expected the only office city to be Karachi"
  );
  console.assert(services.length >= 4, "Expected at least 4 service cards to render");
  console.assert(laws.length >= 10, "Expected many laws to be listed");

  // Added: ensure unique service titles
  const titles = services.map((s) => s.title);
  console.assert(
    new Set(titles).size === titles.length,
    "Expected service titles to be unique"
  );
}

export default function Page() {
  const [submitted, setSubmitted] = useState(false);
  const [lawQuery, setLawQuery] = useState("");

  const filteredLaws = useMemo(() => {
    const q = lawQuery.trim().toLowerCase();
    if (!q) return laws;
    return laws.filter(
      (l) => l.title.toLowerCase().includes(q) || l.note.toLowerCase().includes(q)
    );
  }, [lawQuery]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Karachi",
    service: services[0].title,
    date: "",
    message: "",
  });

  const heroBadges = useMemo(
    () => [
      "Karachi • Pakistan",
      "Appointments in 24h",
      "Confidential Consultation",
      "Overseas support",
    ],
    []
  );

  function onChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  // tiny sparkle animation near hero title
  const [spark, setSpark] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setSpark((s) => !s), 1400);
    return () => clearInterval(t);
  }, []);

  const parallax = useParallax(18);

  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      <FloatingOrbs />

      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070A12]/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
              <Scale className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <div className="text-sm font-semibold tracking-tight">Simdozbysandy</div>
                <PakistanFlag className="h-5 w-auto" />
              </div>
              <div className="text-[11px] text-white/60">Law Firm • Karachi</div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a className="hover:text-white" href="#services">
              Services
            </a>
            <a className="hover:text-white" href="#laws">
              Laws
            </a>
            <a className="hover:text-white" href="#offices">
              Office
            </a>
            <a className="hover:text-white" href="#appointment">
              Book
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#appointment"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-black shadow-sm transition hover:translate-y-[-1px] hover:shadow md:text-sm"
            >
              <Calendar className="h-4 w-4" />
              Book Appointment
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="lg:col-span-6"
            >
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                {heroBadges.map((b) => (
                  <Pill key={b}>{b}</Pill>
                ))}
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
              >
                Modern legal support for Pakistan — local & overseas.
                <span className="ml-2 inline-flex align-middle">
                  <motion.span
                    key={String(spark)}
                    initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="inline-flex rounded-xl bg-white/10 p-2 ring-1 ring-white/10"
                    aria-hidden
                  >
                    <Sparkles className="h-5 w-5" />
                  </motion.span>
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-xl text-pretty text-sm leading-6 text-white/70 sm:text-base"
              >
                Family matters, litigation, property disputes, rent issues, attestation, NADRA work, and
                more — handled with clear strategy and client-first communication.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#appointment"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400/90 to-indigo-400/90 px-5 py-3 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(99,102,241,0.18)] transition hover:translate-y-[-1px]"
                >
                  Start a Consultation
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
                >
                  Explore Services
                </a>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4"
              >
                {[
                  { k: "12+", v: "Years" },
                  { k: "24h", v: "Response" },
                  { k: "Local", v: "Karachi" },
                  { k: "Online", v: "Overseas" },
                ].map((s) => (
                  <motion.div
                    key={s.v}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 240, damping: 18 }}
                  >
                    <GlassCard className="p-4">
                      <div className="text-xl font-semibold">{s.k}</div>
                      <div className="mt-1 text-xs text-white/60">{s.v}</div>
                    </GlassCard>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6"
            >
              <GlassCard
                className="relative overflow-hidden p-3"
                onMouseMove={parallax.onMove}
                onMouseLeave={parallax.onLeave}
              >
                <div className="absolute inset-0">
                  <img
                    src="https://www.thenews.com.pk/assets/uploads/akhbar/2024-11-08/1248536_747614_t_akhbar.jpg"
                    alt="Law books and gavel"
                    className="h-full w-full object-cover opacity-65"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#070A12] via-[#070A12]/30 to-transparent" />
                </div>

                <motion.div
                  style={parallax.style}
                  className="relative grid gap-3 p-4 sm:grid-cols-2"
                >
                  <GlassCard className="p-5">
                    <div className="flex items-center gap-2">
                      <span className="rounded-xl bg-white/10 p-2 ring-1 ring-white/10">
                        <Building2 className="h-5 w-5" />
                      </span>
                      <div className="text-sm font-semibold">Office</div>
                    </div>
                    <div className="mt-3 space-y-2 text-sm text-white/75">
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4" />
                        <div>
                          <div className="font-medium text-white">Karachi</div>
                          <div className="text-xs text-white/60">Shahrah-e-Faisal </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-5">
                    <div className="flex items-center gap-2">
                      <span className="rounded-xl bg-white/10 p-2 ring-1 ring-white/10">
                        <ShieldCheck className="h-5 w-5" />
                      </span>
                      <div className="text-sm font-semibold">Overseas Support</div>
                    </div>
                    <p className="mt-3 text-sm text-white/70">
                      Online facilitation for overseas Pakistanis: documentation, filings, and court
                      processes.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Pill>Family</Pill>
                      <Pill>Property</Pill>
                      <Pill>Attestation</Pill>
                      <Pill>Bail</Pill>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-5 sm:col-span-2">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2">
                        <span className="rounded-xl bg-white/10 p-2 ring-1 ring-white/10">
                          <Phone className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="text-sm font-semibold">Talk to us</div>
                          <div className="text-xs text-white/60">
                            Fast response during business hours
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <a
                          className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white/90 ring-1 ring-white/10 transition hover:bg-white/15"
                          href="#appointment"
                        >
                          <Mail className="h-4 w-4" />
                          Email Request
                        </a>
                        <a
                          className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-black transition hover:translate-y-[-1px]"
                          href="#appointment"
                        >
                          <Calendar className="h-4 w-4" />
                          Book Slot
                        </a>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Animated trust bar */}
          <motion.div
            className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="flex gap-8 whitespace-nowrap px-6 py-4 text-sm text-white/70"
              animate={{ x: [0, -600] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            >
              {[
                "Divorce & Khula",
                "Custody & Guardianship",
                "Rent & Property disputes",
                "Bail & FIR matters",
                "NADRA works",
                "MOFA & Embassy attestation",
                "Succession certificates",
                "Overseas support",
              ]
                .concat([
                  "Divorce & Khula",
                  "Custody & Guardianship",
                  "Rent & Property disputes",
                  "Bail & FIR matters",
                  "NADRA works",
                  "MOFA & Embassy attestation",
                  "Succession certificates",
                  "Overseas support",
                ])
                .map((t, i) => (
                  <span key={`${t}-${i}`} className="inline-flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
                      <BadgeCheck className="h-4 w-4" />
                    </span>
                    {t}
                  </span>
                ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <SectionTitle
            eyebrow="SERVICES"
            title="Legal services for Pakistan — local & overseas clients."
            desc="Choose the practice area you need. Book a consultation, or request documentation/attestation support."
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mt-10 grid gap-4 lg:grid-cols-2"
          >
            {services.map((s) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <GlassCard className="group h-full overflow-hidden">
                  <div className="relative h-40">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <span className="rounded-2xl bg-white/10 p-2 ring-1 ring-white/10">
                        <s.icon className="h-5 w-5" />
                      </span>
                      <div className="text-base font-semibold">{s.title}</div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-sm text-white/70">{s.desc}</p>
                    <div className="mt-4 grid gap-2 text-sm text-white/75 sm:grid-cols-2">
                      {s.bullets.map((b) => (
                        <div key={b} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <a
                        href="#appointment"
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400/90 to-indigo-400/90 px-4 py-2 text-sm font-semibold text-black transition hover:translate-y-[-1px]"
                      >
                        Book now
                        <ArrowRight className="h-4 w-4" />
                      </a>
                      <a
                        href="#laws"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                      >
                        Relevant laws
                        <FileText className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          <Reveal>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {[
                {
                  icon: Users,
                  title: "Client-first",
                  desc: "Clear timelines, transparent fees, and consistent updates.",
                },
                {
                  icon: ScrollText,
                  title: "Strong drafting",
                  desc: "Precise agreements, pleadings, and legal notices.",
                },
                {
                  icon: Landmark,
                  title: "Court-ready",
                  desc: "Strategy aligned to forum, limitation, and evidence.",
                },
              ].map((f) => (
                <GlassCard key={f.title} className="p-6">
                  <div className="flex items-start gap-3">
                    <span className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10">
                      <f.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <div className="text-base font-semibold">{f.title}</div>
                      <div className="mt-1 text-sm text-white/70">{f.desc}</div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Laws */}
        <section id="laws" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionTitle
                eyebrow="LAWS"
                title="A wider legal framework—explained simply."
                desc="Search the key laws we commonly work with. For advice, book a consultation tailored to your facts."
              />

              <GlassCard className="mt-6 overflow-hidden">
                <div className="relative h-48">
                  <img
                    src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=70"
                    alt="Library"
                    className="h-full w-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] to-transparent" />
                </div>
                <div className="p-6 text-sm text-white/70">
                  <p>
                    Early advice can preserve evidence, avoid procedural mistakes, and unlock faster
                    remedies like interim relief.
                  </p>
                  <div className="mt-4">
                    <label className="text-xs font-semibold text-white/70">Search laws</label>
                    <input
                      value={lawQuery}
                      onChange={(e) => setLawQuery(e.target.value)}
                      placeholder="e.g., CPC, evidence, arbitration"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                    />
                  </div>
                </div>
              </GlassCard>
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="lg:col-span-7"
            >
              <div className="grid gap-4">
                {filteredLaws.map((l) => (
                  <motion.div key={l.title} variants={fadeUp}>
                    <GlassCard className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-base font-semibold">{l.title}</div>
                          <div className="mt-1 text-sm text-white/70">{l.note}</div>
                        </div>
                        <span className="rounded-xl bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/10">
                          Overview
                        </span>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}

                {filteredLaws.length === 0 && (
                  <GlassCard className="p-6">
                    <div className="text-sm text-white/70">
                      No matching laws found. Try a different keyword.
                    </div>
                  </GlassCard>
                )}
              </div>

              <GlassCard className="mt-4 p-6">
                <div className="flex items-center gap-2">
                  <span className="rounded-2xl bg-white/10 p-2 ring-1 ring-white/10">
                    <Gavel className="h-5 w-5" />
                  </span>
                  <div className="text-sm font-semibold">Disclaimer</div>
                </div>
                <p className="mt-3 text-sm text-white/70">
                  This page is informational and not legal advice. Book a consultation for guidance
                  tailored to your facts.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* Office */}
        <section id="offices" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <SectionTitle
            eyebrow="LOCATION"
            title="Karachi-based office—nationwide & overseas support."
            desc="Meet in-person in Karachi or start remotely anywhere in Pakistan. We’ll confirm your slot after your request."
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mt-10 grid gap-4 lg:grid-cols-2"
          >
            {offices.map((o) => (
              <motion.div
                key={o.city}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <GlassCard className="overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={o.img}
                      alt={`${o.city} skyline`}
                      className="h-full w-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <PakistanFlag className="h-8 w-auto" />
                      <div>
                        <div className="text-xl font-semibold">{o.city}</div>
                        <div className="text-xs text-white/70">{o.area}</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-3 p-6 text-sm text-white/75">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{o.area}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{o.hours}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Pill>In-person</Pill>
                      <Pill>Remote</Pill>
                      <Pill>Overseas</Pill>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}

            <Reveal>
              <GlassCard className="p-6">
                <div className="flex items-start gap-3">
                  <span className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10">
                    <ShieldCheck className="h-6 w-6" />
                  </span>
                  <div>
                    <div className="text-base font-semibold">Documentation & Attestation</div>
                    <div className="mt-1 text-sm text-white/70">
                      MOFA and Embassy attestation, NADRA services, and certificate processing for
                      overseas Pakistanis.
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Pill>Fast updates</Pill>
                      <Pill>Confidential</Pill>
                      <Pill>Online facilitation</Pill>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          </motion.div>
        </section>

        {/* Appointment */}
        <section id="appointment" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionTitle
                eyebrow="BOOKING"
                title="Book an appointment in minutes."
                desc="Tell us what you need. We’ll confirm your slot and share next steps by phone or email."
              />

              <div className="mt-8 grid gap-4">
                {testimonials.map((t) => (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55 }}
                  >
                    <GlassCard className="p-5">
                      <p className="text-sm text-white/75">“{t.quote}”</p>
                      <div className="mt-3 text-xs text-white/60">
                        <span className="font-semibold text-white/80">{t.name}</span> • {t.role}
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <GlassCard className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-semibold">Appointment Request</div>
                      <PakistanFlag className="h-5 w-auto" />
                    </div>
                    <div className="mt-1 text-sm text-white/60">
                      Karachi • In-person or remote
                    </div>
                  </div>
                  <span className="hidden rounded-2xl bg-white/10 px-3 py-2 text-xs font-semibold text-white/80 ring-1 ring-white/10 sm:inline-flex">
                    Secure & Confidential
                  </span>
                </div>

                <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-white/70">Full name</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        required
                        placeholder="Your name"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-white/70">Phone</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                        required
                        placeholder="+92 3xx xxx xxxx"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-white/70">Email</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={onChange}
                        placeholder="you@example.com"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-white/70">Preferred city</label>
                      <select
                        name="city"
                        value={form.city}
                        onChange={onChange}
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-white/20"
                      >
                        <option className="bg-[#070A12]" value="Karachi">
                          Karachi
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-white/70">Service</label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={onChange}
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-white/20"
                      >
                        {services.map((s) => (
                          <option
                            className="bg-[#070A12]"
                            key={s.title}
                            value={s.title}
                          >
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-white/70">Preferred date</label>
                      <input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={onChange}
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-white/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-white/70">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      rows={4}
                      placeholder="Briefly describe your matter (optional)"
                      className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                    />
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:translate-y-[-1px]"
                    >
                      Submit Request
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <div className="text-xs text-white/60">
                      By submitting, you agree to be contacted regarding your request.
                    </div>
                  </div>

                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mt-2 rounded-2xl border border-emerald-300/20 bg-emerald-500/10 p-4 text-sm text-emerald-100"
                    >
                      <div className="font-semibold">Request received (demo) ✅</div>
                      <div className="mt-1 text-emerald-100/80">
                        For production, connect this form to an API route and a calendar/booking
                        provider.
                      </div>
                    </motion.div>
                  )}
                </form>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                  <Scale className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">Simdozbysandy</div>
                    <PakistanFlag className="h-5 w-auto" />
                  </div>
                  <div className="text-xs text-white/60">Karachi</div>
                </div>
              </div>
              <p className="mt-3 max-w-md text-sm text-white/70">
                Professional legal services and documentation support. Replace example addresses, phone
                numbers, and email with your firm’s real details.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <div className="text-sm font-semibold">Contact</div>
                  <div className="mt-2 space-y-2 text-sm text-white/70">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>+92 313 2313020</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>hello@simdozbysandy.pk</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold">Quick links</div>
                  <div className="mt-2 space-y-2 text-sm text-white/70">
                    <a className="block hover:text-white" href="#services">
                      Services
                    </a>
                    <a className="block hover:text-white" href="#laws">
                      Laws
                    </a>
                    <a className="block hover:text-white" href="#appointment">
                      Booking
                    </a>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold">Disclaimer</div>
                  <p className="mt-2 text-sm text-white/70">
                    Information on this website does not constitute legal advice and does not create a
                    lawyer-client relationship.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-12">
              <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center">
                <div>© {new Date().getFullYear()} Simdozbysandy. All rights reserved.</div>
                <div className="flex flex-wrap gap-3">
                  <a className="hover:text-white" href="#">
                    Privacy
                  </a>
                  <a className="hover:text-white" href="#">
                    Terms
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
