import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

const getOrganizationLimit = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return 0;
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  if (!orgLimit) {
    return 0;
  }

  return orgLimit.count;
};

export { getOrganizationLimit };
