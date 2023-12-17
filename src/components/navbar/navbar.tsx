import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import { Logo } from "@/components/logo/logo";
import { SidebarMobile } from "@/components/sidebar-mobile/sidebar-mobile";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center gap-x-2 py-2">
        <Logo className="max-md:hidden" />
        <SidebarMobile className="md:hidden" />

        <nav className="ml-auto flex items-center gap-x-2 leading-none">
          <OrganizationSwitcher
            hidePersonal
            afterCreateOrganizationUrl="/organization/:id"
            afterLeaveOrganizationUrl="/organizations"
            afterSelectOrganizationUrl="/organization/:id"
          />
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: {
                  height: 30,
                  width: 30,
                },
              },
            }}
          />
        </nav>
      </div>
    </header>
  );
};

export { Navbar };
