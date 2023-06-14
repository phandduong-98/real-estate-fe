import * as z from "zod"

import { positiveNumberString } from "@/lib/utils"

export const CreateNewPropertySchema = z.object({
  propertyAddress: z.object({
    unitNumber: z.string().nonempty(),
    street: z.string().nonempty(),
    city: z.string().nonempty(),
    state: z.string().nonempty(),
    zip: z.string().nonempty(),
    country: z.string().nonempty(),
  }),
  propertyData: z.object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    propertyStatus: z.string().nonempty(),
    propertyType: z.string().nonempty(),
    landSize: positiveNumberString("landSize"),
    pricePerSqft: positiveNumberString("pricePerSqft"),
    bedrooms: positiveNumberString("bedrooms"),
    bathrooms: positiveNumberString("bathrooms"),
    yearBuilt: positiveNumberString("yearBuilt"),
    lastSoldPrice: positiveNumberString("lastSoldPrice"),
    lastSoldDate: z.string().nonempty(),
  }),
  propertyOwnerContact: z.object({
    name: z.string().nonempty(),
    email: z.string().email(),
    phone: z.string().nonempty(),
  }),
  images: z.array(z.string().length(46, "Items must be 46 characters long")),
})

export const PropertyDataSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  propertyStatus: z.string().nonempty(),
  propertyType: z.string().nonempty(),
  landSize: positiveNumberString("landSize"),
  pricePerSqft: positiveNumberString("pricePerSqft"),
  bedrooms: positiveNumberString("bedrooms"),
  bathrooms: positiveNumberString("bathrooms"),
  yearBuilt: positiveNumberString("yearBuilt"),
  lastSoldPrice: positiveNumberString("lastSoldPrice"),
  lastSoldDate: z.date(),
})

export const PropertyStringDataSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  propertyStatus: z.string().nonempty(),
  propertyType: z.string().nonempty(),
  landSize: positiveNumberString("landSize"),
  pricePerSqft: positiveNumberString("pricePerSqft"),
  bedrooms: positiveNumberString("bedrooms"),
  bathrooms: positiveNumberString("bathrooms"),
  yearBuilt: positiveNumberString("yearBuilt"),
  lastSoldPrice: positiveNumberString("lastSoldPrice"),
  lastSoldDate: z.string().nonempty(),
})

export const PropertyOwnerContactSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  phone: z.string().nonempty(),
})

export const PropertyAddressSchema = z.object({
  unitNumber: z.string().nonempty(),
  street: z.string().nonempty(),
  city: z.string().nonempty(),
  state: z.string().nonempty(),
  zip: z.string().nonempty(),
  country: z.string().nonempty(),
})

export const PropertyImagesSchema = z.array(
  z.string().length(46, "Items must be 46 characters long")
)

export const ImagesSchema = z.object({
  images: z.string(),
})

// export type

export type CreateNewPropertyDto = z.infer<typeof CreateNewPropertySchema>
export type PropertyAddressDto = z.infer<typeof PropertyAddressSchema>
export type PropertyDataDto = z.infer<typeof PropertyDataSchema>
export type PropertyOwnerContactDto = z.infer<typeof PropertyOwnerContactSchema>
export type PropertyImagesDto = z.infer<typeof PropertyImagesSchema>
export type PropertyStringDataDto = z.infer<typeof PropertyStringDataSchema>
export type PropertyFormData = [
  PropertyAddressDto,
  PropertyDataDto,
  PropertyOwnerContactDto,
  PropertyImagesDto
]
export type FinalPropertyFormData = [
  PropertyAddressDto,
  PropertyStringDataDto,
  PropertyOwnerContactDto,
  PropertyImagesDto
]

// export type PropertyFormData = PropertyAddressDto | PropertyDataDto | PropertyOwnerContactDto | PropertyImagesDto
