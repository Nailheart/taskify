import { Navbar } from "@/components/navbar/navbar";
import { NewBoardModal } from "@/components/new-board-modal/new-board-modal";
import { CardModal } from "@/components/card-modal/card-modal";
import { SubscriptionModal } from "@/components/subscription-modal/subscription-modal";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-full grid-rows-[min-content_1fr]">
      <Navbar />
      <main>{children}</main>
      <NewBoardModal />
      <CardModal />
      <SubscriptionModal />
    </div>
  );
};

export default DashboardLayout;
