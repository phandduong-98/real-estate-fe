"use client"

import React, { useEffect, useState } from "react"
import { PROPERTY_MANAGER_ADDRESS } from "@/constants/contract-artifacts"
import { zodResolver } from "@hookform/resolvers/zod"
import { dataLength } from "ethers"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  CreateNewPropertyDto,
  ImagesSchema,
  PropertyAddressDto,
  PropertyAddressSchema,
  PropertyDataDto,
  PropertyDataSchema,
  PropertyFormData,
  PropertyImagesDto,
  PropertyImagesSchema,
  PropertyOwnerContactDto,
  PropertyOwnerContactSchema,
} from "@/types/create-new-property-form"
import {
  usePropertyManagerCreateNewProperty,
  usePropertyManagerWrite,
} from "@/lib/generated"
import { separateString } from "@/lib/utils"
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

const CreateNewPropertyForm = () => {
  const [nextForm, setNextForm] = useState(0)
  const [fullFormData, setFullFormData] = useState<PropertyFormData>([] as any)

  const { data, isLoading, isSuccess, write } =
    usePropertyManagerCreateNewProperty({
      address: PROPERTY_MANAGER_ADDRESS,
      args: fullFormData,
    })

  const formAddress = useForm<PropertyAddressDto>({
    resolver: zodResolver(PropertyAddressSchema),
  })

  const formData = useForm<PropertyDataDto>({
    resolver: zodResolver(PropertyDataSchema),
  })

  const formContact = useForm<PropertyOwnerContactDto>({
    resolver: zodResolver(PropertyOwnerContactSchema),
  })

  const formImages = useForm<z.infer<typeof ImagesSchema>>({
    resolver: zodResolver(ImagesSchema),
    defaultValues: {
      images:
        "QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR, QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR, QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR",
    },
  })
  const handleFormSubmit = (
    data:
      | PropertyAddressDto
      | PropertyDataDto
      | PropertyOwnerContactDto
      | PropertyImagesDto
  ) => {
    setFullFormData((prevFormData): any => {
      let newFormData = [...prevFormData]
      if ("unitNumber" in data) {
        newFormData[0] = { ...data }
      } else if ("propertyType" in data) {
        newFormData[1] = { ...data }
      } else if ("email" in data) {
        newFormData[2] = { ...data }
      }
      return newFormData
    })
    setNextForm((prevFormNo) => prevFormNo + 1)
  }

  const handleAllFormSubmit = () => {
    const images = formImages.getValues().images
    const imagesArray = separateString(images)
    setFullFormData((prevFormData): any => {
      let newFormData = [...prevFormData, imagesArray]
      return newFormData
    })
    console.log("fullFormData", fullFormData)

    write?.()
  }

  useEffect(() => {
    console.log("fullFormData updated", fullFormData)
    const transformArray = fullFormData.map((obj) => {
      return Object.values(obj)
    })
    console.log("transformArray", transformArray)
  }, [fullFormData])

  return (
    <div>
      <Form {...formAddress}>
        <form
          onSubmit={formAddress.handleSubmit(handleFormSubmit)}
          className="space-y-8"
        >
          {nextForm === 0 && (
            <div>
              {Object.entries(PropertyAddressSchema.shape).map(
                ([key, value]) => (
                  <div key={key}>
                    <FormField
                      control={formAddress.control}
                      name={`${key}` as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{key}</FormLabel>
                          <FormControl>
                            <Input placeholder="a" {...field} />
                          </FormControl>
                          <FormDescription>
                            {value._def.description ||
                              "No description provided."}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )
              )}
              <Button type="submit">Next</Button>
            </div>
          )}
        </form>
      </Form>

      {nextForm === 1 && (
        <Form {...formData}>
          <form
            onSubmit={formData.handleSubmit(handleFormSubmit)}
            className="space-y-8"
          >
            {Object.entries(PropertyDataSchema.shape).map(([key, value]) => (
              <div key={key}>
                <FormField
                  control={formData.control}
                  name={`${key}` as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{key}</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>
                        {value._def.description || "No description provided."}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <Button type="submit">Next</Button>
          </form>
        </Form>
      )}

      {nextForm === 2 && (
        <Form {...formContact}>
          <form
            onSubmit={formContact.handleSubmit(handleFormSubmit)}
            className="space-y-8"
          >
            {Object.entries(PropertyOwnerContactSchema.shape).map(
              ([key, value]) => (
                <div key={key}>
                  <FormField
                    control={formContact.control}
                    name={`${key}` as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{key}</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormDescription>
                          {value._def.description || "No description provided."}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )
            )}
            <Button type="submit">Next</Button>
          </form>
        </Form>
      )}

      {nextForm === 3 && (
        <Form {...formImages}>
          <form
            onSubmit={formImages.handleSubmit(handleAllFormSubmit)}
            className="space-y-8"
          >
            <div key="images">
              <FormField
                control={formImages.control}
                name={`images`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>images</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>{"CID of Image."}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )}
    </div>
  )
}

export default CreateNewPropertyForm
