"use client";

import { useParams, useSearchParams } from "next/navigation";
import { usePathname, Link } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ReactCountryFlag from "react-country-flag";

type Props = {};

const langs = [
  {
    locale: "en",
    name: "English",
    countryCode: "US",
  },
  {
    locale: "km",
    name: "ភាសាខ្មែរ",
    countryCode: "KH",
  },
];

export default function LangSwitcherSelect({}: Props) {
  const pathname = usePathname();
  const params = useParams();
  const query = useSearchParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="capitalize">
          {
            <ReactCountryFlag
              countryCode={
                langs.find((l) => l.locale === params.locale)?.countryCode!
              }
              svg
              style={{
                width: "1.5em",
                height: "1.5em",
              }}
            />
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <p className="text-center py-2 font-semibold text-sm border-b">
          Languages
        </p>

        {langs.map((lang) => (
          <DropdownMenuItem key={lang.name} asChild>
            <Link
              href={pathname + "?" + query.toString()}
              locale={lang.locale}
              className="capitalize flex items-center gap-2"
            >
              <ReactCountryFlag countryCode={lang.countryCode} />
              <p>{lang.name}</p>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
