"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Bath, BedSingle, Scaling } from "lucide-react"

import { usePropertyRead } from "@/lib/generated"

function PropertyAddress({ contractAddress }: { contractAddress: string }) {
  const router = useRouter()

  const { data } = usePropertyRead({
    address: contractAddress as `0x${string}`,
    functionName: "propertyAddress",
  })
  if (data != undefined) {
    const addressString = data.join(", ")
    return <div>{addressString}</div>
  }
}

function PropertyData(contractAddress: string) {
  const router = useRouter()
  const { data } = usePropertyRead({
    address: contractAddress as `0x${string}`,
    functionName: "propertyData",
  })
  return data
}

const Property = ({ params }: { params: { address: string } }) => {
  var propertydata = PropertyData(params.address)
  var propertyName = ""
  var propertyDescription = ""
  var propertyStatus = ""
  var propertyType = ""
  var propertylandSize = ""
  var propertyPricePerSqft = ""
  var propertyBedrooms = ""
  var propertyBathrooms = ""
  var propertyYearBuilt = ""
  var propertyLastSoldPrice = ""
  var propertyLastSoldDate = ""

  if (propertydata != undefined) {
    propertyName = propertydata[0]
    propertyDescription = propertydata[1]
    propertyStatus = propertydata[2]
    propertyType = propertydata[3]
    propertylandSize = propertydata[4]
    propertyPricePerSqft = propertydata[5]
    propertyBedrooms = propertydata[6]
    propertyBathrooms = propertydata[7]
    propertyYearBuilt = propertydata[8]
    propertyLastSoldPrice = propertydata[9]
    propertyLastSoldDate = propertydata[10]
  }

  return (
    <div className="wrapper bg-red-50 antialiased text-gray-900">
      <div>
        <img
          src="https://plus.unsplash.com/premium_photo-1677735108001-cd9b99efd5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
          alt=" random imgee"
          className="max-h-[60rem] object-center rounded-lg shadow-md"
        />

        <div className="relative px-4 -mt-16  ">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-baseline">
              <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                {propertyStatus}
              </span>
              <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider"></div>
            </div>
            
            <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate text-orange-700">
              {propertyName}
              <PropertyAddress contractAddress={params.address} />
            </h4>
            <br></br>
            <div >{propertyDescription}</div>
            <br></br>
            <div className="flex items-stretch ...">
              <div className="text-rose-950">{propertyBedrooms}&nbsp;</div>
              <BedSingle color="#209d73" strokeWidth={1} />
              <div className="text-rose-950">&nbsp;&nbsp;&nbsp;{propertyBathrooms}&nbsp;</div>
              <Bath color="#209d73" strokeWidth={1} />
              <div className="text-rose-950">&nbsp;&nbsp;&nbsp;{propertylandSize}&nbsp;</div>
              <Scaling color="#209d73" strokeWidth={1} />
              <div className="text-rose-950">&nbsp;&nbsp;&nbsp;{propertyType}&nbsp;</div>
            </div>
            <br></br>
            <div className="text-rose-950">{propertyYearBuilt}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Property
