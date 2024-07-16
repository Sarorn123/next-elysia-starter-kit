"use client";

import { File, ListFilter, PlusCircleIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/lib/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

type Props = {};

const FilterUser = (props: Props) => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [debounceSearch] = useDebounce(search, 1000);

  function searchUser() {
    router.replace(`/dashboard/user${search ? `?search=${search}` : ""}`);
  }

  useEffect(() => {
    searchUser();
  }, [debounceSearch]);

  return (
    <div className="flex items-center justify-between  my-4">
      <Link href={"/dashboard/user/create"}>
        <Button size="sm" className="h-8 gap-1">
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Create New User
          </span>
          <PlusCircleIcon className="h-3.5 w-3.5 ml-1" />
        </Button>
      </Link>
      <div className="ml-auto flex items-center gap-2">
        <Input
          placeholder="Search ..."
          className="h-8 bg-background"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Filter
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size="sm" variant="outline" className="h-8 gap-1">
          <File className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Export
          </span>
        </Button>
      </div>
    </div>
  );
};

export default FilterUser;
