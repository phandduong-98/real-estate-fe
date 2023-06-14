import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckSquare } from "lucide-react"
import { PacmanLoader } from "react-spinners"

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
import { useToast } from "@/components/ui/use-toast"

export function ConfirmDialog({
  form,
  isLoading,
  isSuccess,
  data,
}: {
  form: string
  isLoading: boolean
  isSuccess: boolean
  data: any
}) {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  // const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (isSuccess) {
      const txLink = `https://mumbai.polygonscan.com/tx/${data?.hash}`
      toast({
        title: "Property Created",
        description: (
          <>
            Your property has been created.
            <br />
            <Link href={txLink} className="mt-2 text-blue-500">
              View transaction on PolygonScan.
            </Link>
          </>
        ),
      })
    }
  }, [isSuccess])

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
          <div className="flex items-center">
            <DialogTitle>Cooking the transaction</DialogTitle>
            <PacmanLoader color="#0F172A" className="ml-10" />
          </div>
        ) : isSuccess ? (
          <div className="flex justify-center">
            <CheckSquare size={150} strokeWidth={1.75} />
            <div className="flex flex-col items-center mt-5">
              <DialogTitle>Property Created</DialogTitle>
              <DialogDescription>
                Your property has been created.
              </DialogDescription>
              <Link href="/">
                <Button className="mt-4">View Properties</Button>
              </Link>
            </div>
          </div>
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
              <Button type="submit" form={form}>
                Create
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
