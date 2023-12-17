import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { db } from "@/lib/db";
import { BoardTitle } from "@/components/board/board-title/board-title";
import { BoardSettings } from "@/components/board/board-settings/board-settings";
import { Board } from "@/components/board/board";

type Props = {
  boardId: string;
};

export const metadata: Metadata = {
  title: "Board",
};

const BoardIdPage = async ({ params }: { params: Props }) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/organizations");
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  if (!board) {
    notFound();
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <section
      className="flex h-full flex-col bg-cover bg-fixed bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <div className="container flex items-center justify-between gap-4 bg-black/50 py-2 text-white">
        <BoardTitle boardId={board.id} boardTitle={board.title} />
        <BoardSettings boardId={board.id} />
      </div>
      <Board boardId={board.id} initialLists={lists} />
    </section>
  );
};

export default BoardIdPage;
