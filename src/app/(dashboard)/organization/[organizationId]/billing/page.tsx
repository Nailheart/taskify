import { checkSubscription } from "@/actions/check-subscription/check-subscription";
import { OrganizationInfo } from "@/components/organization-info/organization-info";
import { SubscriptionButton } from "@/components/subscription-button/subscription-button";
import { Separator } from "@/components/ui/separator";

const BillingPage = async () => {
  const isPro = await checkSubscription();

  return (
    <section>
      <OrganizationInfo isPro={isPro} />
      <Separator className="my-2" />
      <SubscriptionButton isPro={isPro} />
    </section>
  );
};

export default BillingPage;
