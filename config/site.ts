export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Real Estate",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Add New Property",
      href: "/create-new-property",
    },
    {
      title: "Advertisment Pricing",
      href: "/buy-tokens",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
