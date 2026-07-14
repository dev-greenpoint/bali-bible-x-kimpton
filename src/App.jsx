import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  FileText,
  Mail,
  Smartphone,
  TrendingUp,
} from "lucide-react";

// ─── Design tokens ─────────────────────────────────────────────────────────────
const SERIF = { fontFamily: "Playfair Display, Georgia, serif" };
const TEAL = "#2BCDC4";

// ─── Brand assets — swap in Kimpton logo when supplied ─────────────────────
const BALI_BIBLE_LOGO_URL = "https://res.cloudinary.com/dfers76ex/image/upload/q_auto/f_auto/v1781745138/Bali-Bible-Logo_jzqthj.png";
const KIMPTON_LOGO_URL = "https://res.cloudinary.com/dfers76ex/image/upload/v1784070098/kimpton_suntaya_white_transparent_m1ko9f.png";

// ─── Mockup imagery ──────────────────────────────────────────────────────────
const MOCKUP_IG_REEL_1 = "https://res.cloudinary.com/dfers76ex/image/upload/v1784070482/ChatGPT_Image_Jul_15_2026_09_07_46_AM_q4hfjh.png";
const MOCKUP_FACEBOOK_PROMO = "https://res.cloudinary.com/dfers76ex/image/upload/v1784070535/ChatGPT_Image_Jul_15_2026_09_08_39_AM_jomn0l.png";
const MOCKUP_IG_STORIES_1 = "https://res.cloudinary.com/dfers76ex/image/upload/v1784070591/ChatGPT_Image_Jul_15_2026_09_09_25_AM_rhgduh.png";
const MOCKUP_HOMEPAGE_BANNER = "https://res.cloudinary.com/dfers76ex/image/upload/v1784070619/ChatGPT_Image_Jul_15_2026_09_09_48_AM_yvcz4y.png";
const MOCKUP_IG_REEL_2 = "https://res.cloudinary.com/dfers76ex/image/upload/v1784070688/ChatGPT_Image_Jul_15_2026_09_10_32_AM_hsbbjq.png";
const MOCKUP_IG_STORIES_2 = "https://res.cloudinary.com/dfers76ex/image/upload/v1784070704/ChatGPT_Image_Jul_15_2026_09_11_25_AM_hefnro.png";

// ─── Shared UI ─────────────────────────────────────────────────────────────────

function BrandLogo({ src, alt, heightClass = "h-5" }) {
  if (!src) {
    return (
      <span className={`${heightClass} flex items-center rounded border border-dashed border-[#666] px-2 text-[10px] uppercase tracking-wider text-[#999]`}>
        {alt} logo pending
      </span>
    );
  }
  return <img src={src} alt={alt} className={`${heightClass} object-contain`} />;
}

function ImgPlaceholder({ aspectClass = "aspect-[4/5]", label = "Mockup coming" }) {
  return (
    <div className={`${aspectClass} w-full overflow-hidden rounded-2xl bg-[#f0f0f0] flex flex-col items-center justify-center gap-2`}>
      <Camera size={20} className="text-[#ccc]" />
      <span className="text-xs tracking-wider text-[#ccc] uppercase text-center px-2">{label}</span>
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="mb-3 text-xs uppercase tracking-widest text-[#2BCDC4]">{children}</p>
  );
}

