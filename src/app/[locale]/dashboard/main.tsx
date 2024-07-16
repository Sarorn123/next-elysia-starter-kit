"use client";

import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { File, LayoutDashboard, Settings, Users2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SidebarLink from "@/components/reusable/sidebar-link";
import { usePathname } from "@/lib/navigation";
import { Linktype } from "@/types/link";
import { resizableCollapsedName, resizableLayoutName } from "@/helper/constant";
import { setResizePanel } from "@/action/cookie";

type Props = {
  children: React.ReactNode;
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
};

const MainRoot = ({
  defaultLayout = [265, 440, 655],
  navCollapsedSize,
  defaultCollapsed = false,
  children,
}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(defaultCollapsed);
  return (
    <div className="h-[calc(100vh-50px)]">
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          setResizePanel(resizableLayoutName, JSON.stringify(sizes));
        }}
        className="h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
          onCollapse={() => {
            setResizePanel(resizableCollapsedName, "true");
            setIsCollapsed(true);
          }}
          onExpand={() => {
            setResizePanel(resizableCollapsedName, "false");
            setIsCollapsed(false);
          }}
        >
          <RenderLink isCollapsed={isCollapsed} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={defaultLayout[1]}
          minSize={30}
          className="p-4 bg-muted"
        >
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainRoot;

// type MenuLabel = NonNullable<Awaited<ReturnType<typeof getMenuLabel>>>["data"];

function RenderLink<T>({ isCollapsed }: { isCollapsed: boolean }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const boardLink: Linktype[] = [
    {
      title: "Dashboard",
      label: "128",
      icon: LayoutDashboard,
      url: "/dashboard",
    },
    {
      title: "Drafts",
      icon: File,
      url: "/dashboard/drafts",
    },
  ].map((link) => ({
    ...link,
    variant: isActive(link.url) ? "default" : "ghost",
  }));

  const managementLink: Linktype[] = [
    {
      title: "User",
      icon: Users2,
      url: "/dashboard/user",
    },
    {
      title: "Setting",
      icon: Settings,
      url: "/dashboard/setting",
    },
  ].map((link) => ({
    ...link,
    variant: isActive(link.url) ? "default" : "ghost",
  }));

  return (
    <>
      <SidebarLink isCollapsed={isCollapsed} label="Board" links={boardLink} />
      <Separator />
      <SidebarLink
        label="Management"
        isCollapsed={isCollapsed}
        links={managementLink}
      />
    </>
  );
}
