"use client";

import { FC, useEffect, useRef, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";

import { ListWithCards } from "@/types/types";
import { reorder } from "@/helpers/reorder";
import { updateListOrders } from "@/actions/update-list-orders/update-list-orders";
import { updateCardOrders } from "@/actions/update-card-orders/update-card-orders";
import { BoardList } from "@/components/board/board-list/board-list";
import { NewListButton } from "@/components/new-list-button/new-list-button";

type Props = {
  boardId: string;
  initialLists: ListWithCards[];
};

const Board: FC<Props> = ({ boardId, initialLists }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [lists, setLists] = useState(initialLists);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    // dropped outside the board
    if (!destination) return;

    // dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // move list
    if (type === "list") {
      const reorderedLists = reorder(lists, source.index, destination.index);

      // update lists order
      reorderedLists.forEach((list, index) => {
        list.order = index;
      });

      setLists(reorderedLists);
      updateListOrders({ lists: reorderedLists });
    }

    // move card
    if (type === "card") {
      const newLists = [...lists];

      // source and destination list
      const sourceList = newLists.find(
        (list) => list.id === source.droppableId,
      );
      const destinationList = newLists.find(
        (list) => list.id === destination.droppableId,
      );

      if (!sourceList || !destinationList) return;

      // moving a card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index,
        );

        // update cards order
        reorderedCards.forEach((card, index) => {
          card.order = index;
        });

        // assign new orders to cards
        sourceList.cards = reorderedCards;

        // save state reordered card
        setLists(newLists);
        updateCardOrders({ cards: reorderedCards });
      }

      // moving a card to another list
      if (source.droppableId !== destination.droppableId) {
        // remove card from the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // assign the new listId to the moved card
        movedCard.listId = destination.droppableId;

        // add card to the destination list
        destinationList.cards.splice(destination.index, 0, movedCard);

        // update cards order
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });
        destinationList.cards.forEach((card, index) => {
          card.order = index;
        });

        // save state reordered card
        setLists(newLists);
        updateCardOrders({ cards: sourceList.cards });
        updateCardOrders({ cards: destinationList.cards });
      }
    }
  };

  useEffect(() => {
    setLists(initialLists);
  }, [initialLists]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" type="list" direction="horizontal">
        {(provided) => (
          <div
            className="relative flex-grow bg-black/20"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div
              className="container absolute inset-0 flex h-full items-start overflow-x-auto overflow-y-hidden py-6"
              ref={canvasRef}
            >
              {lists.map((list, index) => (
                <BoardList
                  key={list.id}
                  index={index}
                  listId={list.id}
                  boardId={boardId}
                  listTitle={list.title}
                  cards={list.cards}
                />
              ))}
              {provided.placeholder}
              <div className="w-[270px] flex-shrink-0">
                <NewListButton boardId={boardId} canvasRef={canvasRef} />
              </div>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export { Board };
