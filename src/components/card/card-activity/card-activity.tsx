"use client";

import { FC, useState } from "react";
import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";

import { ActivityLogMessage } from "@/components/activity-log-message/activity-log-message";
import { Button } from "@/components/ui/button";

type Props = {
  auditLogs: AuditLog[];
};

const CardActivity: FC<Props> = ({ auditLogs }) => {
  const [isShowActivity, setIsShowActivity] = useState(false);

  const toggleActivity = () => setIsShowActivity(!isShowActivity);

  return (
    <div>
      <div className="flex items-center gap-x-4">
        <ActivityIcon className="flex-shrink-0" />
        <h2 className="text-lg font-semibold">Activity</h2>

        <Button
          className="ml-auto"
          size="sm"
          type="button"
          variant="slate"
          onClick={toggleActivity}
        >
          Show details
        </Button>
      </div>
      {isShowActivity && (
        <ul className="mt-3 space-y-4">
          {auditLogs.map((auditLog) => (
            <li key={auditLog.id} className="flex items-center gap-x-2">
              <ActivityLogMessage auditLog={auditLog} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { CardActivity };
