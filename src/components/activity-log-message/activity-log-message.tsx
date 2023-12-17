import { FC } from "react";
import { format } from "date-fns";
import { UserIcon } from "lucide-react";
import { AuditLog } from "@prisma/client";

import { genrateActivityLogMessage } from "@/helpers/genrate-activity-log-message";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  auditLog: AuditLog;
};

const ActivityLogMessage: FC<Props> = ({ auditLog }) => {
  return (
    <div className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={auditLog.userImage} />
        <AvatarFallback>
          <UserIcon />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-neutral-700">
            {auditLog.userName}
          </span>{" "}
          {genrateActivityLogMessage(auditLog)}
        </p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(auditLog.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </div>
  );
};

export { ActivityLogMessage };
