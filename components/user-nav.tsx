"use client"

import { useRouter } from "next/navigation"
import { User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserNav() {
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full border-gray-700 border-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/308985081_10223836651519126_7858294030249344783_n.jpg?stp=cp0_dst-jpg_e15_p75x225_q65&_nc_cat=109&ccb=1-7&_nc_sid=1480c5&_nc_ohc=lxv4hBtCgzEAX9uemyy&_nc_ht=scontent.fhan5-9.fna&oh=00_AfApABWNY3-A7Q0vw3D_tJIeLP_hNk2IMdNo2fEKgr9w6g&oe=648F8A20"
              alt="@"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Nekotin</p>
            <p className="text-xs leading-none text-muted-foreground">
              m@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Button
              variant="ghost"
              className="h-8 w-8"
              onClick={() => router.push("/profile")}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Button>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
