import React from "react";
import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, User } from "lucide-react";
import { getDashboardData } from "@/action/dashboard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

type Props = {};

const Page = async (props: Props) => {
  const t = await getTranslations("Dashboard.Cards");
  const { data: response } = await getDashboardData();
  const data = response?.data;
  if (!data)
    return (
      <div className="flex-1 ">
        <p>Something went wrong</p>
      </div>
    );

  const cards = [
    {
      label: t("Income.title"),
      amount: data.income,
      description: t("Income.description"),
      icon: <DollarSign size={16} className="text-primary" />,
    },
    {
      label: t("Expense.title"),
      amount: data.expense,
      description: t("Expense.description"),
      icon: <DollarSign size={16} className="text-red-500" />,
    },
    {
      label: t("User.title"),
      amount: data.userCount,
      description: t("User.description"),
      icon: <User size={16} className="text-blue-500" />,
    },
  ];

  return (
    <div className="flex-1 justify-center items-center h-full">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {cards.map(({ amount, description, label, icon }, i) => (
          <Card className="pt-5" key={i}>
            <CardContent>
              <div className="flex justify-between items-center">
                <p className="font-semibold">{label}</p>
                {icon}
              </div>
              <h1 className="font-bold text-2xl mt-2">{amount}</h1>
              <p className="mt-2 text-sm">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
