import React from "react";
import LogoutButton from "./logout-button";
import ThemeMode from "./theme-mode";
import LangSwitcherSelect from "./lang-switcher";
import { getUser } from "@/auth/lucia";

type Props = {};

const Header = async (props: Props) => {
  const session = await getUser();

  return (
    <section className="flex h-[50px] items-center justify-between border-b px-2">
      <h1>Logo</h1>
      <div className="flex items-center gap-2">
        <p className="capitalize text-sm">{session?.email}</p>
        <ThemeMode />
        <LangSwitcherSelect />
        <LogoutButton />
      </div>
    </section>
  );
};

export default Header;
