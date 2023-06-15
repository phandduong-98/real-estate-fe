// "use client"

// import { useEffect, useState } from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { set } from "date-fns"
// import { useFieldArray, useForm } from "react-hook-form"
// import * as z from "zod"

// import {
//   usePropertyPropertyData,
//   usePropertyUpdatePropertyData,
// } from "@/lib/generated"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import { toast } from "@/components/ui/use-toast"
// import {
//   PropertyDataDto,
//   PropertyDataSchema,
// } from "@/types/create-new-property-form"

// /*string name;
//         string description;
//         string propertyStatus;
//         string propertyType;
//         string landSize;
//         string pricePerSqft;
//         string bedrooms;
//         string bathrooms;
//         string yearBuilt;
//         string lastSoldPrice;
//         string lastSoldDate;*/


// export function PropertyDetailForm() {
//   const pathName = usePathname()
//   const address = pathName.split("/")[2]

//   const { data: propertyAddressData } = usePropertyPropertyData({
//     address: address as `0x${string}`,
//     watch: true,
//   })

//   const [data, setData] = useState<PropertyDataDto>(
//     {} as PropertyDataDto
//   )

//   const {
//     data: propertyDetailWriteData,
//     isLoading,
//     isSuccess,
//     write,
//   } = usePropertyUpdatePropertyData({
//     address: address as `0x${string}`,
//     args: [data!],
//   })

//   const defaultValues: Partial<PropertyDataDto> = {
//     unitNumber: propertyAddressData?.[0],
//     street: propertyAddressData?.[1],
//     city: propertyAddressData?.[2],
//     state: propertyAddressData?.[3],
//     zip: propertyAddressData?.[4],
//     country: propertyAddressData?.[5],
//   }

//   const form = useForm<PropertyDataDto>({
//     resolver: zodResolver(PropertyDataSchema),
//     defaultValues: defaultValues,
//   })


//   useEffect(() => {
//     setData(data)
//     write?.()
//   }, [data])

//   function onSubmit(data: PropertyDataDto) {
//     setData(data)
//     if (data === form.getValues()) {
//       write?.()
//     }
//     console.log("NO WRITE")
//   }

//   useEffect(() => {
//     if (isSuccess) {
//       toast({
//         title: "You submitted the following values:",
//         description: (
//           <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//           </pre>
//         ),
//       })
//     }
//   }, [isSuccess])

//   return (
//     // <></>
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="unitNumber"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Unit Number</FormLabel>
//               <FormControl>
//                 <Input placeholder="unit number" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="street"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Street</FormLabel>
//               <FormControl>
//                 <Input placeholder="street name" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="city"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>City</FormLabel>
//               <FormControl>
//                 <Input placeholder="City name" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="state"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>State</FormLabel>
//               <FormControl>
//                 <Input placeholder="State" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="zip"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Zip</FormLabel>
//               <FormControl>
//                 <Input placeholder="Zip code" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="country"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Country</FormLabel>
//               <FormControl>
//                 <Input placeholder="Country" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit" disabled={!write}>
//           Update address
//         </Button>
//       </form>
//     </Form>
//   )
// }

import React from 'react'

const Z = () => {
  return (
    <div>property-detail-form</div>
  )
}

export default Z
