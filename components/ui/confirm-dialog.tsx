import { useState } from "react"

import { AlertDialogCancel } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"

export function ConfirmDialog({
  form,
  isLoading,
}: {
  form: string
  isLoading: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)
  console.log(isLoading)
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-blue-950 text-stone-200"
          onClick={() => setIsOpen(true)}
        >
          Submit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Create New Property</DialogTitle>
              <DialogDescription>
                Create new propery with 5 tokens
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p>Do you want to create new property by spending 5 tokens?</p>
            </div>
            <DialogFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" form={form} onClick={() => {
                setIsOpen(true)}}>
                Create
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
