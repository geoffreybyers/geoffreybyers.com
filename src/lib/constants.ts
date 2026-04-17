export const SITE = {
  title: "Geoffrey Byers",
  description:
    "Dallas, TX. Building in public. Notes, projects, and case studies from a designer-founder.",
  url: "https://geoffreybyers.com",
  email: "geoffrey@geoffreybyers.com",
} as const;

export const NAV_ITEMS = [
  { href: "/work", label: "Work" },
  { href: "/posts", label: "Posts" },
  { href: "/about", label: "About" },
  { href: "/search", label: "Search" },
] as const;

export const SOCIAL_LINKS = [
  {
    href: "https://github.com/geoffreybyers",
    label: "GitHub",
    icon: "tabler:brand-github",
  },
  {
    href: "https://x.com/geoffreybyers",
    label: "X",
    icon: "tabler:brand-x",
  },
  {
    href: "https://www.linkedin.com/in/geoffreybyers",
    label: "LinkedIn",
    icon: "tabler:brand-linkedin",
  },
  {
    href: "https://www.instagram.com/geoffreybyerss/",
    label: "Instagram",
    icon: "tabler:brand-instagram",
  },
] as const;
