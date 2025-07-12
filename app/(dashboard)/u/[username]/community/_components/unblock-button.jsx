"use client";

import { toast } from "sonner";
import { useTransition } from "react";


import { Button } from "@/components/ui/button";
import { onUnBlock } from "@/action/block-unblock-action/onunblock";



export const UnblockButton = ({
  userId,
  username
}) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnBlock(userId,username)
        .then((result) => toast.success(`You unblocked ${result} `))
        .catch(() => toast.error("Something went wrong"))
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant="link"
      size="sm"
      className="text-orange-600 w-full"
    >
      Unblock
    </Button>
  )
}