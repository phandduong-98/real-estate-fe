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
  usePropertyOwner,
  usePropertyRead,
  usePropertyWrite,
  useTestTokenRead,
  useTestTokenWrite,
  usePropertyManagerGetProperties
} from "@/lib/generated"
import { stringify } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CreateNewPropertyForm from "@/app/(main)/_components/CreateNewPropertyForm"
import { useRouter } from 'next/navigation'
import { ProfileForm } from "./_components/PropertyDataForm"

export default function IndexPage() {
  const { address, isConnecting, isDisconnected } = useAccount()
  const { data, isError, isLoading } = usePropertyManagerGetProperties({
    address: PROPERTY_MANAGER_ADDRESS,
  })

  if(isLoading) return <div>Loading...</div>

  console.log(data)
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h2 className="text-red-700 font-bold">Find your properties</h2>
        {data?.map((property) => (
            <PropertyCard contractAddress={property} />
        ))}
        {/* <PropertyCard contractAddress={}/> */}
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

function ReadPropertyOwner() {
  const { data, isError, isLoading } = usePropertyRead({
    address: "0xcbA2534c14244381C040e908c684AcD1EB7098eb",
    functionName: "propertyOwnerContact",
    // args: [],
  })

  if (isLoading) return <div>Fetching owner</div>
  if (isError) return <div>Error fetching owner</div>
  return <div>AMAL PROPERTY CONTRACT ADDRESS {data}</div>
}


function PropertyCard({contractAddress} : {contractAddress: string}) {
  const router = useRouter()
  
  const { data} = usePropertyRead({
    address: contractAddress as `0x${string}`,
    functionName: "propertyAddress",
  })
  if (data != undefined)
  {
    const addressString = data.join(", ")
    return (
      <Card>
        <CardHeader>
          <CardContent>{addressString}</CardContent>
          <svg className="fill-current text-teal-500 inline-block h-12 w-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M18 9.87V20H2V9.87a4.25 4.25 0 0 0 3-.38V14h10V9.5a4.26 4.26 0 0 0 3 .37zM3 0h4l-.67 6.03A3.43 3.43 0 0 1 3 9C1.34 9 .42 7.73.95 6.15L3 0zm5 0h4l.7 6.3c.17 1.5-.91 2.7-2.42 2.7h-.56A2.38 2.38 0 0 1 7.3 6.3L8 0zm5 0h4l2.05 6.15C19.58 7.73 18.65 9 17 9a3.42 3.42 0 0 1-3.33-2.97L13 0z"/>
          </svg>
        
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"   onClick={() => router.push(`/properties/${contractAddress}`)}>Go to</Button>
      </CardFooter>
    </Card>
  )}
}
