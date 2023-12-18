"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
import { createAuditLog } from "@/actions/create-audit-log/create-audit-log";

type Props = {
  cardId: string;
  boardId: string;
};

const deleteCard = async ({ cardId, boardId }: Props) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      type: "error",
      message: "Unauthorized",
    };
  }

  try {
    const card = await db.card.delete({
      where: {
        id: cardId,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.DELETE,
    });

    revalidatePath(`/board/${boardId}`);
    return {
      type: "success",
      message: "Card successfully deleted.",
      data: card,
    };
  } catch (error) {
    return {
      type: "error",
      message: "Failed to delete card.",
    };
  }
};

export { deleteCard };
