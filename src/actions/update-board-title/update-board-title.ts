"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
import { createAuditLog } from "@/actions/create-audit-log/create-audit-log";

type Props = {
  boardId: string;
  title: string;
};

const updateBoardTitle = async ({ boardId, title }: Props) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      type: "error",
      message: "Unauthorized",
    };
  }

  try {
    const board = await db.board.update({
      where: {
        id: boardId,
        orgId,
      },
      data: {
        title,
      },
    });

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.UPDATE,
    });

    revalidatePath(`/board/${boardId}`);
    return {
      type: "success",
      message: "Board title successfully updated.",
      data: board,
    };
  } catch (error) {
    return {
      type: "error",
      message: "Failed to update board title.",
    };
  }
};

export { updateBoardTitle };
