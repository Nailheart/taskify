"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
import { createAuditLog } from "@/actions/create-audit-log/create-audit-log";

type Props = {
  title: string;
  boardId: string;
};

const createList = async ({ title, boardId }: Props) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      type: "error",
      message: "Unauthorized",
    };
  }

  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    });

    if (!board) {
      return {
        type: "error",
        message: "Board not found.",
      };
    }

    const lastList = await db.list.findFirst({
      where: { boardId: boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const order = lastList ? lastList.order + 1 : 1;

    const list = await db.list.create({
      data: {
        title,
        boardId,
        order,
      },
    });

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE,
    });

    revalidatePath(`/board/${boardId}`);
    return {
      type: "success",
      message: "List successfully created.",
      data: list,
    };
  } catch (error) {
    return {
      type: "error",
      message: "Failed to create list.",
    };
  }
};

export { createList };
