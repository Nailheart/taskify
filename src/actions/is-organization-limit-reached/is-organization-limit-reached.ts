"use server";

import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { MAX_FREE_BOARDS } from "@/constants/boards";

const isOrganizationLimitReached = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  if (!orgLimit || orgLimit.count >= MAX_FREE_BOARDS) {
    return true;
  } else {
    return false;
  }
};

export { isOrganizationLimitReached };
