import type { ReactNode } from "react";

import { AuthProvider } from "@/app/auth";

import { QueryProvider } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";

type Props = {
    children: ReactNode;
};

export function AppProviders({ children }: Props) {
    return (
        <ThemeProvider>
            <QueryProvider>
                <AuthProvider>{children}</AuthProvider>
            </QueryProvider>
        </ThemeProvider>
    );
}
