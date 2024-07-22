"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { onLogout } from "@/action/auth";

type Props = {};

const LogoutButton = (props: Props) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} disabled={loading} size={"icon"}>
          <LogOut size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="text-center w-52">
        <p className="text-sm">
          You want to log out ?{" "}
          <span
            className="underline font-semibold cursor-pointer"
            onClick={async () => {
              setLoading(true);
              await onLogout().finally(() => setLoading(false));
            }}
          >
            Yes
          </span>
        </p>
      </PopoverContent>
    </Popover>
  );
};

export default LogoutButton;
