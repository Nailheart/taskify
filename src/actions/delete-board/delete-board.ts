"use server";

import { auth } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
import { createAuditLog } from "@/actions/create-audit-log/create-audit-log";
import { decreaseOrganizationLimit } from "../decrease-organization-limit/decrease-organization-limit";

type Props = {
  id: string;
};

const deleteBoard = async ({ id }: Props) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    const board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });

    await decreaseOrganizationLimit();

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "Failed to delete board.",
    };
  }
};

export { deleteBoard };
