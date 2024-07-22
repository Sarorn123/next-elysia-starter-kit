"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2, SaveIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUserSchema, CreateUserSchema } from "@/schema-type/user";
import { useAction } from "next-safe-action/hooks";
import { createUserAction, getSingleUser } from "@/action/user";
import { useResponseMessage } from "@/hook/helper";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useRouter } from "@/lib/navigation";
import Image from "next/image";

type Props = {};

const CreateUserTab = (props: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const message = useResponseMessage();
  const [loading, setLoading] = useState<boolean>(true);
  const [photo, setPhoto] = useState<File>();
  const [photoURL, setPhotoURL] = useState<string>("");

  const { execute, status } = useAction(createUserAction, {
    onSuccess(data) {
      if (data?.error) toast.error(message(data?.error));
      if (data?.success) {
        toast.success(message(data.success));
        router.push("/dashboard/user");
      }
    },
    onExecute() {
      console.log("Running ...");
    },
  });

  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      password: "",
      age: "",
      dob: new Date(),
      position: "",
    },
  });

  useEffect(() => {
    if (id) {
      getSingleUser(id).then((data) => {
        if (data) {
          const { age, dob, position, email, id, photo } = data.data;
          form.reset({
            id,
            email,
            age: age || "",
            dob: dob ? new Date(dob) : undefined,
            position: position || "",
            password: "dummy",
          });
          setPhotoURL(photo);
        }
        setLoading(false);
      });
    } else setLoading(false);
  }, [id]);

  async function onSave(data: CreateUserSchema) {
    execute({ ...data, photo: photo ? photo : photoURL });
  }

  useEffect(() => {
    return () => {
      if (photo) URL.revokeObjectURL(photoURL);
    };
  }, [photo]);

  if (loading === true)
    return (
      <div className="flex-1 justify-center items-center h-full  flex">
        <Loader2 size={40} className="animate-spin" />
      </div>
    );

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href="/dashboard/user">User</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{id ? "Update" : "Create"}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card x-chunk="dashboard-06-chunk-1 " className="mt-4">
        <CardHeader>
          <CardTitle>{id ? "Update User" : "Create User"}</CardTitle>
          <CardDescription>
            {id ? "Update user." : "Create a new user."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            {photoURL && (
              <Image
                src={photoURL}
                height={100}
                width={100}
                alt=""
                className="rounded mb-2 border shadow h-32 object-cover w-32"
              />
            )}

            <form onSubmit={form.handleSubmit(onSave)}>
              <div className="grid grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Photo</FormLabel>
                      <FormControl>
                        <Input
                          {...(field as any)}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setPhoto(file);
                              setPhotoURL(URL.createObjectURL(file));
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="shadcn"
                          {...field}
                          readOnly={!!id}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem className="-mt-2.5">
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input placeholder="age" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                <span>{field.value.toLocaleDateString()}</span>
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Position</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            {field.value ? field.value : "Select Position"}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Software Engineer">
                            Software Engineer
                          </SelectItem>
                          <SelectItem value="Software Tester">
                            Software Tester
                          </SelectItem>
                          <SelectItem value="IT Support">IT Support</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="mt-5"
                disabled={status === "executing"}
              >
                Save
                <SaveIcon className="h-3.5 w-3.5 ml-1" />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateUserTab;
