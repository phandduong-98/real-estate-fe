import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import TokenBalance from "@/app/(main)/_components/TokenBalance"

import { UserNav } from "./user-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <TokenBalance address="0xdFA4C3D580479eAb0dd0122cd6661fdc3215239f" />
            <ThemeToggle />
            <ConnectButton />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  )
}
