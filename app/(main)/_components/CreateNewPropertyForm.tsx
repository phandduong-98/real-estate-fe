"use client"

import React, { useEffect, useState } from "react"
import {
  PROPERTY_MANAGER_ADDRESS,
  TEST_TOKEN_ADDRESS,
} from "@/constants/contract-artifacts"
import {
  propertyAddressDefaultData,
  propertyDataDefaultData,
  propertyImagesDefaultData,
  propertyOwnerDefaultData,
} from "@/constants/contract-artifacts/propertyDefaultValue"
import { zodResolver } from "@hookform/resolvers/zod"
import { dataLength } from "ethers"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  CreateNewPropertyDto,
  FinalPropertyFormData,
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
import { usePropertyManagerCreateNewProperty } from "@/lib/generated"
import { formatLabel, separateString } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
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
import { useToast } from "@/components/ui/use-toast"
import { DatePicker } from "@/components/date-picker"

const CreateNewPropertyForm = () => {
  const [nextForm, setNextForm] = useState(0)
  const [fullFormData, setFullFormData] = useState<PropertyFormData>([
    {} as PropertyAddressDto,
    {} as PropertyDataDto,
    {} as PropertyOwnerContactDto,
    [] as string[],
  ])

  const [finalFullFormData, setFinalFullFormData] =
    useState<FinalPropertyFormData>()

  const { data, isLoading, isSuccess, write } =
    usePropertyManagerCreateNewProperty({
      address: PROPERTY_MANAGER_ADDRESS,
      args: finalFullFormData,
    })

  const formAddress = useForm<PropertyAddressDto>({
    resolver: zodResolver(PropertyAddressSchema),
    defaultValues: propertyAddressDefaultData,
  })

  const formData = useForm<PropertyDataDto>({
    resolver: zodResolver(PropertyDataSchema),
    defaultValues: propertyDataDefaultData,
  })

  const formContact = useForm<PropertyOwnerContactDto>({
    resolver: zodResolver(PropertyOwnerContactSchema),
    defaultValues: propertyOwnerDefaultData,
  })

  const formImages = useForm<z.infer<typeof ImagesSchema>>({
    resolver: zodResolver(ImagesSchema),
    defaultValues: {
      images: propertyImagesDefaultData,
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
      let newFormData = [...prevFormData]
      newFormData[3] = imagesArray
      return newFormData
    })
    console.log("fullFormData", fullFormData)
  }

  useEffect(() => {
    console.log("fullFormData updated", fullFormData)
    if (fullFormData[3].length <= 0) return
    const newFullFormData = fullFormData.map((data, index) => {
      if (index === 1) {
        const { lastSoldDate, ...rest } = data as PropertyDataDto
        return {
          ...rest,
          lastSoldDate: lastSoldDate.toISOString().substring(0, 10),
        }
      }
      return data
    })
    setFinalFullFormData(newFullFormData as FinalPropertyFormData)
  }, [fullFormData])

  useEffect(() => {
    console.log("finalFullFormData updated", finalFullFormData)

    if (finalFullFormData?.length === 4 && finalFullFormData[3].length > 0) {
      write?.()
    }
  }, [finalFullFormData])

  // if (isLoading) return <div>Loading...</div>
  // if(isSuccess) toast({
  //   title: "Property Created",
  //   description: "Your property has been created successfully",
  // })

  return (
    <div>
      <Form {...formAddress}>
        <form
          onSubmit={formAddress.handleSubmit(handleFormSubmit)}
          className="space-y-3"
        >
          {nextForm === 0 && (
            <div>
              {Object.entries(PropertyAddressSchema.shape).map(([key]) => (
                <div key={key}>
                  <FormField
                    control={formAddress.control}
                    name={`${key as keyof PropertyAddressDto}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{formatLabel(key)}</FormLabel>
                        <FormControl>
                          <Input placeholder={formatLabel(key)} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <div className="flex w-full justify-end">
                <Button type="submit" className="mt-3 items-end">
                  Next
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>

      {nextForm === 1 && (
        <Form {...formData}>
          <form
            onSubmit={formData.handleSubmit(handleFormSubmit)}
            className="space-y-3"
          >
            {Object.entries(PropertyDataSchema.shape).map(([key, value]) => (
              <div key={key}>
                <FormField
                  control={formData.control}
                  name={`${key}` as keyof PropertyDataDto}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{formatLabel(key)}</FormLabel>
                      <FormControl>
                        {key === "lastSoldDate" ? (
                          <div>
                            <DatePicker />
                          </div>
                        ) : (
                          <Input
                            placeholder={formatLabel(key)}
                            {...(field as any)}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <div className="flex justify-between">
              <Button
                className="mt-1"
                variant="outline"
                onClick={() => {
                  setNextForm((prevFormNo) => prevFormNo - 1)
                }}
              >
                Previous
              </Button>
              <Button type="submit" className="mt-1">
                Next
              </Button>
            </div>
          </form>
        </Form>
      )}

      {nextForm === 2 && (
        <Form {...formContact}>
          <form
            onSubmit={formContact.handleSubmit(handleFormSubmit)}
            className="space-y-3"
          >
            {Object.entries(PropertyOwnerContactSchema.shape).map(
              ([key, value]) => (
                <div key={key}>
                  <FormField
                    control={formContact.control}
                    name={`${key}` as keyof PropertyOwnerContactDto}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{formatLabel(key)}</FormLabel>
                        <FormControl>
                          <Input placeholder={formatLabel(key)} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )
            )}
            <div className="flex justify-between">
              <Button
                onClick={() => {
                  setNextForm((prevFormNo) => prevFormNo - 1)
                }}
                className="mt-1"
                variant="outline"
              >
                Previous
              </Button>
              <Button type="submit" className="mt-1">
                Next
              </Button>
            </div>
          </form>
        </Form>
      )}

      {nextForm === 3 && (
        <Form {...formImages}>
          <form
            id="final-form"
            onSubmit={formImages.handleSubmit(handleAllFormSubmit)}
            className="space-y-3"
          >
            <div key="images">
              <FormField
                control={formImages.control}
                name={`images`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>{"CID of Image."}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between">
              <Button
                onClick={() => {
                  setNextForm((prevFormNo) => prevFormNo - 1)
                }}
                className="mt-1"
                variant="outline"
              >
                Previous
              </Button>
              <div className="mt-1">
                <ConfirmDialog
                  form="final-form"
                  isLoading={isLoading}
                  isSuccess={isSuccess}
                  data={data}
                  title={"Create Property"}
                  description="Your property has been created successfully"
                />
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export default CreateNewPropertyForm
