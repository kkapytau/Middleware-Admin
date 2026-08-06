import { theme } from "antd";

import { colors } from "./colors";

export const appTheme = {
    algorithm: theme.defaultAlgorithm,

    token: {
        colorPrimary: colors.primary,

        borderRadius: 8,
    },

    components: {
        Layout: {
            siderBg: colors.sidebar,

            headerBg: colors.headerBackground,

            bodyBg: colors.pageBackground,
        },

        Menu: {
            darkItemBg: colors.sidebar,

            darkSubMenuItemBg: colors.sidebar,

            darkItemHoverBg: colors.sidebarHover,

            darkItemSelectedBg: colors.sidebarSelected,

            darkItemColor: "rgba(255,255,255,.88)",

            darkItemSelectedColor: "#fff",
        },
    },
} as const;
