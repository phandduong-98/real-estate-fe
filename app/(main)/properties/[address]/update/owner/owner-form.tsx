"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { set } from "date-fns"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import {
  usePropertyPropertyOwnerContact,
  usePropertyUpdatePropertyOwnerContact,
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

const propertyOwnerFormSchema = z.object({
  name: z.string().min(1, {
    message: "name must be at least 1 characters.",
  }),
  email: z.string().email(),
  phone: z.string().max(160).min(2),
})

type PropertyOwnerFormValues = z.infer<typeof propertyOwnerFormSchema>

export function PropertyOwnerForm() {
  const pathName = usePathname()
  const address = pathName.split("/")[2]

  const { data: propertyOwnerData } = usePropertyPropertyOwnerContact({
    address: address as `0x${string}`,
    watch: true,
  })

  const [data, setData] = useState<PropertyOwnerFormValues>(
    {} as PropertyOwnerFormValues
  )

  const {
    data: propertyAddessWriteData,
    isLoading,
    isSuccess,
    write,
  } = usePropertyUpdatePropertyOwnerContact({
    address: address as `0x${string}`,
    args: [data],
  })

  const defaultValues: Partial<PropertyOwnerFormValues> = {
    name: propertyOwnerData?.[0],
    email: propertyOwnerData?.[1],
    phone: propertyOwnerData?.[2],
   
  }

  const form = useForm<PropertyOwnerFormValues>({
    resolver: zodResolver(propertyOwnerFormSchema),
    defaultValues,
    mode: "onChange",
  })

  useEffect(() => {
    setData(data)
    write?.()
  }, [data])

  function onSubmit(data: PropertyOwnerFormValues) {
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Contact number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!write}>
          Update contact
        </Button>
      </form>
    </Form>
  )
}
