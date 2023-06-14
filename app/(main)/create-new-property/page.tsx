"use client"

import Link from "next/link"
import {
  PROPERTY_MANAGER_ADDRESS,
  TEST_TOKEN_ADDRESS,
} from "@/constants/contract-artifacts"
import { ethers } from "ethers"
import { set } from "react-hook-form"
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
} from "@/lib/generated"
import { stringify } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import CreateNewPropertyForm from "@/app/(main)/_components/CreateNewPropertyForm"

import { ProfileForm } from "../_components/PropertyDataForm"

export default async function CreateNewPropertyPage() {
  return (
    <section className="container flex items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex w-screen flex-col items-center gap-2">
        <CreateNewPropertyForm />
      </div>
    </section>
  )
}
