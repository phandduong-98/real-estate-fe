import { Separator } from "@/components/ui/separator"

import { PropertyAddressForm } from "./property-address-form"

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Property Address</h3>
        <p className="text-sm text-muted-foreground"></p>
      </div>
      <Separator />
      <PropertyAddressForm />
    </div>
  )
}
