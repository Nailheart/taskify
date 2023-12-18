"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
import { createAuditLog } from "@/actions/create-audit-log/create-audit-log";

type Props = {
  listId: string;
  boardId: string;
  cardTitle: string;
};

const createCard = async ({ listId, boardId, cardTitle }: Props) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      type: "error",
      message: "Unauthorized",
    };
  }

  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
        board: {
          orgId,
        },
      },
    });

    if (!list) {
      return {
        type: "error",
        message: "List not found.",
      };
    }

    const lastCard = await db.card.findFirst({
      where: { listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const order = lastCard ? lastCard.order + 1 : 1;

    const card = await db.card.create({
      data: {
        title: cardTitle,
        listId,
        order,
      },
    });

    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    });

    revalidatePath(`/board/${boardId}`);
    return {
      type: "success",
      message: "Card successfully created.",
      data: card,
    };
  } catch (error) {
    return {
      type: "error",
      message: "Failed to create card.",
    };
  }
};

export { createCard };
