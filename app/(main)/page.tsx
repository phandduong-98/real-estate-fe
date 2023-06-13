"use client"

import Link from "next/link"
import {
  PROPERTY_MANAGER_ADDRESS,
  TEST_TOKEN_ADDRESS,
} from "@/constants/contract-artifacts"
import { ethers } from "ethers"
import {
  useAccount,
  useBalance,
  useConnect,
  useContractRead,
  useContractReads,
  useEnsName,
} from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"

import { siteConfig } from "@/config/site"
import {
  usePropertyManagerRead,
  usePropertyManagerWrite,
  useTestTokenRead,
  useTestTokenWrite,
} from "@/lib/generated"
import { stringify } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import CreateNewPropertyForm from "@/app/(main)/_components/CreateNewPropertyForm"

import { ProfileForm } from "./_components/PropertyDataForm"

export default function IndexPage() {
  const { address, isConnecting, isDisconnected } = useAccount()

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        {/* <Balance account={address} />
        <ReadPropertyManager />
        {/* <CreateNewPropertyForm />
      <ProfileForm /> */}
        MAIN PAGE
        <PurchaseTokens />
        <ReadTestToken />
        <ApproveTestToken />
      </div>
    </section>
  )
}

function Balance(props: { account: string | undefined }) {
  const { data, isError, isLoading } = useBalance({
    address: props.account as `0x${string}`,
  })

  if (isLoading) return <div>Fetching balance…</div>
  if (isError) return <div>Error fetching balance</div>
  return (
    <div>
      Balance: {data?.formatted} {data?.symbol}
    </div>
  )
}

function ReadTestToken() {
  const { data, isError, isLoading } = useTestTokenRead({
    address: TEST_TOKEN_ADDRESS,
    functionName: "balanceOf",
    args: ["0x8683301fE5Cf1c9AbcF2BDC5fbCB7370Ea0147FE"],
  })

  if (isLoading) return <div>Fetching balance…</div>
  if (isError) return <div>Error fetching balance</div>
  return <div>Balance: {ethers.formatEther(data!)}</div>
}

function ApproveTestToken() {
  const { data, isLoading, isSuccess, write } = useTestTokenWrite({
    address: TEST_TOKEN_ADDRESS,
    functionName: "approve",
    args: [PROPERTY_MANAGER_ADDRESS, ethers.MaxUint256],
  })
  if(isLoading) return <div>Loading</div>
  if(isSuccess) return <div>Success</div>
  return (
    <div>
      <Button onClick={() => write()}>Approve</Button>
    </div>
  )
}
function ReadPropertyManager() {
  const { data, isError, isLoading } = usePropertyManagerRead({
    address: PROPERTY_MANAGER_ADDRESS,
    functionName: "owner",
    // args: [],
  })

  if (isLoading) return <div>Fetching owner</div>
  if (isError) return <div>Error fetching owner</div>
  return <div>{data}</div>
}

function PurchaseTokens() {
  const { data, isLoading, isSuccess, write } = usePropertyManagerWrite({
    address: PROPERTY_MANAGER_ADDRESS,
    functionName: "purchaseTokens",
    value: ethers.parseEther("0.1"),
  })

  return (
    <div>
      <Button onClick={() => write()}>purchase</Button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  )
}
