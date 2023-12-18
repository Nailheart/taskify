"use server";

import { auth } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createAuditLog } from "@/actions/create-audit-log/create-audit-log";

type Props = {
  title: string;
  listId: string;
  boardId: string;
};

const updateListTitle = async ({ title, listId, boardId }: Props) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      type: "error",
      message: "Unauthorized",
    };
  }

  try {
    const list = await db.list.update({
      where: {
        id: listId,
        boardId,
        board: {
          orgId,
        },
      },
      data: {
        title,
      },
    });

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE,
    });

    revalidatePath(`/board/${boardId}`);
    return {
      type: "success",
      message: "List title successfully updated.",
      data: list,
    };
  } catch (error) {
    return {
      type: "error",
      message: "Failed to update list title.",
    };
  }
};

export { updateListTitle };
