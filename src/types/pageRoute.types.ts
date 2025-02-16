import { ReactNode } from "react";

export interface PageRoute {
    path: string;
    name: string;
    component: ReactNode;
}
