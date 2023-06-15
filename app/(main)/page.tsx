"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  PROPERTY_MANAGER_ADDRESS,
  TEST_TOKEN_ADDRESS,
} from "@/constants/contract-artifacts"
import { dataSlice, ethers } from "ethers"
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
  usePropertyManagerGetProperties,
  usePropertyManagerRead,
  usePropertyManagerWrite,
  usePropertyOwner,
  usePropertyRead,
  usePropertyWrite,
  useTestTokenRead,
  useTestTokenWrite,
} from "@/lib/generated"
import { cn, stringify } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import CreateNewPropertyForm from "@/app/(main)/_components/CreateNewPropertyForm"

import { FormToast } from "./_components/CreateNewPropertyFormToaster"
import { ProfileForm } from "./_components/PropertyDataForm"

export default async function IndexPage() {
  const { data, isError, isLoading } = usePropertyManagerGetProperties({
    address: PROPERTY_MANAGER_ADDRESS,
  })

  // if(isLoading) return <Skeleton className="w-[100px] h-[20px] rounded-full"/>
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h2 className="text-red-700 font-bold">Find your properties</h2>
      <div className="grid grid-cols-4 gap-12 px-16">
        {data?.filter((_, index) => index !== 19 && index >= 18).map((property, index) => (
          <div key={index} className="col-span-1 ">
            <PropertyCard contractAddress={property} />
          </div>
        ))}
      </div>
    </section>
  )
}

function Balance(props: { account: string | undefined }) {
  const { data, isError, isLoading } = useBalance({
    address: props.account as `0x${string}`,
  })

  if (isLoading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />
  if (isError) return <div>Error fetching balance</div>
  return (
    <div>
      Balance: {data?.formatted} {data?.symbol}
    </div>
  )
}

function ReadPropertyManager() {
  const { data, isError, isLoading } = usePropertyManagerRead({
    address: PROPERTY_MANAGER_ADDRESS,
    functionName: "owner",
    // args: [],
  })

  if (isLoading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />
  if (isError) return <div>Error fetching owner</div>
  return <div>{data}</div>
}

function PropertyCard({ contractAddress }: { contractAddress: string }) {
  const router = useRouter()  
  const { data } = usePropertyRead({
    address: contractAddress as `0x${string}`,
    functionName: "propertyAddress",
  })
  const { data: images } = usePropertyRead({
    address: contractAddress as `0x${string}`,
    functionName: "getImagesCid",
  })

  console.log(data)

  if (data != undefined) {
    const addressString = data.join(", ")
    return (
      <Card className="flex flex-col items-center overflow-hidden h-full w-full border-none">
        <CardHeader className="p-0 relative">
          <div className="relative rounded-md">
            <p className="text-zinc-100 absolute z-10 top-5 left-5 font-semibold text-xl drop-shadow-2xl">{`${data[2]},${data[3]}`}</p>
            <img
              alt=""
              height={330}
              width={250}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-110",
                "aspect-[3/4] rounded-md z-0 duration-1000"
              )}
              src={`https://cloudflare-ipfs.com/ipfs/${images?.[0]}`}
            ></img>
            <Button
              variant="outline"
              className="left-5 z-10 bottom-4 bg-slate-400 absolute bg-opacity-50 text-white"
              onClick={() => router.push(`/properties/${contractAddress}`)}
            >
              View Property
            </Button>
            {/* <CardFooter className="flex justify-between p-0">
    
        </CardFooter> */}
          </div>
        </CardHeader>
      </Card>
    )
  }
}
