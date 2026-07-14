/**
 * Codessiance '26 — Data Constants
 * All typed content for domains, timeline, sponsors, and FAQ.
 */

// ── Domain / Track Types ──
export interface Domain {
  id: string;
  name: string;
  description: string;
  teamSlots: string;
  prize: string; // TODO: Confirm final amounts for '26
  icon: string; // Lucide icon name
}

export const DOMAINS: Domain[] = [
  {
    id: "web-app",
    name: "Web / App Development",
    description: "Build stunning web or mobile applications that solve real problems.",
    teamSlots: "2–4 members",
    prize: "₹20,000", // TODO: Confirm
    icon: "Globe",
  },
  {
    id: "ai-ml",
    name: "AI / ML",
    description: "Leverage artificial intelligence and machine learning to innovate.",
    teamSlots: "2–4 members",
    prize: "₹20,000", // TODO: Confirm
    icon: "Brain",
  },
  {
    id: "industry",
    name: "Industry Track",
    description: "Tackle real-world industry challenges with creative tech solutions.",
    teamSlots: "2–4 members",
    prize: "₹20,000", // TODO: Confirm
    icon: "Factory",
  },
];

// ── Timeline Events ──
export interface TimelineEvent {
  id: string;
  time: string;
  label: string;
  day: number; // 1 = Day 1, 2 = Day 2
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  { id: "reporting", time: "08:00", label: "Reporting & Registration", day: 1 },
  { id: "inauguration", time: "10:00", label: "Inauguration", day: 1 },
  { id: "hack-start", time: "11:00", label: "Hackathon Begins", day: 1 },
  { id: "lunch", time: "13:30", label: "Lunch", day: 1 },
  { id: "mentoring", time: "19:00", label: "Mentoring Round", day: 1 },
  { id: "dinner", time: "21:00", label: "Dinner", day: 1 },
  { id: "judging-internal", time: "11:00", label: "Internal Judging", day: 2 },
  { id: "shortlist", time: "12:30", label: "Shortlist Announcement", day: 2 },
  { id: "judging-final", time: "14:00", label: "Final Judging", day: 2 },
  { id: "closing", time: "17:00", label: "Closing Ceremony & Results", day: 2 },
];

// ── Sponsors ──
export interface Sponsor {
  id: string;
  name: string;
  tier: "title" | "powered-by" | "partner";
  logo?: string; // TODO: Replace with real logo URLs
}

export const SPONSORS: Sponsor[] = [
  // TODO: Replace with actual sponsor data for '26
  { id: "sp-1", name: "Title Sponsor Co.", tier: "title" },
  { id: "sp-2", name: "Powered By Inc.", tier: "powered-by" },
  { id: "sp-3", name: "Partner Alpha", tier: "partner" },
  { id: "sp-4", name: "Partner Beta", tier: "partner" },
  { id: "sp-5", name: "Partner Gamma", tier: "partner" },
  { id: "sp-6", name: "Partner Delta", tier: "partner" },
];

// ── FAQ ──
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-who",
    question: "Who can participate?",
    answer:
      "Any undergraduate student from any college can participate. Teams of 2–4 members are welcome. Cross-college teams are allowed.",
  },
  {
    id: "faq-cost",
    question: "Is there a registration fee?",
    answer:
      "Participation details and any applicable fees will be announced on the registration platform. Stay tuned to our socials for updates.",
  },
  {
    id: "faq-apply",
    question: "How do I apply?",
    answer:
      "Register your team through our official registration link on Unstop. You'll need to submit a brief project idea during registration.", // TODO: Confirm platform
  },
  {
    id: "faq-prizes",
    question: "What are the prizes?",
    answer:
      "A total prize pool of ₹60,000+ across all tracks, along with swag, certificates, and opportunities with our sponsor partners.", // TODO: Confirm amount
  },
  {
    id: "faq-nocode",
    question: "I'm a beginner — can I still join?",
    answer:
      "Absolutely! Codessiance welcomes hackers of all skill levels. We'll have mentors available throughout the event to help guide you.",
  },
  {
    id: "faq-remote",
    question: "Is it online or offline?",
    answer:
      "Codessiance '26 is a fully offline, in-person hackathon held at TSEC campus. You'll need to be present for the entire 24-hour duration.",
  },
];

// ── Committee / Crew Members ──
export interface CrewMember {
  id: string;
  name: string;
  role: string;
  funStat: string; // "500+ commits reviewed" style stat
  avatar?: string; // TODO: Replace with real photos
}

export const CREW_MEMBERS: CrewMember[] = [
  // TODO: Replace with actual committee members for '26
  { id: "crew-1", name: "Organizer One", role: "Lead Organizer", funStat: "500+ commits reviewed" },
  { id: "crew-2", name: "Organizer Two", role: "Tech Lead", funStat: "1,200 lines of config" },
  { id: "crew-3", name: "Organizer Three", role: "Design Lead", funStat: "47 Figma frames" },
  { id: "crew-4", name: "Organizer Four", role: "Marketing Lead", funStat: "300+ DMs sent" },
  { id: "crew-5", name: "Organizer Five", role: "Logistics", funStat: "∞ pizza boxes counted" },
  { id: "crew-6", name: "Organizer Six", role: "Sponsorship Lead", funStat: "50+ cold emails" },
];

// ── Section metadata for the player bar ──
export interface SectionMeta {
  id: string;
  label: string;
  wrappedTitle: string;
}

export const SECTIONS: SectionMeta[] = [
  { id: "hero", label: "Intro", wrappedTitle: "Codessiance Wrapped '26" },
  { id: "genres", label: "Your Top Genres", wrappedTitle: "Your Top Genres" },
  { id: "artists", label: "Featured Artists", wrappedTitle: "Featured Artists" },
  { id: "timeline", label: "Minutes Listened", wrappedTitle: "Minutes Listened" },
  { id: "prizes", label: "Top Artist", wrappedTitle: "Top Artist of the Year" },
  { id: "sponsors", label: "In Rotation", wrappedTitle: "In Rotation" },
  { id: "recap", label: "Your Recap", wrappedTitle: "Your Recap" },
  { id: "outro", label: "Outro", wrappedTitle: "Add to Playlist" },
];
