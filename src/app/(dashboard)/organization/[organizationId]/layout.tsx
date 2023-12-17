import { Metadata } from "next";

import { Sidebar } from "@/components/sidebar/sidebar";

export const metadata: Metadata = {
  title: "Organization",
};

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container py-6 md:flex md:gap-x-6">
      <Sidebar className="w-64 flex-shrink-0 max-md:hidden" />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default OrganizationIdLayout;
