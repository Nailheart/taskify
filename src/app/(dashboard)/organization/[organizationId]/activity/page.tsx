import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { OrganizationInfo } from "@/components/organization-info/organization-info";
import { ActivityLogMessage } from "@/components/activity-log-message/activity-log-message";
import { Separator } from "@/components/ui/separator";

const ActibityPage = async () => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/organizations");
  }

  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section>
      <OrganizationInfo />
      <Separator className="my-4" />

      <div className="mt-4">
        {auditLogs.length ? (
          <ul className="mt-2 space-y-4">
            {auditLogs.map((auditLog) => (
              <li key={auditLog.id} className="flex items-center gap-x-2">
                <ActivityLogMessage auditLog={auditLog} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted-foreground">
            Maybe you&apos;ll be lucky next time. Try again later
          </p>
        )}
      </div>
    </section>
  );
};

export default ActibityPage;
