import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

import { type AppRoute, appRoutes } from "@/app/routes";
import { AppLogo } from "@/shared/components/AppLogo";

import styles from "./AppSidebar.module.scss";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function buildMenuItems(
    routes: AppRoute[],
    t: ReturnType<typeof useTranslation<"app">>["t"],
): MenuItem[] {
    return routes
        .filter((route) => route.showInNavigation !== false)
        .map((route) => {
            const Icon = route.icon;

            return {
                key: route.type === "page" ? route.path : route.key,

                label: t(route.titleKey),

                icon: Icon ? <Icon /> : undefined,

                children: route.type === "group" ? buildMenuItems(route.children, t) : undefined,
            };
        });
}

export function AppSidebar() {
    const { t } = useTranslation("app");

    const location = useLocation();

    const navigate = useNavigate();

    const menuItems = useMemo(() => buildMenuItems(appRoutes, t), [t]);

    return (
        <Sider width={260} className={styles.sidebar}>
            <div className={styles.logoContainer}>
                <AppLogo className={styles.sidebarLogo} />
            </div>

            <Menu
                mode="inline"
                theme="dark"
                items={menuItems}
                selectedKeys={[location.pathname]}
                onClick={({ key }) => {
                    void navigate(key);
                }}
            />
        </Sider>
    );
}
