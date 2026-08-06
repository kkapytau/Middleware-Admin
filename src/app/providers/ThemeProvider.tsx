import { ConfigProvider } from "antd";
import type { PropsWithChildren } from "react";

import { appTheme } from "@/app/theme";

export function ThemeProvider({ children }: PropsWithChildren) {
    return <ConfigProvider theme={appTheme}>{children}</ConfigProvider>;
}
