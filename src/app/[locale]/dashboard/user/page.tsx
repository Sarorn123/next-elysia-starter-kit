import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/lib/navigation";
import ListUser from "./list-user";
import { UserQueryParams } from "@/schema-type/user";

type Props = {
  searchParams: UserQueryParams;
};

export default async function User({ searchParams }: Props) {
  return (
    <div className="flex flex-col">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>User</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ListUser query={searchParams} />
    </div>
  );
}
