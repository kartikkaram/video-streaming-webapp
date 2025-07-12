"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { onFollow } from "@/action/follow-unfollow-action/follow";
import { onUnfollow } from "@/action/follow-unfollow-action/unfollow";
import { cn } from "@/lib/utils";



export function Actions({
  hostIdentity,
  isFollowing,
  hostName
}) {
  const { userId } = useAuth();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity, hostName)
        .then((data) =>
          toast.success(`You are now following ${data}.`)
        )
        .catch(() => toast.error("Something went wrong while following."));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity, hostName )
        .then((data) =>
          toast.success(`You have unfollowed ${data}.`)
        )
        .catch(() => toast.error("Something went wrong while unfollowing."));
    });
  };

  const toggleFollow = () => {
    if (!userId) {
      return router.push("/sign-in");
    }

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      disabled={isPending }
      onClick={toggleFollow}
      variant="primary"
      size="sm"
      className="w-full lg:w-auto"
    >
      <Heart
        className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}

export function ActionsSkeleton() {
  return <Skeleton className="h-10 w-full lg:w-24" />;
}