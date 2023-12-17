import { OrganizationList } from "@clerk/nextjs";

const OrganizationsPage = () => {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl="/organization/:id"
      afterCreateOrganizationUrl="/organization/:id"
    />
  );
};

export default OrganizationsPage;
