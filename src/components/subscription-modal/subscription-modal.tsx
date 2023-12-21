"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useSubsriptionModal } from "@/hooks/use-subscription-modal";
import { stripeRedirect } from "@/actions/stripe-redirect/stripe-redirect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const SubscriptionModal = () => {
  const router = useRouter();
  const { isOpen, onClose } = useSubsriptionModal();

  const handleSubscription = async () => {
    try {
      const stripe = await stripeRedirect();

      if (stripe.type === "error") {
        toast.error(stripe.message);
        return;
      }

      if (stripe.data) {
        router.push(stripe.data);
      }
    } catch (error) {
      toast.error("Uh oh! Something went wrong.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0">
        <Image
          className="aspect-video object-cover pt-6"
          src="/img/subscription.svg"
          width={450}
          height={250}
          alt="Hero"
        />
        <div className="space-y-4 p-6 text-neutral-700">
          <h2 className="text-xl font-semibold">
            Upgrade to Taskify Pro Today!
          </h2>
          <p className="text-sm font-semibold text-neutral-600">
            Explore the best of Taskify
          </p>
          <ul className="list-disc pl-3 text-sm">
            <li>Unlimited boards</li>
            <li>Advanced checklists</li>
            <li>Admin and security features</li>
            <li>And more!</li>
          </ul>
          <Button className="w-full" onClick={handleSubscription}>
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { SubscriptionModal };
