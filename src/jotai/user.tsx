import { atom, useAtomValue } from "jotai";
import { User } from "lucia";

export const userAtom = atom<User | undefined>(undefined);

export function useAuth() {
  return useAtomValue(userAtom);
}
