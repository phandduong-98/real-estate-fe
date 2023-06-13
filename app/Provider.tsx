"use client"

import "@rainbow-me/rainbowkit/styles.css"
import * as React from "react"
import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit"
import { WagmiConfig, configureChains, createConfig } from "wagmi"
import {
  Chain,
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
  sepolia,
} from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [polygonMumbai, goerli, sepolia]
      : []),
  ],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY! }),
    publicProvider(),
  ]
)

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID

const { wallets } = getDefaultWallets({
  appName: "Real Estate dApp",
  projectId,
  chains,
})

const appInfo = {
  appName: "Real Estate dApp",
}

const connectors = connectorsForWallets([...wallets])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={appInfo}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
