"use client";

import Image from "next/image";
import { CreditCardIcon } from "lucide-react";
import { useOrganization } from "@clerk/nextjs";

import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  isPro?: boolean;
};

const OrganizationInfo: React.FC<Props> = ({ isPro }) => {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded || !organization) {
    return (
      <div className="flex items-center gap-x-4">
        <Skeleton className="h-[60px] w-[60px]" />

        <div className="space-y-2">
          <Skeleton className="h-10 w-[200px]" />
          <div className="flex items-center">
            <Skeleton className="mr-1 h-3 w-3" />
            <Skeleton className="h-3 w-[100px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-x-4">
      <Image
        className="rounded-md object-cover"
        src={organization.imageUrl}
        width={60}
        height={60}
        alt="Organization logo"
      />
      <div className="grid grid-cols-1 space-y-1">
        <p className="truncate text-xl font-semibold">{organization.name}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <CreditCardIcon className="mr-1 mt-[1px] h-4 w-4" />
          {isPro ? "Pro" : "Free"}
        </div>
      </div>
    </div>
  );
};

export { OrganizationInfo };
