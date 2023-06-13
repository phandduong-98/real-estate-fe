import { defineConfig } from "@wagmi/cli"
import { hardhat, react } from "@wagmi/cli/plugins"

export default defineConfig({
  out: "lib/generated.ts",
  contracts: [],
  plugins: [
    hardhat({
      project: "../real-estate-contracts",
    }),
    react(),
  ],
})
