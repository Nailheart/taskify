"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
import { createAuditLog } from "@/actions/create-audit-log/create-audit-log";

type Props = {
  listId: string;
  boardId: string;
};

const copyList = async ({ listId, boardId }: Props) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    // TODO: mb list from props
    const listToCopy = await db.list.findUnique({
      where: {
        id: listId,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });

    if (!listToCopy) {
      return { error: "List not found" };
    }

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    // TODO:
    const order = lastList ? lastList.order + 1 : 1;

    const list = await db.list.create({
      data: {
        boardId,
        title: `${listToCopy.title} - Copy`,
        order,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
      include: {
        cards: true,
      },
    });

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE,
    });

    revalidatePath(`/board/${boardId}`);
    return list;
  } catch (error) {
    return {
      error: "Failed to copy list.",
    };
  }
};

export { copyList };
