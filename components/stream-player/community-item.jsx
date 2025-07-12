"use client";

import { onBlock } from "@/action/block-unblock-action/onblock";
import { cn, stringToColor } from "@/lib/utils";
import { useTransition } from "react";
import { toast } from "sonner";
import Hint from "../hint";
import { Button } from "../ui/button";
import { MinusCircle } from "lucide-react";



export function CommunityItem({
  hostName,
  viewerName,
  participantName,
  participantIdentity,
  hostIdentity
}) {
  const [isPending, startTransition] = useTransition();

  const color = stringToColor(participantName || "");
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return;

    startTransition(() => {
      onBlock(participantIdentity,participantName,hostIdentity)
        .then(() => toast.success(`Blocked ${participantName}`))
        .catch(() =>
          toast.error(
            `Failed to block ${participantName}, Something went wrong`
          )
        );
    });
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block">
          <Button
            variant="ghost"
            disabled={isPending}
            onClick={handleBlock}
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
          >
            <MinusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
}