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

const deleteList = async ({ listId, boardId }: Props) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      type: "error",
      message: "Unauthorized",
    };
  }

  try {
    const list = await db.list.delete({
      where: {
        id: listId,
        boardId,
        board: {
          orgId,
        },
      },
    });

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.DELETE,
    });

    revalidatePath(`/board/${boardId}`);
    return {
      type: "success",
      message: "List successfully deleted.",
      data: list,
    };
  } catch (error) {
    return {
      type: "error",
      message: "Failed to delete list.",
    };
  }
};

export { deleteList };
