import { Navbar } from "@/components/navbar/navbar";
import { OrganizationList } from "@clerk/nextjs";

const OrganizationsPage = () => {
  return (
    <div className="flex min-h-screen w-screen flex-col">
      <Navbar />
      <div className="m-auto">
        <OrganizationList
          hidePersonal
          afterSelectOrganizationUrl="/organization/:id"
          afterCreateOrganizationUrl="/organization/:id"
        />
      </div>
    </div>
  );
};

export default OrganizationsPage;
