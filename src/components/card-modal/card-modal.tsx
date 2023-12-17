"use client";

import { useQuery } from "@tanstack/react-query";
import { AuditLog } from "@prisma/client";
import { XIcon } from "lucide-react";

import { CardWithList } from "@/types/types";
import { fetchApi } from "@/helpers/fetchApi";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardHeader } from "@/components/card/card-header/card-header";
import { CardDescription } from "@/components/card/card-description/card-description";
import { CardActions } from "@/components/card/card-actions/card-actions";
import { CardActivity } from "@/components/card/card-activity/card-activity";
import { Spinner } from "@/components/spinner/spinner";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";

const CardModal = () => {
  const { id, isOpen, onClose } = useCardModal();

  const { data: card } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetchApi(`/api/card/${id}`),
  });

  const { data: auditLogs } = useQuery<AuditLog[]>({
    queryKey: ["card-audit-logs", id],
    queryFn: () => fetchApi(`/api/card/${id}/audit-logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="rounded-md text-[--dark-blue] md:w-[80%] md:max-w-3xl"
        closeButton={false}
      >
        {card ? (
          <>
            <div className="mb-6 grid grid-cols-[1fr_min-content] items-start gap-2">
              <CardHeader card={card} />
              <DialogClose className="inline-block w-auto rounded-md bg-slate-100 p-2 duration-300 hover:bg-slate-200 focus-visible:bg-slate-200">
                <XIcon />
              </DialogClose>
            </div>
            <div className="grid gap-2 md:grid-cols-[1fr_min-content]">
              <div className="space-y-6">
                <CardDescription card={card} />
                {auditLogs?.length && <CardActivity auditLogs={auditLogs} />}
              </div>
              <CardActions card={card} />
            </div>
          </>
        ) : (
          <div className="flex min-h-[200px] items-center justify-center">
            <Spinner className="h-10 w-10 text-[--light-blue]" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export { CardModal };
