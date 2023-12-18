"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
import { createAuditLog } from "@/actions/create-audit-log/create-audit-log";
import { incrementOrganizationLimit } from "@/actions/incremet-organization-limit/incremet-organization-limit";

type Props = {
  title: string;
  image: {
    imageId: string;
    imageThumbUrl: string;
    imageFullUrl: string;
    imageUserName: string;
    imageLinkHTML: string;
  };
};

const createBoard = async ({ title, image }: Props) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      type: "error",
      message: "Unauthorized",
    };
  }

  const { imageId, imageThumbUrl, imageFullUrl, imageUserName, imageLinkHTML } =
    image;

  if (
    !title ||
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageUserName ||
    !imageLinkHTML
  ) {
    return {
      type: "error",
      message: "Missing fields. Failed to create board.",
    };
  }

  try {
    const board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      },
    });

    await incrementOrganizationLimit();

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    });

    revalidatePath(`/organization/${orgId}`);
    return {
      type: "success",
      message: "Board successfully created.",
      data: board,
    };
  } catch (error) {
    return {
      type: "error",
      message: "Failed to create board.",
    };
  }
};

export { createBoard };
