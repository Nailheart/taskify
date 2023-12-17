"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { Sidebar } from "@/components/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  className?: string;
};

const SidebarMobile: React.FC<Props> = ({ className }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleSidebar = () => setIsOpen(true);
  const handleCloseSidebar = () => setIsOpen(false);

  useEffect(() => {
    handleCloseSidebar();
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={handleCloseSidebar}>
      <Button
        className={className}
        variant="ghost"
        size="sm"
        onClick={handleToggleSidebar}
      >
        <MenuIcon size={20} />
      </Button>
      <SheetContent side="left" className="p-0">
        <ScrollArea className="h-full p-4 pt-10">
          <Sidebar />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export { SidebarMobile };
