"use client"

import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import TokenBalance from "@/app/(main)/_components/TokenBalance"

import { UserNav } from "./user-nav"

export function SiteHeader() {
  const { address, isConnecting, isDisconnected } = useAccount()
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {isConnecting ? <p>Connecting...</p> : <p></p>}
            {isDisconnected ? <p>Sign in to Purchase</p> : <p></p>}
            {address ? (
              <TokenBalance address={address as `0x${string}`} />
            ) : (
              <p></p>
            )}

            <ThemeToggle />
            <ConnectButton />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  )
}
