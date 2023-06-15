"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  PROPERTY_MANAGER_ADDRESS,
  TEST_TOKEN_ADDRESS,
} from "@/constants/contract-artifacts"
import { ethers } from "ethers"
import { ArrowDown } from "lucide-react"

import {
  usePropertyManagerExchangeRatio,
  usePropertyManagerPurchaseTokens,
  usePropertyManagerWrite,
  useTestTokenWrite,
} from "@/lib/generated"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

const page = () => {
  
  const [maticValue, setMaticValue] = useState<string>("0")
  const [tokenValue, setTokenValue] = useState<string>("0")
  const ratio = 1000

  const handleMaticChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)  
    let result = 0
    // if (value !== 0) {    
      result = value * ratio   
      setMaticValue(e.target.value)  
    // }     
    setTokenValue(result.toString())   
  }
  
  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)  
    const result = value / ratio
    if(value !== 0) {
      setMaticValue(result.toString())
    }
    setTokenValue(value.toString())
  }

  return (
    <Card className="flex flex-col items-center w-[550px]">
      <CardHeader>
        <CardTitle>Swap</CardTitle>
        <CardDescription>
          Get your tokens and start to advertise property
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4 rounded-md">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">MATIC</Label>
              <Input
                type="number"
                value={maticValue}
                onChange={handleMaticChange}
                id="matic"
                placeholder=""
              />
            </div>
            <ArrowDown className="" />
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">TOKEN</Label>
              <Input
                type="number"
                value={tokenValue}
                onChange={handleTokenChange}
                id="token"
                placeholder=""
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
          <PurchaseTokens amount={isNaN(Number(maticValue)) || maticValue === ""? "0" : maticValue.toString()} />
      </CardFooter>
    </Card>
  )
}

function ApproveTestToken() {
  const { data, isLoading, isSuccess, write } = useTestTokenWrite({
    address: TEST_TOKEN_ADDRESS,
    functionName: "approve",
    args: [PROPERTY_MANAGER_ADDRESS, ethers.MaxUint256],
  })

  return (
    <div>
      <button
        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
        type="button"
        onClick={() => write()}
      >
        Approve
      </button>
      {isLoading ? <p>Loading ..</p> : <p></p>}
      {isSuccess ? <p>Successfully Approved ..</p> : <p></p>}
    </div>
  )
}


function PurchaseTokens({amount} : {amount: string}) {
  const { toast } = useToast()
  const { data, isLoading, isSuccess, isError, write } = usePropertyManagerPurchaseTokens({
    address: PROPERTY_MANAGER_ADDRESS,
    functionName: "purchaseTokens",
    value: ethers.parseEther(amount),
  })
  
  useEffect(() => {
    if (isSuccess) {
      const txLink = `https://mumbai.polygonscan.com/tx/${data?.hash}`
      toast({
        title: "Token Purchased",
        description: (
          <>
            Your token balance has been credited.
            <br />
            <Link href={txLink} rel="noopener noreferrer" target="_blank" className="mt-2 text-blue-500">
              View transaction on PolygonScan.
            </Link>
          </>
        ),
      })
    }
  }, [isSuccess])

  return <Button disabled={!write} onClick={()=>{
    write?.()
  }}>Purchase</Button>
}

export default page
