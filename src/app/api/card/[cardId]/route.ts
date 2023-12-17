import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

type Props = {
  params: {
    cardId: string;
  };
};

const GET = async (req: Request, { params }: Props) => {
  const { cardId } = params;

  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const card = await db.card.findUnique({
      where: {
        id: cardId,
        list: {
          board: {
            orgId,
          },
        },
      },
      include: {
        list: {
          select: {
            boardId: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export { GET };
