"use client";



import { BioModal } from "./bio-modal";
import { VerifiedMark } from "./verified-mark";


export const AboutCard = ({
  hostName,
  hostIdentity,
  viewerIdentity,
  bio,
  followedByCount,
}) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  const followedByLabel = followedByCount === 1 ? "follower" : "followers";

  return (
    <div className="px-4">
      <div className="group rounded-xl bg-[#21292a] p-6 lg:p-10 flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            About {hostName}
            <VerifiedMark />
          </div>
          {isHost && (
            <BioModal initialValue={bio} />
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">
            {followedByCount}
          </span> {followedByLabel}
        </div>
        <p className="text-sm">
          {bio || "This user is currently practicing the ancient art of digital invisibility"}
        </p>
      </div>
    </div>
  );
};