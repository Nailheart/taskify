"use server";

import { auth } from "@clerk/nextjs";
import { Card } from "@prisma/client";

import { db } from "@/lib/db";

type Props = {
  cards: Card[];
};

const updateCardOrders = async ({ cards }: Props) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    const transaction = cards.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      }),
    );

    const updatedCards = await db.$transaction(transaction);

    return updatedCards;
  } catch (error) {
    return {
      error: "Failed to reorder.",
    };
  }
};

export { updateCardOrders };
