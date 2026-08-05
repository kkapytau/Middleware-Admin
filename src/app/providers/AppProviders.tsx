import type { ReactNode } from "react";

import { QueryProvider } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";

type Props = {
    children: ReactNode;
};

export function AppProviders({ children }: Props) {
    return (
        <ThemeProvider>
            <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
    );
}
