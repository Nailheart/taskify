import { FC } from "react";
import { AppWindowIcon } from "lucide-react";

import { CardWithList } from "@/types/types";
import { CardTitle } from "@/components/card/card-title/card-title";

type Props = {
  card: CardWithList;
};

const CardHeader: FC<Props> = ({ card }) => {
  return (
    <div>
      <div className="flex items-center gap-x-1">
        <AppWindowIcon className="flex-shrink-0" />
        <CardTitle card={card} />
      </div>
      <p className="text-sm text-muted-foreground">
        in list <span className="underline">{card.list.title}</span>
      </p>
    </div>
  );
};

export { CardHeader };
