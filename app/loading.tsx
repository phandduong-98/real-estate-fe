import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex justify-center items-center space-x-4">
      <Skeleton className="h-9 w-96 rounded-md mt-36" />
    </div>
  )
}
