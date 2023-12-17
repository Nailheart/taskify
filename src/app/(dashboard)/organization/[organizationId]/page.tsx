import Link from "next/link";

import { db } from "@/lib/db";
import { getOrganizationLimit } from "@/actions/get-organization-limit/get-organization-limit";
import { OrganizationInfo } from "@/components/organization-info/organization-info";
import { NewBoardButton } from "@/components/new-board-button/new-board-button";
import { Separator } from "@/components/ui/separator";

type Props = {
  organizationId: string;
};

const OrganizationIdPage = async ({ params }: { params: Props }) => {
  const boards = await db.board.findMany({
    where: {
      orgId: params.organizationId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const organizationLimit = await getOrganizationLimit();

  return (
    <section>
      <OrganizationInfo />
      <Separator className="my-4" />
      <h1 className="mb-4 text-xl font-semibold">Boards</h1>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-6">
        {boards.map((board) => (
          <Link
            key={board.id}
            className="group relative aspect-video rounded-sm bg-muted bg-cover bg-center bg-no-repeat p-2 text-white"
            href={`/board/${board.id}`}
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
            <h2 className="relative font-semibold">{board.title}</h2>
          </Link>
        ))}
        <NewBoardButton organizationLimit={organizationLimit} />
      </div>
    </section>
  );
};

export default OrganizationIdPage;
