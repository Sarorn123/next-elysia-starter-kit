"use client";

import { userAtom } from "@/jotai/user";
import { useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { User } from "lucia";

type Props = {
  children: React.ReactNode;
  user: User;
};

const ClientUserProvider = ({ children, user }: Props) => {
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    setUser(user);
  }, [user]);

  return <>{children}</>;
};

export default ClientUserProvider;