function SectionTitle({ eyebrow, title, copy }) {
  return (
    <div className="mb-10 max-w-4xl">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-[2.2rem] font-light leading-tight text-[#1a1a1a] md:text-[2.8rem]" style={SERIF}>
        {title}
      </h2>
      {copy && <p className="mt-5 max-w-2xl text-base leading-7 text-[#666]">{copy}</p>}
    </div>
  );
}

function Card({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6">
      {Icon && (
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2BCDC4] text-white">
            <Icon size={17} />
          </div>
          <h3 className="text-sm font-medium text-[#1a1a1a]">{title}</h3>
        </div>
      )}
      {!Icon && title && <h3 className="mb-4 text-sm font-medium text-[#1a1a1a]">{title}</h3>}
      <div className="text-sm leading-6 text-[#666]">{children}</div>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-sm leading-6 text-[#555]">
          <CheckCircle2 className="mt-0.5 shrink-0 text-[#2BCDC4]" size={16} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SubTabBar({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] p-1.5">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`shrink-0 rounded-lg px-4 py-2 text-sm transition ${
            active === tab
              ? "bg-[#2BCDC4] text-white font-medium"
              : "text-[#666] hover:bg-[#e5e5e5] hover:text-[#1a1a1a]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

function MockupItem({ title, desc, aspectClass = "aspect-[4/5]", imgSrc, imgMaxWidthClass = "max-w-[200px]" }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-[#e5e5e5] bg-white p-5">
      <p className="mb-1 text-sm font-medium text-[#1a1a1a]">{title}</p>
      <p className="mb-4 text-sm leading-6 text-[#666]">{desc}</p>
      {imgSrc ? (
        <img src={imgSrc} alt={title} className={`${aspectClass} mx-auto w-full ${imgMaxWidthClass} rounded-2xl object-cover`} />
      ) : (
        <div className={`mx-auto w-full ${imgMaxWidthClass}`}>
          <ImgPlaceholder aspectClass={aspectClass} label="Mockup coming" />
        </div>
      )}
    </div>
  );
}

// ─── Section content ───────────────────────────────────────────────────────────

function IntroductionContent() {
  const facts = [
    { label: "Property", value: "Kimpton Ubud" },
    { label: "Campaign Length", value: "2-month pre-opening" },
    { label: "Campaign Period", value: "August – September 2026" },
    { label: "Milestone", value: "September 2026 soft opening" },
  ];
  return (
    <div>
      <SectionTitle
        eyebrow="The Bali Bible × Kimpton Ubud Campaign Strategy"
        title="Introduction"
        copy="Kimpton Ubud is preparing to introduce a new kind of luxury experience to Bali — one that blends contemporary design, elevated dining, modern wellness and a distinctly human approach to hospitality."
      />
      <div className="space-y-5">
        <div className="rounded-2xl border border-[#e5e5e5] bg-white p-7">
          <p className="text-sm leading-7 text-[#666]">
            Over a two-month pre-opening campaign, The Bali Bible will position Kimpton as one of the island's most anticipated new hotel openings, building awareness ahead of the September soft opening through editorial storytelling, social content and audience amplification. Rather than simply promoting a new hotel, the campaign will invite travellers to become among the first to experience what Kimpton is bringing to Ubud.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(({ label, value }) => (
            <div key={label} className="rounded-xl border border-[#e5e5e5] bg-[#f8f9fa] p-5">
              <p className="mb-1 text-xs uppercase tracking-wide text-[#999]">{label}</p>
              <p className="text-sm font-medium text-[#1a1a1a]">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const supportingMessages = [
  "A new social energy in Ubud",
  "Luxury with personality",
  "Modern wellness without the cliché",
  "Built for Humans hospitality",
  "Design-led accommodation and experiences",
  "Morning Kickstart, Social Hour and elevated guest experiences",
  "Limited availability during the September soft opening",
];

function MessagingContent() {
  return (
    <div>
      <SectionTitle title="Campaign Key Messaging" copy="Throughout the campaign, all content will be built around a single overarching narrative." />
      <div className="space-y-5">
        <div className="rounded-2xl border border-[#1a1a1a]/12 bg-[#1a1a1a] p-8">
          <Eyebrow>Overarching Narrative</Eyebrow>
          <p className="text-[1.9rem] font-light leading-snug text-white" style={SERIF}>
            Be Among the First to Experience Kimpton Ubud
          </p>
        </div>
        <Card title="Supporting Messaging">
          <BulletList items={supportingMessages} />
        </Card>
      </div>
    </div>
  );
}

function ScopeContent() {
  return (
    <div>
      <SectionTitle
        title="Campaign Scope"
        copy="The campaign will run across August and September 2026, combining premium editorial storytelling with social content, audience amplification and direct traffic-driving activity."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Card icon={FileText} title="Editorial & Content">
          <BulletList items={[
            "1x Sponsored Editorial Feature",
            "Homepage Banner Placement",
            "SEO Optimisation & Backlinks",
          ]} />
        </Card>
        <Card icon={Smartphone} title="Social Media">
          <BulletList items={[
            "2x Instagram Reels",
            "4–6 Instagram Stories",
            "1x Facebook Editorial Amplification Post",
          ]} />
        </Card>
        <Card icon={Mail} title="Email">
          <BulletList items={[
            "1x Dedicated Solus eDM",
          ]} />
        </Card>
        <Card icon={TrendingUp} title="Paid Amplification">
          <BulletList items={[
            "Paid Social Boosting",
          ]} />
        </Card>
      </div>
    </div>
  );
}

// ─── Campaign Delivery ─────────────────────────────────────────────────────────

function EditorialFeatureSub() {
  return (
    <div className="rounded-xl border border-[#e5e5e5] bg-white p-7">
      <Eyebrow>Campaign Anchor</Eyebrow>
      <h3 className="mb-5 text-xl font-light leading-snug text-[#1a1a1a]" style={SERIF}>
        Be Among the First to Experience Kimpton Ubud
      </h3>
      <p className="mb-5 text-sm leading-7 text-[#666]">
        The campaign will be anchored by a feature editorial introducing Kimpton Ubud as one of Bali's most anticipated luxury openings. The story will include an interview with General Manager Austin, exploring:
      </p>
      <BulletList items={[
        "The vision behind Kimpton Ubud",
        "Bringing a new social energy to Ubud",
        "The hotel's design philosophy",
        "Wellness experiences including Movement Lab and Sakshi Spa",
        "Morning Kickstart, Social Hour and the Built for Humans approach",
        "Why guests should be among the first to experience the property during the September soft opening",
      ]} />
      <div className="mt-5 rounded-lg border-l-4 border-[#2BCDC4] bg-[#2BCDC4]/8 p-4">
        <p className="text-sm italic leading-6 text-[#555]">
          This article will become the central content piece, with all social, email and promotional activity driving readers back to the feature and ultimately to the Kimpton booking page.
        </p>
      </div>
    </div>
  );
}

function AugustRollout() {
  return (
    <div className="space-y-5">
      <Card title="Editorial Launch">
        <BulletList items={[
          "Sponsored Editorial Feature published",
          "SEO optimisation and backlink implementation",
        ]} />
      </Card>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#999]">Social Launch</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <MockupItem
            title="Instagram Reel #1"
            desc="Using Kimpton supplied assets — 'Be the first to experience a new social energy in Ubud with Kimpton.'"
            aspectClass="aspect-[9/16]"
            imgSrc={MOCKUP_IG_REEL_1}
          />
          <MockupItem
            title="Facebook Article Promotion"
            desc="Facebook post amplifying the editorial feature to drive traffic back to the article."
            aspectClass="aspect-[4/5]"
            imgSrc={MOCKUP_FACEBOOK_PROMO}
          />
          <MockupItem
            title="Instagram Stories"
            desc="A short story sequence introducing Kimpton Ubud."
            aspectClass="aspect-[9/16]"
            imgSrc={MOCKUP_IG_STORIES_1}
          />
        </div>
        <div className="mt-3">
          <MockupItem
            title="Homepage Banner"
            desc="Homepage banner placement goes live."
            aspectClass="aspect-[16/9]"
            imgSrc={MOCKUP_HOMEPAGE_BANNER}
            imgMaxWidthClass="max-w-[450px]"
          />
        </div>
      </div>

      <Card icon={Mail} title="Email">
        <p className="text-sm leading-6 text-[#666]">
          Dedicated Solus eDM driving readers to the editorial and Kimpton website — 'Be the first to experience the new social energy of Ubud with Kimpton.'
        </p>
      </Card>

      <Card icon={TrendingUp} title="Paid Amplification">
        <p className="text-sm leading-6 text-[#666]">
          Social boosting commences across key target markets, driving traffic to the editorial feature and booking page.
        </p>
      </Card>
    </div>
  );
}

function LateAugustSeptemberRollout() {
  return (
    <div className="space-y-5">
      <Card title="On-Property Content Shoot & Rollout">
        <p className="mb-4 text-sm leading-6 text-[#666]">
          Once the property is operational and presentation-ready, The Bali Bible team will conduct an on-site content shoot to capture authentic imagery and video of the completed guest experience. Content captured will include:
        </p>
        <BulletList items={[
          "Hotel walkthrough",
          "Guest spaces and design details",
          "Dining venues",
          "Wellness facilities",
          "Lifestyle moments throughout the property",
        ]} />
      </Card>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#999]">Social Content Rollout</p>
        <p className="mb-3 text-sm leading-6 text-[#666]">Using original Bali Bible content captured on-site, we'll release:</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <MockupItem
            title="Instagram Reel #2"
            desc="Showcasing the completed experience, filmed and edited from the on-site content shoot."
            aspectClass="aspect-[9/16]"
            imgSrc={MOCKUP_IG_REEL_2}
          />
          <MockupItem
            title="Additional Instagram Stories"
            desc="Further story content extending reach from the on-site shoot."
            aspectClass="aspect-[9/16]"
            imgSrc={MOCKUP_IG_STORIES_2}
          />
        </div>
        <div className="mt-3">
          <Card>
            <BulletList items={[
              "Supporting social content highlighting the atmosphere, design and opening experience",
            ]} />
          </Card>
        </div>
      </div>

      <Card icon={TrendingUp} title="Paid Amplification">
        <p className="text-sm leading-6 text-[#666]">
          Paid boosting will continue throughout September, maximising awareness during the hotel's soft opening period and driving qualified traffic back to Kimpton's booking platform.
        </p>
      </Card>
    </div>
  );
}

const rolloutTabs = ["August (Week 2/3)", "Late August / September"];

function TimelineRolloutSub() {
  const [active, setActive] = useState(rolloutTabs[0]);
  return (
    <div className="space-y-6">
      <SubTabBar tabs={rolloutTabs} active={active} onChange={setActive} />
      <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
        {active === "August (Week 2/3)" && <AugustRollout />}
        {active === "Late August / September" && <LateAugustSeptemberRollout />}
      </motion.div>
    </div>
  );
}

const deliveryTabs = ["Editorial Feature", "Campaign Timeline & Rollout"];

function DeliveryContent() {
  const [active, setActive] = useState(deliveryTabs[0]);
  return (
    <div>
      <SectionTitle title="Campaign Delivery" copy="Here we will dive into each specific tactic and our proposed approach." />
      <div className="space-y-6">
        <SubTabBar tabs={deliveryTabs} active={active} onChange={setActive} />
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          {active === "Editorial Feature" && <EditorialFeatureSub />}
          {active === "Campaign Timeline & Rollout" && <TimelineRolloutSub />}
        </motion.div>
      </div>
    </div>
  );
}

function BottomNav({ active, onNavigate }) {
  const idx = active === null ? -1 : TABS.indexOf(active);
  const prev = idx > 0 ? TABS[idx - 1] : null;
  const next = idx < TABS.length - 1 ? TABS[idx + 1] : null;
  if (!prev && !next && active !== null) return null;
  const firstTab = active === null ? TABS[0] : null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#e5e5e5] bg-white/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-16 py-0 md:px-24">
        {prev ? (
          <button onClick={() => onNavigate(prev)} className="flex items-center gap-2 py-4 text-sm text-[#aaa] transition hover:text-[#1a1a1a]">
            <ArrowLeft size={13} />
            <span>{prev}</span>
          </button>
        ) : <div />}
        {(next || firstTab) ? (
          <button onClick={() => onNavigate(next || firstTab)} className="flex items-center gap-2 py-4 text-sm text-[#aaa] transition hover:text-[#1a1a1a]">
            <span>{next || firstTab}</span>
            <ArrowRight size={13} />
          </button>
        ) : <div />}
      </div>
    </div>
  );
}

// ─── Tab registry ──────────────────────────────────────────────────────────────

const TABS = [
  "Introduction",
  "Campaign Key Messaging",
  "Campaign Scope",
  "Campaign Delivery",
];

function renderTab(tab) {
  switch (tab) {
    case "Introduction":            return <IntroductionContent />;
    case "Campaign Key Messaging":  return <MessagingContent />;
    case "Campaign Scope":          return <ScopeContent />;
    case "Campaign Delivery":       return <DeliveryContent />;
    default: return null;
  }
}

// ─── Root App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState("Introduction");
  const tabBarRef = useRef(null);
  const contentRef = useRef(null);

  const handleTabChange = (tab) => {
    setActive(tab);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 10);
  };

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="flex flex-col px-16 pt-10 pb-0 md:px-24">
        {/* top header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8 rounded-xl bg-[#1a1a1a] px-12 py-1">
            <BrandLogo src={BALI_BIBLE_LOGO_URL} alt="The Bali Bible" heightClass="h-7" />
            <span className="text-sm text-[#555]">×</span>
            <BrandLogo src={KIMPTON_LOGO_URL} alt="Kimpton" heightClass="h-[5.5rem]" />
          </div>
          <div className="rounded-full border border-[#e5e5e5] px-5 py-2 text-xs tracking-wider text-[#999]">
            Campaign Strategy 2026
          </div>
        </div>

        {/* main hero */}
        <div className="mt-14 max-w-4xl">
          <p className="mb-8 text-xs uppercase tracking-[0.3em] text-[#2BCDC4]">
            August – September 2026
          </p>
          <h1
            className="text-[3.2rem] font-light leading-[1.05] text-[#1a1a1a] md:text-[5rem]"
            style={SERIF}
          >
            The Bali Bible - Kimpton<br />Campaign Strategy.
          </h1>
          <p className="mt-10 max-w-lg text-base leading-7 text-[#666]">
            A two-month pre-opening campaign positioning Kimpton Ubud as one of
            Bali's most anticipated new hotel openings, building awareness
            ahead of the September soft opening through editorial
            storytelling, social content and audience amplification.
          </p>
        </div>

      </section>

      {/* ── Tab bar — sticky below hero ──────────────────────── */}
      <div
        ref={tabBarRef}
        className="sticky top-0 z-30 bg-white/95 px-16 pt-6 pb-4 backdrop-blur-md md:px-24"
      >
        <div className="flex gap-1.5 overflow-x-auto rounded-lg border border-[#e5e5e5] bg-[#f5f5f5] p-1.5">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`shrink-0 rounded-md px-4 py-2 text-sm transition ${
                active === tab
                  ? "bg-[#2BCDC4] text-white font-medium"
                  : "text-[#666] hover:bg-[#e5e5e5] hover:text-[#1a1a1a]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab content ──────────────────────────────────────── */}
      <div ref={contentRef} className="min-h-[60vh] px-16 pb-32 pt-12 md:px-24">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          {renderTab(active)}
        </motion.div>
      </div>

      <BottomNav active={active} onNavigate={handleTabChange} />
    </div>
  );
}
