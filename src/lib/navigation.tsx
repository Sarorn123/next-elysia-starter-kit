import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { locales } from "@/translation/i18n";

export const { Link, redirect, usePathname, useRouter, permanentRedirect } =
  createSharedPathnamesNavigation({ locales });
