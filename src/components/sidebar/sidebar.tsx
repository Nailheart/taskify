"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import {
  ActivityIcon,
  CreditCardIcon,
  LayoutIcon,
  PlusIcon,
  SettingsIcon,
} from "lucide-react";
import { useOrganizationList } from "@clerk/nextjs";
import { useLocalStorage } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  className?: string;
};

const sidebarItems = [
  {
    label: "Board",
    icon: <LayoutIcon className="mr-2 h-4 w-4" />,
    href: "",
  },
  {
    label: "Activity",
    icon: <ActivityIcon className="mr-2 h-4 w-4" />,
    href: "/activity",
  },
  {
    label: "Settings",
    icon: <SettingsIcon className="mr-2 h-4 w-4" />,
    href: "/settings",
  },
  {
    label: "Billing",
    icon: <CreditCardIcon className="mr-2 h-4 w-4" />,
    href: "/billing",
  },
];

const Sidebar: React.FC<Props> = ({ className }) => {
  const pathname = usePathname();
  const { organizationId } = useParams();
  const [sidebarState, setSidebarState] = useLocalStorage<Record<string, any>>(
    "sidebar-state",
    {},
  );
  const { userMemberships, isLoaded, setActive } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const defaultAccordionValue = Object.keys(sidebarState).reduce(
    (expandedAccordionItems: string[], accordionItem: string) => {
      // Check if accordionItem === true add to array
      if (sidebarState[accordionItem]) {
        expandedAccordionItems.push(accordionItem);
      }

      return expandedAccordionItems;
    },
    [],
  );

  const toggleAccordionItem = (accordionItem: string) => {
    setSidebarState((state) => ({
      ...state,
      [accordionItem]: !sidebarState[accordionItem],
    }));
  };

  // Change active organization after navigation to
  // another organization page
  useEffect(() => {
    if (!setActive) return;

    setActive({
      organization: organizationId as string,
    });
  }, [setActive, organizationId]);

  if (!isLoaded) {
    return (
      <div className="w-64 max-md:hidden">
        <div className="mb-2 flex items-center justify-between">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="mb-1 flex items-center font-medium">
        <h2 className="pl-2">Workspaces</h2>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/organizations">
            <PlusIcon className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion type="multiple" defaultValue={defaultAccordionValue}>
        {userMemberships.data.map(({ organization }) => (
          <AccordionItem
            className="mb-1 border-none"
            key={organization.id}
            value={organization.id}
          >
            <AccordionTrigger
              className={cn(
                "h-[42px] gap-x-2 rounded-md p-1.5 text-neutral-700 no-underline transition hover:bg-neutral-500/10 hover:no-underline",
                pathname.includes(organization.id) &&
                  "aria-[expanded=false]:bg-sky-500/10 aria-[expanded=false]:text-sky-700",
              )}
              onClick={() => toggleAccordionItem(organization.id)}
            >
              <Image
                className="flex-shrink-0 rounded-sm object-cover"
                src={organization.imageUrl}
                width={30}
                height={30}
                alt={"Logo" + organization.name}
              />
              <div className="mr-auto grid grid-cols-1">
                <span className="truncate text-sm font-medium">
                  {organization.name}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0 text-neutral-700">
              {sidebarItems.map((item) => {
                const href = `/organization/${organization.id}${item.href}`;
                const isActiveLink = pathname === href;

                return (
                  <Button
                    key={item.href}
                    size="sm"
                    className={cn(
                      "mt-1 w-full justify-start font-normal",
                      isActiveLink && "bg-sky-500/10 text-sky-700",
                    )}
                    variant="ghost"
                    asChild
                  >
                    <Link href={`/organization/${organization.id}${item.href}`}>
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export { Sidebar };
