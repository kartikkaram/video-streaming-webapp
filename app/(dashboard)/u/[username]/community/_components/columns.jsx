"use client"

import { Button } from "@/components/ui/button"
import UserAvatar from "@/components/user-avatar"
import { ArrowUpDown } from "lucide-react"
import { UnblockButton } from "./unblock-button"



// Define the type of data that will be displayed in the table

// Define the columns for the table
export const columns = [
  {
    accessorKey: "username",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Username
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-4">
        <UserAvatar 
          username={row.original.username} 
          imageurl={row.original.imageUrl}
        />
        <span>{row.original.username}</span>
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date blocked
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <UnblockButton
     userId={row.original.userId}
     username={row.original.username}
     />
  },
]