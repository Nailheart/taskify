"use client";

import { FC, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useSubsriptionModal } from "@/hooks/use-subscription-modal";
import { stripeRedirect } from "@/actions/stripe-redirect/stripe-redirect";
import { Button } from "@/components/ui/button";

type Props = {
  isPro?: boolean;
};

const SubscriptionButton: FC<Props> = ({ isPro }) => {
  const router = useRouter();
  const { onOpen } = useSubsriptionModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscription = async () => {
    if (!isPro) {
      onOpen();
      return;
    }

    setIsLoading(true);

    try {
      const location = window.location.href;
      const stripe = await stripeRedirect({ location });

      if (stripe.type === "error") {
        toast.error(stripe.message);
        return;
      }

      if (stripe.data) {
        router.push(stripe.data);
      }
    } catch (error) {
      toast.error("Uh oh! Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button disabled={isLoading} onClick={handleSubscription}>
      {isPro ? "Manage subscription" : "Upgrade to pro"}
    </Button>
  );
};

export { SubscriptionButton };
