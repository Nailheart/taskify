import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";

type Props = {
  params: {
    cardId: string;
  };
};

const GET = async (req: Request, { params }: Props) => {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const auditLogs = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    return NextResponse.json(auditLogs);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export { GET };
