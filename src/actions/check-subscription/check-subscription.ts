"use server";

import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { DAY_IN_MS } from "@/constants/date";

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
      stripePriceId: true,
      stripeCustomerId: true,
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
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
