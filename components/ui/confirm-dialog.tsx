import { useEffect, useState } from "react"
import Link from "next/link"
import {
  PROPERTY_MANAGER_ADDRESS,
  TEST_TOKEN_ADDRESS,
} from "@/constants/contract-artifacts"
import { CheckSquare } from "lucide-react"
import { BeatLoader, PacmanLoader } from "react-spinners"
import { useAccount } from "wagmi"

import {
  usePropertyManagerCreateNewProperty,
  usePropertyManagerFee,
  usePropertyManagerWrite,
  useTestTokenAllowance,
  useTestTokenApprove,
} from "@/lib/generated"
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
  title,
  description,
}: {
  form: string
  isLoading: boolean
  isSuccess: boolean
  data: any
  title: string
  description: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

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
              <ApproveButton form={form} />
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

const ApproveButton = ({ form }: any) => {
  const { address, isConnecting, isDisconnected } = useAccount()

  const {
    data: accountAllowance,
    isLoading: allowanceIsLoading,
    refetch: refetchAllowance,
  } = useTestTokenAllowance({
    address: TEST_TOKEN_ADDRESS,
    args: [address!, PROPERTY_MANAGER_ADDRESS],
    watch: true,
  })

  const { data: fee, refetch: refetchFee } = usePropertyManagerFee({
    address: PROPERTY_MANAGER_ADDRESS,
    watch: true,
  })

  const {
    data: approve,
    isLoading,
    isSuccess,
    status,
    write,
    writeAsync,
  } = useTestTokenApprove({
    address: TEST_TOKEN_ADDRESS,
    args: [PROPERTY_MANAGER_ADDRESS, fee!],
  })

  const [isApproved, setIsApproved] = useState(false)

  useEffect(() => {
    refetchFee()
    refetchAllowance()
    console.log("status", status)
    if (accountAllowance && fee) {
      if (accountAllowance >= fee) {
        setIsApproved(true)
        console.log("inside if", accountAllowance, fee)
      }
    }
    console.log("isSuccess", isSuccess)
    console.log("isApproved", isApproved)
  }, [
    accountAllowance,
    fee,
    isLoading,
    isSuccess,
    usePropertyManagerFee,
    useTestTokenAllowance,
  ])

  return (
    <>
      {isApproved && (
        <Button type="submit" form={form}>
          Create
        </Button>
      )}

      {!isApproved && (
        <>
          <Button
            disabled={isLoading}
            className="image"
            onClick={async () => {
              const result = await writeAsync?.()
              console.log(result)
            }}
          >
            {isLoading ? <BeatLoader color="#36d7b7" /> : <p>Approve</p>}
          </Button>
        </>
      )}
    </>
  )
}
