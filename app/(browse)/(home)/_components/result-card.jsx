import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar, { UserAvatarSkeleton } from "@/components/user-avatar";
import Link from "next/link";



export const ResultCard = ({
  data,
}) => {

    

  return (
    <Link href={`/${data.user.username}`}>
      <div className="h-full w-full space-y-4">
        <Thumbnail
          src={data.thumbnail}
          fallback={data.user.imageurl}
          isLive={data.islive}
          username={data.user.username}
        />
        <div className="flex gap-x-3">
          <UserAvatar
            username={data.user.username}
            imageurl={data.user.imageurl}
            isLive={data.islive}
          />
          <div className="flex flex-col text-sm overflow-hidden">
            <p className="truncate font-semibold hover:text-orange-500">
                {data.title ? data.title : data.ownername}
              
            </p>
            <p className="text-muted-foreground">
              {data.user.username}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24"/>
        </div>
      </div>
    </div>
  );
};