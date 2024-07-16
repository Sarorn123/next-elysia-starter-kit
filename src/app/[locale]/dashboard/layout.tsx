import Header from "@/components/reusable/header";
import { cookies } from "next/headers";
import React, { PropsWithChildren } from "react";
import MainRoot from "./main";
import { resizableCollapsedName, resizableLayoutName } from "@/helper/constant";

const DashbaordLayout = ({ children }: PropsWithChildren) => {
  const layout = cookies().get(resizableLayoutName);
  const collapsed = cookies().get(resizableCollapsedName);
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <div>
      <Header />
      <MainRoot
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={4}
      >
        {children}
      </MainRoot>
    </div>
  );
};

export default DashbaordLayout;
