import React, { PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";
import NextTopLoader from "nextjs-toploader";
import { Provider as JotaiProvider } from "jotai";
import { getUser } from "@/auth/lucia";
import ClientUserProvider from "./client-user-provider";
import { TooltipProvider } from "../ui/tooltip";
import { Toaster } from "sonner";

const RootProvider = async ({ children }: PropsWithChildren) => {
  const user = await getUser();
  return (
    <JotaiProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ClientUserProvider user={user!}>
          <NextTopLoader showSpinner={false} crawl color="gray" />
          <Toaster richColors />
          <TooltipProvider>{children}</TooltipProvider>
        </ClientUserProvider>
      </ThemeProvider>
    </JotaiProvider>
  );
};

export default RootProvider;
