"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { set } from "date-fns"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import {
  usePropertyPropertyAddress,
  usePropertyUpdatePropertyAddress,
} from "@/lib/generated"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const propertyAddressFormSchema = z.object({
  unitNumber: z.string().min(1, {
    message: "Unitnumber must be at least 1 characters.",
  }),
  street: z.string(),
  city: z.string().max(160).min(2),
  state: z.string().max(160).min(2),
  zip: z.string().max(160).min(2),
  country: z.string().max(160).min(2),
})

type PropertyAddressFormValues = z.infer<typeof propertyAddressFormSchema>

export function PropertyAddressForm() {
  const pathName = usePathname()
  const address = pathName.split("/")[2]

  const { data: propertyAddressData } = usePropertyPropertyAddress({
    address: address as `0x${string}`,
    watch: true,
  })

  const [data, setData] = useState<PropertyAddressFormValues>(
    {} as PropertyAddressFormValues
  )

  const {
    data: propertyAddessWriteData,
    isLoading,
    isSuccess,
    write,
  } = usePropertyUpdatePropertyAddress({
    address: address as `0x${string}`,
    args: [data],
  })

  const defaultValues: Partial<PropertyAddressFormValues> = {
    unitNumber: propertyAddressData?.[0],
    street: propertyAddressData?.[1],
    city: propertyAddressData?.[2],
    state: propertyAddressData?.[3],
    zip: propertyAddressData?.[4],
    country: propertyAddressData?.[5],
  }

  const form = useForm<PropertyAddressFormValues>({
    resolver: zodResolver(propertyAddressFormSchema),
    defaultValues,
    mode: "onChange",
  })

  useEffect(() => {
    setData(data)
    write?.()
  }, [data])

  function onSubmit(data: PropertyAddressFormValues) {
    setData(data)
    if (data === form.getValues()) {
      write?.()
    }
    console.log("NO WRITE")
  }

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    }
  }, [isSuccess])

  return (
    // <></>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="unitNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Number</FormLabel>
              <FormControl>
                <Input placeholder="unit number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street</FormLabel>
              <FormControl>
                <Input placeholder="street name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="State" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip</FormLabel>
              <FormControl>
                <Input placeholder="Zip code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!write}>
          Update address
        </Button>
      </form>
    </Form>
  )
}
