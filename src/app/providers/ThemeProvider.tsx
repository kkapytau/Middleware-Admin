import { ConfigProvider } from "antd";
import type { PropsWithChildren } from "react";

export function ThemeProvider({ children }: PropsWithChildren) {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#c20831",
                    borderRadius: 8,
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
}
