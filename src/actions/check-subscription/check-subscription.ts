import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

const DAY_IN_MS = 86_400_000;

const checkSubscription = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return false;
  }

  const orgSubscription = await db.orgSubscription.findUnique({
    where: {
      orgId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!orgSubscription) {
    return false;
  }

  const isExpired = Boolean(
    orgSubscription.stripePriceId &&
      orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
        Date.now(),
  );

  return isExpired;
};

export { checkSubscription };
