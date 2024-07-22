import { listUserAction } from "@/action/user";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import UserDropdownMenu from "./dropdown-menu";
import FilterUser from "./filter-user";
import { UserQueryParams } from "@/schema-type/user";
import { ShieldCheck, Ticket } from "lucide-react";

type Props = {
  query: UserQueryParams;
};

const ListUser = async ({ query }: Props) => {
  const { data, error } = await listUserAction(query);

  return (
    <>
      <FilterUser />
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>User</CardTitle>
          <CardDescription>Manage your user.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Photo</span>
                  Photo
                </TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Age</TableHead>
                <TableHead className="hidden md:table-cell">
                  Date Of Birth
                </TableHead>
                <TableHead className="hidden md:table-cell">Position</TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {data?.data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="hidden sm:table-cell relative">
                    {!user.otp && (
                      <ShieldCheck
                        className="absolute top-0 left-0 text-primary"
                        size={20}
                      />
                    )}
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={user.photo || "/no-avatar.png"}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.dob || "-"}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.position}</Badge>
                  </TableCell>
                  <TableCell>{new Date().getFullYear()}</TableCell>
                  <TableCell>
                    <UserDropdownMenu id={user.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default ListUser;
