"use client"

import React from "react"
import { TEST_TOKEN_ADDRESS } from "@/constants/contract-artifacts"
import { ethers } from "ethers"
import { Wallet } from "lucide-react"

import { useTestTokenRead } from "@/lib/generated"
import { Skeleton } from "@/components/ui/skeleton"

const TokenBalance = ({ address }: { address: string }) => {
  const { data, isError, isLoading } = useTestTokenRead({
    address: TEST_TOKEN_ADDRESS,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  })
  if (isLoading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />
  if (isError) return <div>Error fetching balance</div>
  return (
    <div className="flex">
      <Wallet className="mr-2" color="#209d73" strokeWidth={1} />
      {ethers.formatEther(data!)}
    </div>
  )
}

export default TokenBalance
