import { OrganizationProfile } from "@clerk/nextjs";

const SettingsPage = () => {
  return (
    <section className="grid w-full grid-cols-1 items-start justify-center truncate">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              boxShadow: "none",
              width: "100%",
            },
            card: {
              border: "1px solid #e5e5e5",
              boxShadow: "none",
              margin: "0",
              width: "100%",
              maxWidth: "100%",
            },
            headerSubtitle: {
              whiteSpace: "initial",
            },
          },
        }}
      />
    </section>
  );
};

export default SettingsPage;
