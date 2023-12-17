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

const copyCard = async ({ cardId, boardId }: Props) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    const cardToCopy = await db.card.findUnique({
      where: {
        id: cardId,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    if (!cardToCopy) {
      return { error: "Card not found" };
    }

    const lastCard = await db.card.findFirst({
      where: { listId: cardToCopy.listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const order = lastCard ? lastCard.order + 1 : 1;

    const card = await db.card.create({
      data: {
        title: `${cardToCopy.title} - Copy`,
        description: cardToCopy.description,
        order,
        listId: cardToCopy.listId,
      },
    });

    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    });

    revalidatePath(`/board/${boardId}`);
    return card;
  } catch (error) {
    return {
      error: "Failed to copy card.",
    };
  }
};

export { copyCard };
