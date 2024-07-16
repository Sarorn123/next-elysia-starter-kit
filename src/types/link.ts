import { LucideIcon } from "lucide-react";

export type Linktype = {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    url: string;
}