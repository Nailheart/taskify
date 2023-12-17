import { MarketingFooter } from "@/components/marketing-footer/marketing-footer";
import { MarketingHeader } from "@/components/marketing-header/marketing-header";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid min-h-screen grid-rows-[1fr_min-content] bg-slate-100">
      <MarketingHeader />
      <main className="pb-20 pt-36">{children}</main>
      <MarketingFooter />
    </div>
  );
};

export default MarketingLayout;
