import React from "react"
import { Separator } from "@/components/ui/separator"
import { PropertyOwnerForm } from "./owner-form"


const SettingOwnerDetailsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Contact</h3>
        <p className="text-sm text-muted-foreground">
          Update your contact information.
        </p>
      </div>
      <Separator />
      <PropertyOwnerForm />
    </div>
  )
}

export default SettingOwnerDetailsPage
