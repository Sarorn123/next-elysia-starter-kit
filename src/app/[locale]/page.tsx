import { Button } from "@/components/ui/button";
import { Link } from "@/lib/navigation";
import React from "react";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <main className="h-[100vh] flex flex-col justify-center items-center">
      <h1 className="mb-5 font-semibold text-3xl text-center">
        A Setup For Starter <br />
        Templates With :
      </h1>
      <div>
        <ul>
          <li>Framework : </li>
          <li className="ml-5 mt-2">👉 Elysia JS</li>
          <li className="ml-5">👉 Next JS</li>
          <li className="ml-5">👉 Tailwind CSS</li>
          <li className="ml-5">👉 Shadcn UI</li>
          <li className="ml-5">👉 Next Intl</li>
        </ul>

        <ul className="mt-5">
          <li>Includes : </li>
          <li className="ml-5 mt-2">🤫 Authentication</li>
          <li className="ml-5">🤫 Multiple Languages</li>
          <li className="ml-5">🤫 Theme Mode</li>
        </ul>
      </div>
      <Button asChild className="mt-5">
        <Link href={"/dashboard"}>Dashboard</Link>
      </Button>
    </main>
  );
};

export default LandingPage;
