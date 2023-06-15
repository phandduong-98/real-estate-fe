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

export function InputConfirmDialog({
  form,
  isLoading,
  isSuccess,
  data,
  title,
  description,
  write,
  confirmButton,
  dialogTitle,
  dialogDescription,
  dialogConfirmButton,
  dialogContent,
}: {
  form: string
  isLoading: boolean
  isSuccess: boolean
  data: any
  title: string
  description: string
  write: any
  confirmButton: string
  dialogTitle: string
  dialogDescription: string
  dialogConfirmButton: string
  dialogContent: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()
  const handleWrite = () => {
    write?.()
  }
  // const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (isSuccess) {
      const txLink = `https://mumbai.polygonscan.com/tx/${data?.hash}`
      toast({
        title: title,
        description: (
          <>
            {description}
            <br />
            <Link
              href={txLink}
              rel="noopener noreferrer"
              target="_blank"
              className="mt-2 text-blue-500"
            >
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
              <DialogDescription>{dialogDescription}</DialogDescription>
              <Link href="/">
                <Button className="mt-4">{dialogConfirmButton}</Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
              <DialogDescription>{dialogDescription}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p>{dialogContent}</p>
            </div>
            <DialogFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleWrite}>
                {confirmButton}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
