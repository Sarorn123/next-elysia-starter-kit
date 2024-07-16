import React, { PropsWithChildren } from "react";

const DashbaordTemplate = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full overflow-auto animate-fade-in-0">{children}</div>
  );
};

export default DashbaordTemplate;
