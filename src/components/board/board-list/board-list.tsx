"use client";

import { FC } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";

import type { Card } from "@/types/types";
import { BoardCard } from "@/components/board/board-card/board-card";
import { NewCardButton } from "@/components/new-card-button/new-card-button";
import { BoardListSettings } from "@/components/board/board-list-settings/board-list-settings";
import { BoardListTitle } from "@/components/board/board-list-title/board-list-title";

type Props = {
  listId: string;
  boardId: string;
  listTitle: string;
  index: number;
  cards?: Card[];
};

// TODO: when card have two row of text scroll is apear
const BoardList: FC<Props> = ({ listId, boardId, listTitle, index, cards }) => {
  return (
    <Draggable draggableId={listId} index={index}>
      {(provided) => (
        <div
          className="mr-6 flex max-h-full w-[270px] flex-shrink-0 flex-col rounded-md bg-slate-200"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            className="flex items-center justify-between gap-2 rounded-md px-3 py-2"
            {...provided.dragHandleProps}
          >
            <BoardListTitle
              listId={listId}
              boardId={boardId}
              listTitle={listTitle}
            />
            <BoardListSettings listId={listId} boardId={boardId} />
          </div>
          <Droppable droppableId={listId} type="card">
            {(provided) => (
              <div
                className="flex h-full flex-col overflow-y-auto px-3 py-2 scrollbar-thin"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {cards?.map((card, index) => (
                  <BoardCard
                    className="mb-2"
                    key={card.id}
                    cardId={card.id}
                    title={card.title}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="px-3 py-2">
            <NewCardButton listId={listId} boardId={boardId} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export { BoardList };
